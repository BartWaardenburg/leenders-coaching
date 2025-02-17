import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Heading } from '@/components/ui/Heading';
import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';

type CallToAction = {
  href: string;
  label: string;
  variant?:
  | 'black'
  | 'transparent'
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';
};

type SectionHeaderProps = {
  title: string;
  description?: string;
  primaryCta?: CallToAction;
  secondaryCta?: CallToAction;
  showBorder?: boolean;
  border?: boolean;
  background?: PastelColor;
} & ComponentPropsWithoutRef<'section'>;

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
      className={twMerge('py-8 md:py-12', className)}
      {...props}
    >
      <Stack gap={8} className="md:items-center">
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
            <Text className="mt-6 text-lg md:text-xl">{description}</Text>
          )}
        </Box>
        {(primaryCta || secondaryCta) && (
          <ButtonGroup flex width="full" justify="end">
            {primaryCta && (
              <Button
                size="lg"
                fullWidthOnContainer
                href={primaryCta.href}
                variant={primaryCta.variant}
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                size="lg"
                fullWidthOnContainer
                href={secondaryCta.href}
                variant={secondaryCta.variant}
              >
                {secondaryCta.label}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Stack>
    </Section>
  );
};
