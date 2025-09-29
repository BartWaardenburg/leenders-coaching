import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Section, type SectionBaseProps } from '@/components/ui/Section';

type CallToAction = {
  href?: string;
  label?: string;
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

interface SectionHeaderProps extends SectionBaseProps {
  ctas?: CallToAction[];
}

/**
 * Section header component with centered title, optional description and right-aligned CTAs
 */
export const SectionHeader = ({
  ctas,
  maxWidth = '5xl',
  ...props
}: SectionHeaderProps) => (
  <Section headingLevel="h1" maxWidth={maxWidth} {...props}>
    {ctas && ctas.length > 0 && (
      <ButtonGroup width="full" justify="end" align="center">
        {ctas
          .filter((cta) => cta.label && cta.href)
          .map((cta, index) => (
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
  </Section>
);
