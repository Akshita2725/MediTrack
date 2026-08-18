import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-slate-100/90 text-slate-700 border-slate-200/80',
    primary: 'bg-blue-50/90 text-blue-700 border-blue-200/80',
    success: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50/90 text-amber-700 border-amber-200/80',
    danger: 'bg-rose-50/90 text-rose-700 border-rose-200/80',
    purple: 'bg-purple-50/90 text-purple-700 border-purple-200/80',
    indigo: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80',
    cyan: 'bg-cyan-50/90 text-cyan-700 border-cyan-200/80'
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    cyan: 'bg-cyan-500'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3 py-1.5 font-semibold gap-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border whitespace-nowrap leading-none ${
        variantStyles[variant] || variantStyles.default
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            dotColors[variant] || 'bg-slate-400'
          }`}
        />
      )}
      {children}
    </span>
  );
};
