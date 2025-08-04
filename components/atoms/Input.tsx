import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full px-4 py-3 rounded-xl border-2 border-gray-200
        focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100
        transition-all duration-200 bg-white/90 backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
};