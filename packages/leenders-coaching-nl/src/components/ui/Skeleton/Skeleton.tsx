import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type SkeletonProps = {
  variant?: "rectangular" | "circular" | "text";
} & ComponentPropsWithoutRef<"div">;

/**
 * Skeleton loading component with different variants
 */
export const Skeleton = ({
  variant = "rectangular",
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-muted",
        variant === "rectangular" && "rounded-lg",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded h-4 w-3/4",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Skeleton text component for loading text content
 */
export const SkeletonText = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={twMerge("space-y-2", className)} {...props}>
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  );
};

/**
 * Skeleton card component for loading card content
 */
export const SkeletonCard = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={twMerge("space-y-4 rounded-lg border p-6", className)}
      {...props}
    >
      <Skeleton variant="rectangular" className="h-48" />
      <Skeleton variant="text" className="w-2/3" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-3/4" />
    </div>
  );
};
