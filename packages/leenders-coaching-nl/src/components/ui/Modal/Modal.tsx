import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  label: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Generic full-screen modal component
 */
export const Modal = ({
  isOpen,
  children,
  label,
  className,
  ...props
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-background min-h-screen",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      {...props}
    >
      {children}
    </div>
  );
};
