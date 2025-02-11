import type { FC } from "react";
import simoneImage from "@/assets/images/99-Simone-louise-boonstoppel-fotografie.jpg";

import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

/**
 * Home page component
 */
const HomePage: FC = () => {
  return (
    <Section>
      <Stack gap={6} className="mb-24">
        <Card
          featured
          title="Freelance Life 01"
          date="01/11/18"
          categories={["MISCELLANEOUS"]}
          slug="freelance-life-01"
          image={simoneImage}
        >
          At the beginning of August I took a leap of faith into the world of freelancing, you can find out...
        </Card>
      </Stack>
    </Section>
  );
};

export default HomePage;
