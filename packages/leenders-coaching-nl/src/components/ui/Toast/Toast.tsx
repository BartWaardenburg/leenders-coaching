import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";
import { Flex } from "@/components/ui/Flex";
import { modalStyles, type ModalVariant } from "../Modal/Modal";
import { ariaConfig } from "@/config/aria.config";

/**
 * Props for the Toast component
 * @typedef {Object} ToastProps
 * @property {string} id - Unique identifier for the toast
 * @property {ReactNode} message - Content to display in the toast
 * @property {ModalVariant} [variant='blue'] - Visual style variant of the toast
 * @property {number} [duration] - Duration in ms before auto-dismissal. If not provided, toast won't auto-dismiss
 * @property {boolean} [showCloseButton=true] - Whether to show the close button
 * @property {(id: string) => void} [onClose] - Callback function when toast is closed
 */
type ToastProps = {
    id: string;
    message: ReactNode;
    variant?: ModalVariant;
    duration?: number;
    showCloseButton?: boolean;
    onClose?: (id: string) => void;
} & ComponentPropsWithoutRef<"div">;

/**
 * Toast notification component that displays temporary messages with auto-dismiss functionality
 * 
 * @component
 * @param {ToastProps} props - Component props
 * @param {string} props.id - Unique identifier for the toast
 * @param {ReactNode} props.message - Content to display in the toast
 * @param {ModalVariant} [props.variant='blue'] - Visual style variant of the toast
 * @param {number} [props.duration] - Duration in ms before auto-dismissal
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {(id: string) => void} [props.onClose] - Callback function when toast is closed
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Toast component or null if unmounted
 */
export const Toast = ({
    id,
    message,
    variant = "blue",
    duration,
    showCloseButton = true,
    onClose,
    className,
    ...props
}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(true);
    const [progress, setProgress] = useState(100);
    const progressInterval = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(() => {
                setIsMounted(false);
                onClose?.(id);
            }, 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isVisible, id, onClose]);

    useEffect(() => {
        if (duration) {
            const startTime = Date.now();
            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                setProgress(remaining);

                if (remaining <= 0) {
                    setIsVisible(false);
                    if (progressInterval.current) {
                        window.clearInterval(progressInterval.current);
                    }
                }
            };

            // Update every 10ms for smooth animation
            progressInterval.current = window.setInterval(updateProgress, 10);

            return () => {
                if (progressInterval.current) {
                    window.clearInterval(progressInterval.current);
                }
            };
        }
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isMounted) return null;

    return (
        <Flex
            direction="column"
            className={twMerge(
                "relative border p-4 max-w-md w-full",
                "transition-all duration-300 shadow-lg overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                modalStyles[variant],
                className,
            )}
            role="alert"
            {...props}
        >
            <Flex direction="row" items="center" className="w-full">
                <div className="flex-1">{message}</div>
                {showCloseButton && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className={twMerge(
                            "ml-2 p-2",
                            "text-inherit opacity-80 hover:opacity-100 transition-opacity",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            "focus-visible:ring-current focus-visible:ring-offset-inherit",
                        )}
                        aria-label={ariaConfig.toast.closeButton}
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                )}
            </Flex>
            {duration && (
                <div
                    className="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            )}
        </Flex>
    );
}; 