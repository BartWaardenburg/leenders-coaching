import { Section } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
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

interface SectionPricingProps {
  title?: string;
  description?: string;
  packages: PricingPackage[];
  className?: string;
  background?: PastelVariant;
  border?: boolean;
  testid?: string;
}

/**
 * SectionPricing component displays pricing packages for coaching services
 */
export const SectionPricing = ({
  title,
  description,
  packages,
  className,
  background,
  border = false,
  testid,
  ...props
}: SectionPricingProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
      maxWidth="6xl"
      testid={testid}
      {...props}
    >
      <Box className="mx-auto">
        <Stack gap={8} testid="stack">
          {(title || description) && (
            <Stack space={4} className="text-center">
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
                <Text
                  variant="large"
                  className="max-w-2xl mx-auto"
                  testid="text"
                >
                  {description}
                </Text>
              )}
            </Stack>
          )}
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
