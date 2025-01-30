import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Section, type PastelColor } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Heading } from "@/components/ui/Heading";
import { Box } from "@/components/ui/Box";

type SectionContentProps = {
    title?: ReactNode;
    showBorder?: boolean;
    background?: PastelColor;
    border?: boolean;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
} & ComponentPropsWithoutRef<"section">;

/**
 * Section component for displaying Portable Text content with an optional title
 */
export const SectionContent = ({
    title,
    children,
    showBorder = false,
    background,
    border = false,
    maxWidth = "3xl",
    className,
    ...props
}: SectionContentProps) => {
    return (
        <Section
            background={background}
            border={border}
            className={twMerge("py-12", className)}
            {...props}
        >
            <Box className={twMerge("mx-auto", `max-w-${maxWidth}`)}>
                <Stack space={8}>
                    {title && (
                        <Box className="w-full">
                            <Heading
                                level="h2"
                                variant="large"
                                showBorder={showBorder}
                                borderColor={background}
                                textAlign="center"
                            >
                                {title}
                            </Heading>
                        </Box>
                    )}
                    <Box className="pt-6">
                        {children}
                    </Box>
                </Stack>
            </Box>
        </Section>
    );
}; 