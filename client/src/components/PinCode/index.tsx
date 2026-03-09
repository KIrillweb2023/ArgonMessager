import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from 'react';

export const PinInput: React.FC = () => {
  const [values, setValues] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Фокус на первое поле при монтировании
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const input = e.target;
    let newValue = input.value;
    
    // Если вставили больше одного символа (например через автозаполнение)
    if (newValue.length > 1) {
      const digits = newValue.replace(/\D/g, '').split('').slice(0, 6);
      const newValues = [...values];
      
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newValues[index + i] = digit;
        }
      });
      
      setValues(newValues);
      
      // Фокус на следующее поле после последней вставленной цифры
      const nextIndex = Math.min(index + digits.length, 5);
      inputs.current[nextIndex]?.focus();
      return;
    }
    
    // Разрешаем только цифры
    if (newValue && !/^\d+$/.test(newValue)) {
      input.value = values[index];
      return;
    }

    // Обновляем состояние
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    // Автоматически переходим к следующему полю если ввели цифру
    if (newValue && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    const input = e.currentTarget;
    
    // Обработка Backspace
    if (e.key === 'Backspace') {
      if (input.value) {
        // Если есть значение - очищаем текущее поле
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        // Если поле пустое - переходим к предыдущему
        inputs.current[index - 1]?.focus();
        // И очищаем предыдущее поле
        const newValues = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
      }
    }

    // Обработка Delete
    if (e.key === 'Delete' && input.value) {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }

    // Навигация стрелками
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const digits = paste.replace(/\D/g, '').split('').slice(0, 6);
    
    const newValues = [...values];
    digits.forEach((digit, i) => {
      newValues[i] = digit;
    });
    setValues(newValues);
    
    // Фокус на следующем после вставки поле
    const nextIndex = Math.min(digits.length, 5);
    inputs.current[nextIndex]?.focus();
  };

  // Функция для установки курсора в конец при фокусе
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }, 0);
  };

  return (
    <div className="flex gap-x-2 justify-center" onPaste={handlePaste}>
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          ref={(el) => inputs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          className="w-[45px] rounded-xl h-[60px] bg-[#f4f4f4] text-[28px] font-medium text-center outline-none transition-all duration-200 border-2 border-transparent focus:border-purple-700 focus:bg-white [&:not(:placeholder-shown)]:border-gray-300"
          placeholder=" "
        />
      ))}
    </div>
  );
};