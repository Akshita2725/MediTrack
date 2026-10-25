import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, message, duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast = { id, type, message };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, dur) => addToast('success', msg, dur),
    error: (msg, dur) => addToast('error', msg, dur),
    info: (msg, dur) => addToast('info', msg, dur),
    warning: (msg, dur) => addToast('warning', msg, dur),
    dismiss: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          let bg = 'bg-slate-900 text-white border-slate-800';
          let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

          if (t.type === 'success') {
            bg = 'bg-emerald-900/95 text-emerald-50 border-emerald-700/60 shadow-emerald-950/20';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />;
          } else if (t.type === 'error') {
            bg = 'bg-rose-900/95 text-rose-50 border-rose-700/60 shadow-rose-950/20';
            icon = <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />;
          } else if (t.type === 'warning') {
            bg = 'bg-amber-900/95 text-amber-50 border-amber-700/60 shadow-amber-950/20';
            icon = <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />;
          } else if (t.type === 'info') {
            bg = 'bg-blue-900/95 text-blue-50 border-blue-700/60 shadow-blue-950/20';
            icon = <Info className="w-5 h-5 text-blue-300 shrink-0" />;
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 animate-in slide-in-from-top-2 fade-in text-sm font-medium ${bg}`}
              role="alert"
            >
              <div className="flex items-center gap-2.5">
                {icon}
                <p className="leading-snug">{t.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 shrink-0"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
