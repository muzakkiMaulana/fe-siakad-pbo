import React, { useEffect, useState } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    showCloseButton?: boolean;
    customCloseButton?: React.ReactNode;
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    showCloseButton = true,
    customCloseButton,
}: ModalProps) {
    const [isMounted, setIsMounted] = useState(isOpen);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setAnimateOut(false);
        } else {
            setAnimateOut(true);
            const timeout = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 transition-opacity duration-300">
            <div
                className={`bg-white rounded-lg shadow-lg w-full max-w-md p-6 transform transition-all duration-300
                    ${animateOut
                        ? 'opacity-0 scale-95'
                        : 'opacity-100 scale-100'
                    }`}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    {showCloseButton && (
                        customCloseButton ? (
                            <div onClick={onClose} className="cursor-pointer">
                                {customCloseButton}
                            </div>
                        ) : (
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl leading-none">
                                &times;
                            </button>
                        )
                    )}
                </div>
                <div className="text-sm text-gray-700 mb-4">
                    {children}
                </div>
                {footer && <div className="flex justify-end gap-2">{footer}</div>}
            </div>
        </div>
    );
}
