import React from 'react';

interface FieldProps {
    placeholder: string;
    icon: React.ReactNode;
    text_button: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
    loading?: boolean;
    type?: string;
    disabled?: boolean; 
}

export const FieldAuth: React.FC<FieldProps> = ({ 
    placeholder, 
    icon, 
    text_button, 
    value, 
    onChange, 
    onSubmit,
    loading = false,
    type = "text",
    disabled = false 
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSubmit && !loading && !disabled) {
            onSubmit();
        }
    };

    return (
        <div className="flex gap-x-4 bg-[#F6F6F6] py-[13px] rounded-xl px-[15px] w-full items-center">
            {icon}
            <input 
                className="text-[#5C5C5C] flex-1 outline-none text-[18px] bg-transparent"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                disabled={loading || disabled}
            />
            <button 
                className={`w-auto h-auto cursor-pointer py-[10px] px-[15px] text-white font-bold rounded-xl bg-[#6421FF] transition hover:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={onSubmit}
                disabled={loading || disabled}
            >
                {loading ? '...' : text_button}
            </button>
        </div>
    );
};