import { Button } from '@/components/ui/Button'
import { Stack } from '@/components/ui/Stack'
import { Text } from '@/components/ui/Text'
import { Heading } from '@/components/ui/Heading'
import { Box } from '@/components/ui/Box'
import { Flex } from '@/components/ui/Flex'
import { IoCheckmark } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

type PricingCardVariant = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal'

const cardBackgrounds: Record<PricingCardVariant, string> = {
  blue: 'bg-pastel-blue dark:bg-pastel-blue-dark',
  purple: 'bg-pastel-purple dark:bg-pastel-purple-dark',
  green: 'bg-pastel-green dark:bg-pastel-green-dark',
  pink: 'bg-pastel-pink dark:bg-pastel-pink-dark',
  yellow: 'bg-pastel-yellow dark:bg-pastel-yellow-dark',
  teal: 'bg-pastel-teal dark:bg-pastel-teal-dark',
}

const cardBordersLight: Record<PricingCardVariant, string> = {
  blue: 'border-pastel-blue dark:border-pastel-blue-dark',
  purple: 'border-pastel-purple dark:border-pastel-purple-dark',
  green: 'border-pastel-green dark:border-pastel-green-dark',
  pink: 'border-pastel-pink dark:border-pastel-pink-dark',
  yellow: 'border-pastel-yellow dark:border-pastel-yellow-dark',
  teal: 'border-pastel-teal dark:border-pastel-teal-dark',
}

const cardBordersDark: Record<PricingCardVariant, string> = {
  blue: 'border-pastel-blue-dark dark:border-pastel-blue',
  purple: 'border-pastel-purple-dark dark:border-pastel-purple',
  green: 'border-pastel-green-dark dark:border-pastel-green',
  pink: 'border-pastel-pink-dark dark:border-pastel-pink',
  yellow: 'border-pastel-yellow-dark dark:border-pastel-yellow',
  teal: 'border-pastel-teal-dark dark:border-pastel-teal',
}

interface PricingFeature {
  text: string
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  features: PricingFeature[]
  isPopular?: boolean
  ctaLabel: string
  onCtaClick: () => void
  variant?: PricingCardVariant
}

/**
 * PricingCard component displays pricing information for a coaching package
 */
export const PricingCard = ({
  title,
  description,
  price,
  features,
  isPopular = false,
  ctaLabel,
  onCtaClick,
  variant = 'blue',
}: PricingCardProps) => {
  const cardClasses = twMerge(
    'group relative h-full transition-theme border @container',
    isPopular
      ? `${cardBackgrounds[variant]} ${cardBordersDark[variant]}`
      : `${cardBackgrounds[variant]} ${cardBordersLight[variant]}`
  )

  return (
    <Box className={cardClasses}>
      <Flex className="h-full flex-col @lg:flex-row">
        <Box className="flex-1 p-4 @md:p-8">
          <Flex direction="column" className="h-full">
            <Box>
              {isPopular && (
                <Box className="relative mb-6">
                  <Text variant="card-meta" weight="medium" className="mb-2">
                    Meest gekozen
                  </Text>
                  <Box className="h-[2px] w-12 bg-foreground/80" />
                </Box>
              )}

              <Box className="pb-6">
                <Heading level="h3" variant="medium" weight="normal" spacing="none">
                  {title}
                </Heading>
                <Text className="mt-2 text-muted-foreground">{description}</Text>
              </Box>

              <Box className="border-b border-t border-foreground/80">
                <Flex className="py-4">
                  <Text className="text-4xl font-bold">{price}</Text>
                  {price !== 'Gratis' && (
                    <Text className="ml-1 self-end text-muted-foreground">/sessie</Text>
                  )}
                </Flex>
              </Box>

              <Box className="py-6">
                <Box className="hidden @lg:block">
                  <Flex className="flex-row divide-x divide-foreground/80">
                    <Box className="pr-8 flex-1">
                      <Stack className="space-y-3">
                        {features.slice(0, Math.ceil(features.length / 2)).map((feature, index) => (
                          <Flex key={index} className="items-center">
                            <Box>
                              <IoCheckmark className="h-4 w-4 shrink-0 text-foreground/80" />
                            </Box>
                            <Text className="ml-3">{feature.text}</Text>
                          </Flex>
                        ))}
                      </Stack>
                    </Box>

                    {features.length > 1 && (
                      <Box className="pl-8 flex-1">
                        <Stack className="space-y-3">
                          {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
                            <Flex key={index} className="items-center">
                              <Box>
                                <IoCheckmark className="h-4 w-4 shrink-0 text-foreground/80" />
                              </Box>
                              <Text className="ml-3">{feature.text}</Text>
                            </Flex>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Flex>
                </Box>

                <Box className="@lg:hidden">
                  <Stack className="space-y-3">
                    {features.map((feature, index) => (
                      <Flex key={index} className="items-center">
                        <Box>
                          <IoCheckmark className="h-4 w-4 shrink-0 text-foreground/80" />
                        </Box>
                        <Text className="ml-3">{feature.text}</Text>
                      </Flex>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>

            <Flex className="mt-auto" justify="end">
              <Button
                onClick={onCtaClick}
                variant={variant}
                className="transition-theme"
                fullWidthOnContainer
              >
                {ctaLabel}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
} 