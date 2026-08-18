import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

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

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto w-full flex items-start gap-3 px-4 py-3 rounded-2xl bg-card border border-border shadow-2xl text-foreground text-sm font-medium animate-[slideUp_0.25s_ease-out]"
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          )}
          <span className="flex-1 leading-snug">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
