'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Toast } from './Toast';
import type { PastelVariant } from '@/utilities/tokens';
import { Flex } from '@/components/ui/Flex';

/**
 * Options for configuring a toast notification
 */
type ToastOptions = {
  variant?: PastelVariant;
  duration?: number;
  showCloseButton?: boolean;
};

/**
 * Internal representation of a toast notification
 */
type ToastItem = {
  id: string;
  message: ReactNode;
} & ToastOptions;

/**
 * Context type for toast functionality
 */
type ToastContextType = {
  /** Shows a new toast notification */
  show: (message: ReactNode, options?: ToastOptions) => void;
  /** Hides a specific toast by ID */
  hide: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Hook to use the toast functionality within components
 * @throws {Error} If used outside of ToastProvider
 * @returns {ToastContextType} Toast context with show/hide methods
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Props for ToastProvider component
 */
type ToastProviderProps = {
  children: ReactNode;
};

/**
 * Provider component that manages toast notifications
 * Handles creation, display and removal of toasts
 * @param {ToastProviderProps} props - Component props
 * @returns {JSX.Element} Provider component with toast container
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: ReactNode, options: ToastOptions = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, ...options }]);
  }, []);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <Flex direction="column" gap={2} className="fixed bottom-4 right-4 z-50">
        {toasts.map(({ id, message, variant, duration, showCloseButton }) => (
          <Toast
            key={id}
            id={id}
            message={message}
            variant={variant}
            duration={duration}
            showCloseButton={showCloseButton}
            onClose={hide}
          />
        ))}
      </Flex>
    </ToastContext.Provider>
  );
};
