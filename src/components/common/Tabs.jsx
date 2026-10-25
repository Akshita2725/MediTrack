import React from 'react';

/**
 * Reusable Tabs component with active indicator, badge counts, and keyboard focus (Topic 61-66)
 */
export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-slate-200 ${className}`}>
      <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 cursor-pointer outline-hidden
                ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }
              `}
            >
              {Icon && (
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                  {React.isValidElement(Icon) ? (
                    Icon
                  ) : typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null) ? (
                    React.createElement(Icon, { className: 'w-4 h-4' })
                  ) : null}
                </span>
              )}
              <span>{tab.label}</span>

              {tab.badge !== undefined && tab.badge !== null && (
                <span
                  className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
