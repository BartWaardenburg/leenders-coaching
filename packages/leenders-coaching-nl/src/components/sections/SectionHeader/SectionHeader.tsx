import type { ComponentPropsWithoutRef } from 'react';

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
  isExternal?: boolean;
};

type SectionHeaderProps = {
  title?: string;
  description?: string;
  primaryCta?: CallToAction;
  secondaryCta?: CallToAction;
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
  border = false,
  background,
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
      maxWidth="5xl"
      {...props}
    >
      <Stack gap={8} className="md:items-start">
        <Box className="w-full text-center">
          {(title || description) && (
            <>
              {title && (
                <Heading
                  level="h2"
                  variant="large"
                  showBorder
                  borderColor={background}
                  textAlign="center"
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text className="mt-6 text-lg md:text-xl">{description}</Text>
              )}
            </>
          )}
        </Box>
        {(primaryCta || secondaryCta) && (
          <ButtonGroup flex width="full" justify="end" align="center">
            {primaryCta && (
              <Button
                size="lg"
                fullWidthOnContainer
                href={primaryCta.href}
                variant={primaryCta.variant}
                target={primaryCta.isExternal ? '_blank' : undefined}
                rel={primaryCta.isExternal ? 'noopener noreferrer' : undefined}
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
                target={secondaryCta.isExternal ? '_blank' : undefined}
                rel={
                  secondaryCta.isExternal ? 'noopener noreferrer' : undefined
                }
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
