import { useState } from 'react';
import type { ToastData, ToastOptions } from './types';

export function useToastState() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showToast = ({ message, type = 'info', duration = 3000 }: ToastOptions) => {
    if (timeoutId) clearTimeout(timeoutId);
    setToast({ message, type });
    const id = setTimeout(() => setToast(null), duration);
    setTimeoutId(id);
  };

  const hideToast = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setToast(null);
  };

  return { toast, showToast, hideToast };
}
