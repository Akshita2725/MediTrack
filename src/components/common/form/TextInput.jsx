import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable TextInput component with label, validation error feedback, and helper text (Topic 55-60)
 */
export const TextInput = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs font-bold text-slate-700 tracking-tight flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full text-sm rounded-xl py-2.5 transition-all duration-150 outline-hidden font-medium
            ${Icon ? 'pl-10 pr-3.5' : 'px-3.5'}
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900'}
            ${
              hasError
                ? 'border-2 border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
            }
          `}
          {...props}
        />

        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-rose-500">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {hasError ? (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 animate-in fade-in">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
