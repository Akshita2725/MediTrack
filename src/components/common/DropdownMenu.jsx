import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable DropdownMenu component with click-outside listener (Topic 61-66)
 */
export const DropdownMenu = ({
  trigger,
  label = 'Select',
  items = [],
  onSelect,
  className = '',
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <span>{label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-1.5 w-48 rounded-xl bg-white shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95`}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={`div-${idx}`} className="my-1 border-t border-slate-100" />;
            }

            return (
              <button
                key={item.id || item.value || idx}
                type="button"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center gap-2.5 transition-colors cursor-pointer
                  ${
                    item.danger
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {item.icon && <span className="w-4 h-4 text-slate-400">{item.icon}</span>}
                <span className="font-medium">{item.label || item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
