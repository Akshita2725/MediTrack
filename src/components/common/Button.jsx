import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs focus:ring-blue-500 border border-blue-600/30',
    secondary: 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-xs focus:ring-slate-700 border border-slate-800',
    outline: 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-slate-700 shadow-2xs focus:ring-slate-400',
    ghost: 'hover:bg-slate-100/80 active:bg-slate-200/80 text-slate-600 hover:text-slate-900 focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs focus:ring-rose-500 border border-rose-600/30',
    success: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs focus:ring-emerald-500 border border-emerald-600/30',
    purple: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-xs focus:ring-purple-500 border border-purple-600/30'
  };

  const sizeStyles = {
    xs: 'text-[11px] px-2.5 py-1 rounded-lg gap-1 font-semibold',
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5 font-semibold',
    md: 'text-xs font-bold px-4 py-2.5 rounded-xl gap-2 tracking-tight',
    lg: 'text-sm font-bold px-5 py-3 rounded-2xl gap-2.5 tracking-tight'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-sans transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer ${
        variantStyles[variant] || variantStyles.primary
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-3.5 w-3.5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
