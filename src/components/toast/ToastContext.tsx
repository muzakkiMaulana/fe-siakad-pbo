import React, { createContext, useContext } from 'react';
import type { ToastContextType } from './types';
import { useToastState } from './useToast';
import ToastContainer from './ToastContainer';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast, showToast, hideToast } = useToastState();

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toast={toast} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
