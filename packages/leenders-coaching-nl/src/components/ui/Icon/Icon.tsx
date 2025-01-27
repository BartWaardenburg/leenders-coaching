import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type IconProps = {
  path: string;
} & ComponentPropsWithoutRef<"svg">;

/**
 * Generic icon component for SVG paths
 */
export const Icon = ({ path, className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge("w-6 h-6 text-primary", className)}
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
};
