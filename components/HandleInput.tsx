'use client';

import { useState } from 'react';
import { validateHandle } from '@/lib/utils';

interface HandleInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  platform: string;
}

export default function HandleInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  platform,
}: HandleInputProps) {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue && !validateHandle(newValue)) {
      setError('Please enter a valid handle (letters, numbers, _, -)');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim()) {
      setError('Please enter a handle');
      return;
    }
    
    if (!validateHandle(value)) {
      setError('Please enter a valid handle');
      return;
    }
    
    setError('');
    onSubmit();
  };

  const getPlatformPlaceholder = () => {
    return 'elonmusk';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Enter Twitter Handle
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={getPlatformPlaceholder()}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 rounded-xl border-2 
            focus:outline-none focus:ring-2 focus:ring-sol-orange
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-400' : 'border-gray-200'}
          `}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading || !value.trim() || !!error}
        className={`
          w-full py-3 px-6 rounded-xl font-semibold text-white
          transition-all duration-200
          ${
            isLoading || !value.trim() || error
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-sol hover:shadow-lg hover:scale-105 active:scale-95'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Styling...
          </span>
        ) : (
          'Style Me! 🎨'
        )}
      </button>
    </form>
  );
}

