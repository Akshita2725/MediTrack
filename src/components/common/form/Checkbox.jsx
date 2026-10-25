import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable Checkbox component with validation error feedback (Topic 55-60)
 */
export const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  description,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <div className="relative flex items-center pt-0.5">
          <input
            id={id || name}
            name={name}
            type="checkbox"
            checked={Boolean(checked)}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`w-4 h-4 rounded-md text-blue-600 border transition-all duration-150 outline-hidden cursor-pointer
              ${
                hasError
                  ? 'border-2 border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500/20'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            {...props}
          />
        </div>
        <div className="text-sm">
          <span className="font-medium text-slate-800">
            {label}
            {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </label>

      {hasError && (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 ml-7 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
