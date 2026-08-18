import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-200 ${
        hover
          ? 'hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)] hover:border-slate-300/90 hover:-translate-y-0.5'
          : ''
      } ${glass ? 'bg-white/80 backdrop-blur-md' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
