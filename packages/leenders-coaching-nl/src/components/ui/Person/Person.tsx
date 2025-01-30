import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Avatar } from "@/components/ui/Avatar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Stack } from "@/components/ui/Stack";
import { Box } from "@/components/ui/Box";

type PersonProps = {
    name: string;
    description?: string;
    imageSrc: string;
    imageAlt?: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Person component for displaying a person's information with avatar
 */
export const Person = ({
    name,
    description,
    imageSrc,
    imageAlt,
    className,
    ...props
}: PersonProps) => {
    return (
        <Stack direction="row" className={twMerge("items-stretch", className)} {...props}>
            <Avatar src={imageSrc} alt={imageAlt || name} size="lg" className="border-l-0" />
            <Stack direction="col" justify="center" className="border border-l-0 border-r-0 border-foreground/80">
                <Box className="py-2 px-4">
                    <Heading level="h3" variant="small" spacing="none">
                        {name}
                    </Heading>
                </Box>
                {description && (
                    <Box>
                        <div className="border-t border-foreground/80" />
                        <Box className="py-2 px-4">
                            <Text variant="muted" className="text-sm">
                                {description}
                            </Text>
                        </Box>
                    </Box>
                )}
            </Stack>
        </Stack>
    );
}; 