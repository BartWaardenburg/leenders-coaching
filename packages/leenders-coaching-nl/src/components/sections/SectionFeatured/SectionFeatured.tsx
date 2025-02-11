import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import { Section, type PastelColor } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Stack } from "@/components/ui/Stack";
import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";

type CallToAction = {
    href: string;
    label: string;
    variant?: "black" | "transparent" | "blue" | "purple" | "green" | "pink" | "yellow" | "teal";
};

type SectionFeaturedProps = {
    /** The title of the section */
    title: ReactNode;
    /** The description text */
    description: ReactNode;
    /** The image source URL */
    image: string | StaticImageData;
    /** Alt text for the image */
    imageAlt: string;
    /** Optional call-to-action button */
    cta?: CallToAction;
    /** Optional background color */
    background?: PastelColor;
    /** Whether to show a border */
    border?: boolean;
} & ComponentPropsWithoutRef<"section">;

/**
 * A section component with a 50/50 layout featuring an image on the left and content on the right
 */
export const SectionFeatured = ({
    title,
    description,
    image,
    imageAlt,
    cta,
    background,
    border = false,
    className,
    ...props
}: SectionFeaturedProps) => {
    return (
        <Section
            background={background}
            border={border}
            noPadding
            className={className}
            {...props}
        >
            <Grid
                columns={{
                    default: 1,
                    sm: 2
                }}
                gap={8}
            >
                <Box className="relative h-[300px] sm:h-full w-full">
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                </Box>
                <Stack gap={6} className="justify-center p-4 sm:p-6 md:px-8 md:pl-0">
                    <Heading level="h2" variant="medium">
                        {title}
                    </Heading>
                    <Text className="text-lg">
                        {description}
                    </Text>
                    {cta && (
                        <Box className="mt-2 flex justify-end">
                            <Button
                                href={cta.href}
                                variant={cta.variant}
                                size="lg"
                            >
                                {cta.label}
                            </Button>
                        </Box>
                    )}
                </Stack>
            </Grid>
        </Section>
    );
}; 