import React from 'react';
import { Button } from './Button.jsx';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 ${className}`}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-400 mb-4">
          {React.isValidElement(icon) ? (
            React.cloneElement(icon, {
              className: icon.props.className || 'w-7 h-7 text-slate-500'
            })
          ) : typeof icon === 'function' || (typeof icon === 'object' && icon !== null) ? (
            React.createElement(icon, { className: 'w-7 h-7 text-slate-500' })
          ) : null}
        </div>
      )}
      <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
      {description && (
        <p className="text-xs text-slate-500 mt-1 max-w-sm font-normal leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
