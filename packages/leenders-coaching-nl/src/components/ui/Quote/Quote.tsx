import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";

type QuoteProps = {
    children: ReactNode;
    cite?: ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<"blockquote">, "cite">;

/**
 * Quote component for displaying testimonials
 */
export const Quote = ({
    children,
    cite,
    className,
    ...props
}: QuoteProps) => {
    return (
        <blockquote
            className={twMerge(
                "relative",
                className
            )}
            {...props}
        >
            <Text
                variant="quote"
                textAlign="center"
                italic
                className="font-playfair"
            >
                &ldquo;{children}&rdquo;
            </Text>
            {cite && (
                <Box className="block mt-8 not-italic">
                    {cite}
                </Box>
            )}
        </blockquote>
    );
}; 