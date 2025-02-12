import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { Box } from '@/components/ui/Box'
import { Flex } from '@/components/ui/Flex'
import { PricingCard } from '@/components/ui/PricingCard/PricingCard'
import { Grid } from '@/components/ui/Grid'

interface PricingFeature {
  text: string
}

interface PricingPackage {
  title: string
  description: string
  price: string
  features: PricingFeature[]
  isPopular?: boolean
  ctaLabel: string
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal'
}

interface SectionPricingProps {
  title: string
  description: string
  packages: PricingPackage[]
  onBooking: () => void
}

/**
 * SectionPricing component displays pricing packages for coaching services
 */
export const SectionPricing = ({
  title,
  description,
  packages,
  onBooking
}: SectionPricingProps) => {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <Flex direction="column" items="center" className="mb-16">
          <Heading level="h2" variant="large" className="mb-6" textAlign="center">
            {title}
          </Heading>
          <Text className="text-muted-foreground text-center max-w-2xl">
            {description}
          </Text>
        </Flex>

        <Grid
          columns={{
            default: 1,
            '@2xl': 3,
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
              ctaLabel={pkg.ctaLabel}
              onCtaClick={onBooking}
              variant={pkg.variant}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  )
} 