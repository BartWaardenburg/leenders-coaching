import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonGroupProps = {
  children: ReactNode;
  /** Whether to stack buttons vertically on mobile */
  stackOnMobile?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**
 * A component for grouping buttons with responsive layout
 */
export const ButtonGroup = ({
  children,
  className,
  stackOnMobile = true,
  ...props
}: ButtonGroupProps) => {
  return (
    <div
      className={twMerge(
        "flex gap-4 justify-center items-center",
        stackOnMobile && "flex-col sm:flex-row",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
