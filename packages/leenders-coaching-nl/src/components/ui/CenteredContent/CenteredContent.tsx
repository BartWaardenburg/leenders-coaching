import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CenteredContentProps = {
    children: ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
} & ComponentPropsWithoutRef<"div">;

/**
 * Centers content horizontally with a max width
 */
export const CenteredContent = ({
    children,
    maxWidth = "4xl",
    className,
    ...props
}: CenteredContentProps) => {
    return (
        <div
            className={twMerge(
                "text-center mx-auto",
                `max-w-${maxWidth}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}; 