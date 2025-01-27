import type { FC } from "react";

import { FeatureCard } from "@/components/ui/FeatureCard";
import { GridSection } from "@/components/ui/GridSection";

type Feature = {
  title: string;
  description: string;
  items?: string[];
};

type FeaturesGridProps = {
  title?: string;
  features: Feature[];
};

/**
 * Grid layout for feature cards
 */
export const FeaturesGrid: FC<FeaturesGridProps> = ({ title, features }) => {
  return (
    <GridSection title={title} columns={{ default: 1 }} maxWidth="4xl">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          items={feature.items}
        />
      ))}
    </GridSection>
  );
};
