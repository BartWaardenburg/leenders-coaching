import type { ComponentPropsWithoutRef } from 'react';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
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
  ctas?: CallToAction[];
  border?: boolean;
  background?: PastelVariant;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section header component with centered title, optional description and right-aligned CTAs
 */
export const SectionHeader = ({
  title,
  description,
  ctas,
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
                  level="h1"
                  variant="large"
                  showBorder
                  borderColor={background}
                  textAlign="center"
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text variant="large" className="mt-6 md:text-xl">
                  {description}
                </Text>
              )}
            </>
          )}
        </Box>
        {ctas && ctas.length > 0 && (
          <ButtonGroup width="full" justify="end" align="center">
            {ctas.map((cta, index) => (
              <Button
                key={index}
                size="lg"
                fullWidthUntil="sm"
                href={cta.href}
                variant={cta.variant}
                target={cta.isExternal ? '_blank' : undefined}
                rel={cta.isExternal ? 'noopener noreferrer' : undefined}
              >
                {cta.label}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Stack>
    </Section>
  );
};
