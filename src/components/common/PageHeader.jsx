import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PageHeader = ({
  title,
  subtitle,
  actions,
  badge,
  backUrl,
  className = ''
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 ${className}`}>
      <div className="flex items-start gap-3.5">
        {backUrl && (
          <button
            onClick={() => (typeof backUrl === 'string' ? navigate(backUrl) : navigate(-1))}
            className="mt-0.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">{actions}</div>}
    </div>
  );
};
