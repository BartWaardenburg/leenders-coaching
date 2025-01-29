import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/components/ui/Flex";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  label: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Generic full-screen modal component with proper accessibility
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
    <Flex
      as="div"
      items="center"
      justify="center"
      className={twMerge(
        "fixed inset-0 z-50 p-4",
        "bg-background min-h-screen",
        "transition-colors duration-300",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      {...props}
    >
      {children}
    </Flex>
  );
};
