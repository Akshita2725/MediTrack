import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center w-full transition-all duration-150 rounded-xl border ${
        isFocused
          ? 'border-blue-600 bg-white ring-3 ring-blue-500/15 shadow-xs'
          : 'border-slate-200/90 bg-slate-50/80 hover:bg-slate-100/70 hover:border-slate-300'
      } ${className}`}
    >
      <Search className={`w-4 h-4 absolute left-3 pointer-events-none transition-colors ${
        isFocused ? 'text-blue-600' : 'text-slate-400'
      }`} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent pl-9.5 pr-8 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
