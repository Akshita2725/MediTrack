import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable TextArea component with validation error feedback and character count (Topic 55-60)
 */
export const TextArea = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 3,
  maxLength,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const hasError = Boolean(error);
  const currentLength = (value || '').length;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={id || name}
            className="text-xs font-bold text-slate-700 tracking-tight"
          >
            {label}
            {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </label>
        )}
        {maxLength && (
          <span className="text-[11px] text-slate-400 font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-2xs">
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          maxLength={maxLength}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full text-sm rounded-xl py-2.5 px-3.5 transition-all duration-150 outline-hidden font-medium
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900'}
            ${
              hasError
                ? 'border-2 border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
            }
          `}
          {...props}
        />
      </div>

      {hasError ? (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
