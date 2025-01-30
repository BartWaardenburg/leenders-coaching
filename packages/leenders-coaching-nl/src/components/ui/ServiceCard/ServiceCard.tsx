import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type ServiceCardProps = {
    title: string;
    description: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Card component for displaying services
 */
export const ServiceCard = ({
    title,
    description,
    className,
    ...props
}: ServiceCardProps) => {
    return (
        <Box className={twMerge("border border-foreground/80 p-6", className)} {...props}>
            <Heading level="h3" variant="small" spacing="none">
                {title}
            </Heading>
            <Text variant="muted" className="mt-2">
                {description}
            </Text>
        </Box>
    );
}; 