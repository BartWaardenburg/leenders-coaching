import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Heading } from "@/components/ui/Heading";
import { Section, type PastelColor } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";

type CallToAction = {
    href: string;
    label: string;
};

type SectionHeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    primaryCta?: CallToAction;
    secondaryCta?: CallToAction;
    showBorder?: boolean;
    border?: boolean;
    background?: PastelColor;
} & ComponentPropsWithoutRef<"section">;

/**
 * Section header component with centered title, optional description and right-aligned CTAs
 */
export const SectionHeader = ({
    title,
    description,
    primaryCta,
    secondaryCta,
    showBorder = false,
    border = false,
    background,
    className,
    ...props
}: SectionHeaderProps) => {
    return (
        <Section
            background={background}
            border={border}
            className={twMerge(
                "py-8 md:py-12",
                className
            )}
            {...props}
        >
            <Stack space={6} className="md:items-center">
                <Box className="w-full md:text-center">
                    <Heading
                        level="h2"
                        variant="large"
                        showBorder={showBorder}
                        borderColor={background}
                    >
                        {title}
                    </Heading>
                    {description && (
                        <Text className="mt-6 text-lg md:text-xl">
                            {description}
                        </Text>
                    )}
                </Box>
                {(primaryCta || secondaryCta) && (
                    <Box className="w-full flex justify-start md:justify-end">
                        <ButtonGroup>
                            {primaryCta && (
                                <Link href={primaryCta.href}>
                                    <Button size="lg" fullWidthOnMobile>
                                        {primaryCta.label}
                                    </Button>
                                </Link>
                            )}
                            {secondaryCta && (
                                <Link href={secondaryCta.href}>
                                    <Button variant="black" size="lg" fullWidthOnMobile>
                                        {secondaryCta.label}
                                    </Button>
                                </Link>
                            )}
                        </ButtonGroup>
                    </Box>
                )}
            </Stack>
        </Section>
    );
}; 