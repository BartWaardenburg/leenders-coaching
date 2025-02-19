import { Section, PastelColor } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
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
  title?: string
  description?: string
  packages: PricingPackage[]
  onBooking?: () => void
  className?: string
  background?: PastelColor
  border?: boolean
}

/**
 * SectionPricing component displays pricing packages for coaching services
 */
export const SectionPricing = ({
  title,
  description,
  packages,
  className,
  onBooking,
  background,
  border = false,
}: SectionPricingProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
    >
      {(title || description) && (
        <Flex direction="column" items="center" className="mb-16">
          {title && (
            <Heading level="h2" variant="large" showBorder borderColor={background} textAlign="center">
              {title}
            </Heading>
          )}
          {description && (
            <Text className="text-muted-foreground text-center max-w-2xl">
              {description}
            </Text>
          )}
        </Flex>
      )}
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
            variant={pkg.variant}
            {...(onBooking && { onCtaClick: onBooking })}
          />
        ))}
      </Grid>
    </Section>
  )
} 