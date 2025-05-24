import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type AlertProps = {
    message: string;
    type?: 'error' | 'success' | 'warning';
    duration?: number; // ms
    onClose?: () => void;
};

export default function Alert({
    message,
    type = 'error',
    duration = 3000,
    onClose,
}: AlertProps) {
    const [visible, setVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, duration);
        return () => clearTimeout(timeout);
    }, [duration]);

    useEffect(() => {
        if (!visible) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
                onClose?.();
            }, 300); // waktu animasi keluar
            return () => clearTimeout(timeout);
        }
    }, [visible, onClose]);

    if (!shouldRender) return null;

    const baseStyle = 'p-4 rounded flex items-center justify-between mb-4 border transition-all duration-300';
    const enterStyle = 'opacity-100 translate-y-0';
    const exitStyle = 'opacity-0 -translate-y-2';
    const typeStyle = {
        error: 'bg-red-100 text-red-700 border-red-300',
        success: 'bg-green-100 text-green-700 border-green-300',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    return (
        <div
            className={`
                ${baseStyle}
                ${typeStyle[type]}
                ${visible ? enterStyle : exitStyle}
            `}
        >
            <span className="pr-4">{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="hover:opacity-70"
            >
                <X size={18} />
            </button>
        </div>
    );
}
