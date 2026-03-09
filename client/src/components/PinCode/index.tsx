import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';

interface PinInputProps {
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({ onChange, onComplete, disabled = false }) => {
  const [values, setValues] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!disabled && inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, [disabled]);

  useEffect(() => {
    const code: string = values.join('');
    onChange?.(code);
    
    if (code.length === 6 && !values.includes('')) {
      onComplete?.(code);
    }
  }, [values, onChange, onComplete]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    if (disabled) return;
    
    const input = e.target;
    const newValue: string = input.value;
    
    if (newValue.length > 1) {
      const digits: string[] = newValue.replace(/\D/g, '').split('').slice(0, 6);
      const newValues: string[] = [...values];
      
      digits.forEach((digit: string, i: number) => {
        if (index + i < 6) {
          newValues[index + i] = digit;
        }
      });
      
      setValues(newValues);
      
      const nextIndex: number = Math.min(index + digits.length, 5);
      if (inputs.current[nextIndex]) {
        inputs.current[nextIndex]?.focus();
      }
      return;
    }
    
    if (newValue && !/^\d+$/.test(newValue)) {
      input.value = values[index];
      return;
    }

    const newValues: string[] = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    if (newValue && index < 5 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (disabled) return;
    
    const input = e.currentTarget;
    
    if (e.key === 'Backspace') {
      if (input.value) {
        const newValues: string[] = [...values];
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0 && inputs.current[index - 1]) {
        inputs.current[index - 1]?.focus();
        const newValues: string[] = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
      }
    }

    if (e.key === 'Delete' && input.value) {
      const newValues: string[] = [...values];
      newValues[index] = '';
      setValues(newValues);
    }

    if (e.key === 'ArrowLeft' && index > 0 && inputs.current[index - 1]) {
      e.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < 5 && inputs.current[index + 1]) {
      e.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>): void => {
    if (disabled) return;
    
    e.preventDefault();
    const paste: string = e.clipboardData.getData('text');
    const digits: string[] = paste.replace(/\D/g, '').split('').slice(0, 6);
    
    const newValues: string[] = [...values];
    digits.forEach((digit: string, i: number) => {
      newValues[i] = digit;
    });
    setValues(newValues);
    
    const nextIndex: number = Math.min(digits.length, 5);
    if (inputs.current[nextIndex]) {
      inputs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (disabled) return;
    
    setTimeout((): void => {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }, 0);
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputs.current[index] = el;
  };

  return (
    <div className="flex gap-x-2 justify-center" onPaste={handlePaste}>
      {[...Array(6)].map((_: undefined, index: number) => (
        <input
          key={index}
          ref={setInputRef(index)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          disabled={disabled}
          className={`w-[45px] rounded-xl h-[60px] bg-[#f4f4f4] text-[28px] font-medium text-center outline-none transition-all duration-200 border-2 border-transparent focus:border-purple-700 focus:bg-white [&:not(:placeholder-shown)]:border-gray-300 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          placeholder=" "
        />
      ))}
    </div>
  );
};