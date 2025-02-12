import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = {
  /** The form content */
  children: ReactNode;
  /** Called when the form is submitted */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Additional CSS classes */
  className?: string;
} & ComponentPropsWithoutRef<'form'>;

/**
 * Form component for handling form submissions
 */
export const Form = ({
  children,
  onSubmit,
  className,
  ...props
}: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge('w-full', className)}
      {...props}
    >
      {children}
    </form>
  );
};
