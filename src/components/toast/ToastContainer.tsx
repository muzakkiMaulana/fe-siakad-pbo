import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { ToastType } from './types';

type ToastContainerProps = {
  toast: { message: string; type: ToastType } | null;
  onClose: () => void;
};

export default function ToastContainer({ toast, onClose }: ToastContainerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2500);
      const removeTimer = setTimeout(() => onClose(), 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [toast]);

  if (!toast) return null;

  const bgColor =
    toast.type === 'success'
      ? 'bg-green-500'
      : toast.type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-4 py-3 rounded shadow text-white flex items-center gap-2
        transition-all duration-300 ease-in-out
        ${bgColor}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <span className="text-sm">{toast.message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={16} />
      </button>
    </div>
  );
}
