import React, { useEffect } from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => onDismiss(toast.id), 3500)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, onDismiss]);

  const iconMap = {
    success: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
  };

  const borderMap = {
    success: 'border-emerald-500/30',
    info: 'border-indigo-500/30',
    error: 'border-rose-500/30',
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto w-full flex items-start gap-3 px-4 py-3 rounded-2xl glass-panel border ${borderMap[toast.type]} shadow-2xl shadow-black/40 animate-[slideUp_0.25s_ease-out]`}
          style={{ animation: 'slideUp 0.25s ease-out' }}
        >
          {iconMap[toast.type]}
          <span className="text-sm text-zinc-200 font-medium flex-1 leading-snug">
            {toast.message}
          </span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-500 hover:text-zinc-300 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
