import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utilities/cn';

type FormProps = {
  /** The form content */
  children: ReactNode;
  /** Called when the form is submitted */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Whether to prevent default form submission (default: true) */
  preventDefault?: boolean;
  /** Additional CSS classes */
  className?: string;
} & ComponentPropsWithoutRef<'form'>;

/**
 * Form component for handling form submissions
 */
export const Form = ({
  children,
  onSubmit,
  preventDefault = true,
  className,
  ...props
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;
    if (preventDefault) {
      e.preventDefault();
    }
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </form>
  );
};
