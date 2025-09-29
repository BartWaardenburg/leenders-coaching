import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';

interface SectionFAQProps extends SectionBaseProps {
  /** Array of FAQ items */
  items: FAQItem[];
}

/**
 * Section component for displaying a FAQ with optional title and description
 */
export const SectionFAQ = ({
  items,
  background,
  maxWidth,
  ...props
}: SectionFAQProps) => {
  return (
    <Section maxWidth={maxWidth} background={background} {...props}>
      <Box className="mx-auto max-w-3xl">
        <FAQ items={items} variant={background} />
      </Box>
    </Section>
  );
};
