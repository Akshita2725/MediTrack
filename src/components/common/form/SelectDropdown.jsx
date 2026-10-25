import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

/**
 * Reusable SelectDropdown component with validation error feedback (Topic 55-60)
 */
export const SelectDropdown = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option...',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs font-bold text-slate-700 tracking-tight"
        >
          {label}
          {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        <select
          id={id || name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full text-sm rounded-xl py-2.5 pl-3.5 pr-10 appearance-none transition-all duration-150 outline-hidden font-medium
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-900 cursor-pointer'}
            ${
              hasError
                ? 'border-2 border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
            }
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          {hasError ? (
            <AlertCircle className="w-4 h-4 text-rose-500" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {hasError ? (
        <p className="text-[11px] font-semibold text-rose-600 animate-in fade-in">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
