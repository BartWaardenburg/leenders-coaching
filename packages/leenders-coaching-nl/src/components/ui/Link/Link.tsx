import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";
import { HiOutlineExternalLink } from "react-icons/hi";

type LinkProps = {
  children: ReactNode;
  variant?: "default" | "subtle" | "animated";
  linePosition?: "above" | "below";
  lineStyle?: "slide" | "move";
} & ComponentPropsWithoutRef<"a">;

/**
 * Reusable link component with consistent styling
 */
export const Link = ({
  children,
  variant = "default",
  linePosition = "below",
  lineStyle = "slide",
  className,
  target,
  ...props
}: LinkProps) => {
  const isExternal = target === "_blank";

  if (variant === "animated") {
    return (
      <Box className="relative group/link inline-block">
        <Box className={twMerge(
          "absolute h-[2px] bg-foreground/80 transition-all duration-300",
          lineStyle === "slide" && "w-0 group-hover/link:w-12",
          lineStyle === "move" && "w-12 group-hover/link:translate-x-2",
          "group-hover/link:bg-primary",
          linePosition === "above" ? "-top-1" : "-bottom-1",
          "left-0",
        )} />
        <a
          className={twMerge(
            "inline-flex items-center transition-colors hover:text-primary",
            className
          )}
          target={target}
          {...props}
        >
          {children}
          {isExternal && (
            <HiOutlineExternalLink className="ml-1 h-4 w-4" aria-hidden="true" />
          )}
        </a>
      </Box>
    );
  }

  return (
    <a
      className={twMerge(
        "transition-all inline-flex items-center",
        variant === "default" && "text-primary border-b border-primary hover:border-transparent hover:text-primary/80",
        variant === "subtle" && "text-muted-foreground hover:text-foreground hover:border-b hover:border-foreground",
        className,
      )}
      target={target}
      {...props}
    >
      {children}
      {isExternal && (
        <HiOutlineExternalLink className="ml-1 h-4 w-4" aria-hidden="true" />
      )}
    </a>
  );
};
