import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/Icon";

type IconToggleButtonProps = {
    isToggled?: boolean;
    defaultIcon: string;
    toggledIcon: string;
    label: string;
    className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "aria-label" | "onClick">;

/**
 * A button that toggles between two icons with a rotating animation
 */
export const IconToggleButton = ({
    isToggled = false,
    defaultIcon,
    toggledIcon,
    label,
    className,
    onClick,
    ...props
}: IconToggleButtonProps & { onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
    return (
        <button
            type="button"
            className={twMerge(
                "w-10 h-10 p-0 rounded-full relative",
                "hover:bg-secondary/10",
                className
            )}
            aria-label={label}
            onClick={onClick}
            {...props}
        >
            <Icon
                path={defaultIcon}
                className={twMerge(
                    "absolute inset-0 m-auto transition-all duration-300 text-foreground",
                    isToggled ? "-rotate-90 scale-0" : "rotate-0 scale-100"
                )}
            />
            <Icon
                path={toggledIcon}
                className={twMerge(
                    "absolute inset-0 m-auto transition-all duration-300 text-foreground",
                    isToggled ? "rotate-0 scale-100" : "rotate-90 scale-0"
                )}
            />
        </button>
    );
};