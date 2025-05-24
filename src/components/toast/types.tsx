export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
}

export interface ToastData {
    message: string;
    type: ToastType;
}

export interface ToastContextType {
    showToast: (options: ToastOptions) => void;
    hideToast: () => void;
}