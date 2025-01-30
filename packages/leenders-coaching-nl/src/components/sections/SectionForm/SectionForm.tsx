import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Section, type PastelColor } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Heading } from "@/components/ui/Heading";
import { Box } from "@/components/ui/Box";
import { Form } from "@/components/ui/Form";

type SectionFormProps = {
    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    showBorder?: boolean;
    background?: PastelColor;
    border?: boolean;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & Omit<ComponentPropsWithoutRef<"section">, "onSubmit">;

/**
 * Section component for displaying a form with optional title and description
 */
export const SectionForm = ({
    title,
    description,
    children,
    showBorder = false,
    background,
    border = false,
    maxWidth = "2xl",
    onSubmit,
    className,
    ...props
}: SectionFormProps) => {
    return (
        <Section
            background={background}
            border={border}
            className={twMerge("py-12", className)}
            {...props}
        >
            <Box className={twMerge("mx-auto", `max-w-${maxWidth}`)}>
                <Stack space={8}>
                    {(title || description) && (
                        <Stack space={4} className="text-center">
                            {title && (
                                <Heading
                                    level="h2"
                                    variant="large"
                                    showBorder={showBorder}
                                    borderColor={background}
                                >
                                    {title}
                                </Heading>
                            )}
                            {description && (
                                <Box className="max-w-2xl mx-auto">
                                    {description}
                                </Box>
                            )}
                        </Stack>
                    )}
                    <Form onSubmit={onSubmit}>
                        {children}
                    </Form>
                </Stack>
            </Box>
        </Section>
    );
}; 