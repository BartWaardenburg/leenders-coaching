import { Button } from '@/components/ui/Button';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { IoCheckmark } from 'react-icons/io5';
import { cn } from '@/utilities/cn';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

type PricingCardVariant = PastelVariant;

const cardBackgrounds: Record<PricingCardVariant, string> = {
  blue: pastelVariant.blue.bg,
  purple: pastelVariant.purple.bg,
  green: pastelVariant.green.bg,
  pink: pastelVariant.pink.bg,
  yellow: pastelVariant.yellow.bg,
  teal: pastelVariant.teal.bg,
};

const cardBordersLight: Record<PricingCardVariant, string> = {
  blue: pastelVariant.blue.borderLight,
  purple: pastelVariant.purple.borderLight,
  green: pastelVariant.green.borderLight,
  pink: pastelVariant.pink.borderLight,
  yellow: pastelVariant.yellow.borderLight,
  teal: pastelVariant.teal.borderLight,
};

const cardBordersDark: Record<PricingCardVariant, string> = {
  blue: pastelVariant.blue.borderDark,
  purple: pastelVariant.purple.borderDark,
  green: pastelVariant.green.borderDark,
  pink: pastelVariant.pink.borderDark,
  yellow: pastelVariant.yellow.borderDark,
  teal: pastelVariant.teal.borderDark,
};

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaLabel: string;
  onCtaClick?: () => void;
  variant?: PricingCardVariant;
  testid?: string;
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
  testid,
}: PricingCardProps) => {
  const cardClasses = cn(
    'group relative h-full transition-theme border @container',
    isPopular
      ? `${cardBackgrounds[variant]} ${cardBordersDark[variant]}`
      : `${cardBackgrounds[variant]} ${cardBordersLight[variant]}`
  );

  return (
    <Box className={cardClasses} data-testid={testid}>
      <Flex direction="column" className="h-full @lg:flex-row">
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
                <Heading
                  level="h3"
                  variant="medium"
                  weight="normal"
                  spacing="none"
                >
                  {title}
                </Heading>
                <Text variant="muted">{description}</Text>
              </Box>

              <Box className="border-b border-t border-foreground/80">
                <Flex className="py-4">
                  <Text className="text-4xl font-bold">{price}</Text>
                  {price !== 'Gratis' && (
                    <Text className="ml-1 self-end text-muted-foreground">
                      /sessie
                    </Text>
                  )}
                </Flex>
              </Box>

              <Box className="py-6">
                <Box className="hidden @lg:block">
                  <Flex className="flex-row divide-x divide-foreground/80">
                    <Box className="pr-8 flex-1">
                      <Stack className="space-y-3">
                        {features
                          .slice(0, Math.ceil(features.length / 2))
                          .map((feature, index) => (
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
                          {features
                            .slice(Math.ceil(features.length / 2))
                            .map((feature, index) => (
                              <Flex key={index} className="items-center">
                                <Box>
                                  <IoCheckmark className="h-4 w-4 shrink-0 text-foreground/80" />
                                </Box>
                                <Text variant="default" className="ml-3">
                                  {feature.text}
                                </Text>
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

            {onCtaClick && (
              <Flex className="mt-auto" justify="end">
                <Button
                  onClick={onCtaClick}
                  variant={variant}
                  className="transition-theme"
                  fullWidthUntil="lg"
                >
                  {ctaLabel}
                </Button>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
