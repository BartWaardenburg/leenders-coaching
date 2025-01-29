import type { FC } from "react";
import simoneImage from "@/assets/images/99-Simone-louise-boonstoppel-fotografie.jpg";

import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Grid } from "@/components/ui/Grid";
import { Button } from "@/components/ui/Button";
import { Box } from "@/components/ui/Box";
import { Text } from "@/components/ui/Text";
import { Container } from "@/components/ui/Container";

/**
 * Home page component
 */
const HomePage: FC = () => {
  const buttonVariants = [
    "black",
    "transparent",
    "blue",
    "purple",
    "green",
    "pink",
    "yellow",
    "teal",
  ] as const;

  return (
    <Section>
      <Stack space={24} className="mb-24">
        <Card featured={true}
          title="Freelance Life 01"
          date="01/11/18"
          categories={["MISCELLANEOUS"]}
          excerpt="At the beginning of August I took a leap of faith into the world of freelancing, you can find out..."
          slug="freelance-life-01"
          image={simoneImage}
        />
      </Stack>
      <Stack space={24}>
        {/* Card Variants Grid */}
        <Grid columns={{ default: 1, md: 2, lg: 3 }} gap={6}>
          {/* Full featured card */}
          <Card
            featured
            title="Full Featured Card"
            date="01/11/18"
            categories={["Featured", "Example"]}
            excerpt="This card shows all possible features including featured flag, date, categories, and excerpt text."
            slug="full-featured"
            image={simoneImage}
            variant="blue"
          />

          {/* Image only */}
          <Card
            title="Image Only Card"
            slug="image-only"
            image={simoneImage}
            variant="purple"
          />

          {/* Text only */}
          <Card
            title="Text Only Card"
            slug="text-only"
            variant="green"
          />

          {/* With excerpt */}
          <Card
            title="Card with Excerpt"
            excerpt="This card shows how it looks with just an excerpt and no other metadata."
            slug="with-excerpt"
            variant="pink"
          />

          {/* With metadata */}
          <Card
            title="Card with Metadata"
            date="01/11/18"
            categories={["Example", "Metadata"]}
            slug="with-metadata"
            variant="yellow"
          />

          {/* Featured only */}
          <Card
            featured
            title="Featured Card"
            slug="featured-only"
            variant="teal"
          />
        </Grid>

        {/* Button Variants */}
        <Box className="py-24">
          <Container>
            <Stack space={12}>
              {buttonVariants.map((variant) => (
                <Box key={variant}>
                  <Text variant="small" className="mb-4 capitalize">{variant}</Text>
                  <Stack direction="row" space={4}>
                    <Button variant={variant} size="sm">View All</Button>
                    <Button variant={variant} size="md">View All</Button>
                    <Button variant={variant} size="lg">View All</Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Container>
        </Box>
      </Stack>
    </Section>
  );
};

export default HomePage;
