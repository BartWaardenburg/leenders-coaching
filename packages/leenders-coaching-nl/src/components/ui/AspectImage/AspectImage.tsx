import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Box } from "@/components/ui/Box";

type AspectImageProps = {
  src: string;
  alt: string;
  aspect?: "16/9" | "4/3" | "1/1";
} & Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt">;

/**
 * Generic image component with consistent aspect ratio and styling
 */
export const AspectImage = ({
  src,
  alt,
  aspect = "16/9",
  className,
  ...props
}: AspectImageProps) => {
  return (
    <Box
      className={twMerge(
        "relative rounded-lg overflow-hidden",
        `aspect-[${aspect}]`,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        priority
        className="object-cover"
        {...props}
      />
    </Box>
  );
};
