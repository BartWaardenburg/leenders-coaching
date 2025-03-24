'use client';

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  useState,
} from 'react';
import { Toast } from '@/components/ui/Toast/Toast';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import type { ModalVariant } from '@/components/ui/Modal/Modal';

type ToastOptions = {
  variant?: ModalVariant;
  duration?: number;
};

type ToastContextValue = {
  showToast: (message: ReactNode, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to use the toast functionality
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

type Toast = {
  id: string;
  message: ReactNode;
  variant?: ModalVariant;
  duration?: number;
};

/**
 * Provider component for managing toast notifications
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: ReactNode, options: ToastOptions = {}) => {
      const id = Math.random().toString(36).substring(2);
      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          variant: options.variant,
          duration: options.duration ?? 5000,
        },
      ]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Box className="fixed bottom-0 right-0 z-50 p-4">
        <Stack gap={2}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onClose={removeToast}
            />
          ))}
        </Stack>
      </Box>
    </ToastContext.Provider>
  );
}; 