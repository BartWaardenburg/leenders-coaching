import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";
import { Flex } from "@/components/ui/Flex";
import { ariaConfig } from "@/config/aria.config";

export type ModalVariant = "blue" | "purple" | "green" | "pink" | "yellow" | "teal";

export const modalStyles: Record<ModalVariant, string> = {
  blue: "bg-pastel-blue dark:bg-pastel-blue-dark border-pastel-blue-dark dark:border-pastel-blue text-pastel-blue-dark dark:text-pastel-blue",
  purple: "bg-pastel-purple dark:bg-pastel-purple-dark border-pastel-purple-dark dark:border-pastel-purple text-pastel-purple-dark dark:text-pastel-purple",
  green: "bg-pastel-green dark:bg-pastel-green-dark border-pastel-green-dark dark:border-pastel-green text-pastel-green-dark dark:text-pastel-green",
  pink: "bg-pastel-pink dark:bg-pastel-pink-dark border-pastel-pink-dark dark:border-pastel-pink text-pastel-pink-dark dark:text-pastel-pink",
  yellow: "bg-pastel-yellow dark:bg-pastel-yellow-dark border-pastel-yellow-dark dark:border-pastel-yellow text-pastel-yellow-dark dark:text-pastel-yellow",
  teal: "bg-pastel-teal dark:bg-pastel-teal-dark border-pastel-teal-dark dark:border-pastel-teal text-pastel-teal-dark dark:text-pastel-teal",
};

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  label: string;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  onClose?: () => void;
} & ComponentPropsWithoutRef<"div">;

/**
 * Generic full-screen modal component with proper accessibility and pastel styling
 */
export const Modal = ({
  isOpen,
  children,
  label,
  variant = "blue",
  showCloseButton = true,
  onClose,
  className,
  ...props
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay to ensure mount animation works
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isMounted) return null;

  return (
    <Flex
      as="div"
      items="center"
      justify="center"
      className={twMerge(
        "fixed inset-0 z-50 p-4 bg-background/80 backdrop-blur-sm",
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={handleClose}
      {...props}
    >
      <Flex
        direction="column"
        className={twMerge(
          "relative max-w-lg w-full border p-6",
          "transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          modalStyles[variant],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            className={twMerge(
              "absolute right-2 top-2 p-2 z-10",
              "text-inherit opacity-80 hover:opacity-100 transition-opacity",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "focus-visible:ring-current focus-visible:ring-offset-inherit",
            )}
            aria-label={ariaConfig.modal.closeButton}
          >
            <IoClose className="h-7 w-7" />
          </button>
        )}
        {children}
      </Flex>
    </Flex>
  );
};
