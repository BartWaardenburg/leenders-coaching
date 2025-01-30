import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
    src: string;
    alt: string;
    size?: AvatarSize;
} & Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt">;

const sizeMap: Record<AvatarSize, number> = {
    sm: 32,
    md: 48,
    lg: 84
};

/**
 * Avatar component for displaying profile images
 */
export const Avatar = ({
    src,
    alt,
    size = "md",
    className,
    ...props
}: AvatarProps) => {
    return (
        <div
            style={{ width: sizeMap[size], height: sizeMap[size] }}
            className={twMerge("relative border border-foreground/80", className)}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                {...props}
            />
        </div>
    );
}; 