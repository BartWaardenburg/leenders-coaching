import { Section, type SectionBaseProps } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { PricingCard } from '@/components/ui/PricingCard/PricingCard';
import { Grid } from '@/components/ui/Grid';

interface PricingFeature {
  text: string;
}

interface CallToAction {
  label: string;
  href: string;
  variant?: PastelVariant;
  isExternal?: boolean;
}

interface PricingPackage {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  isPopular?: boolean;
  callToAction: CallToAction;
  variant?: PastelVariant;
}

interface SectionPricingProps extends SectionBaseProps {
  packages: PricingPackage[];
}

/**
 * SectionPricing component displays pricing packages for coaching services
 */
export const SectionPricing = ({
  packages,
  maxWidth = '6xl',
  ...props
}: SectionPricingProps) => {
  return (
    <Section maxWidth={maxWidth} {...props}>
      <Box className="mx-auto">
        <Stack gap={8} testid="stack">
          <Grid
            cols={{
              base: 1,
              lg: 3,
            }}
            gap={6}
          >
            {packages.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                features={pkg.features}
                isPopular={pkg.isPopular}
                callToAction={pkg.callToAction}
                variant={pkg.variant}
                testid="pricing-card"
              />
            ))}
          </Grid>
        </Stack>
      </Box>
    </Section>
  );
};
