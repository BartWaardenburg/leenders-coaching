import type { FC } from "react";

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
        <div key={feature.title}>{feature.title}</div>

      ))}
    </GridSection>
  );
};
