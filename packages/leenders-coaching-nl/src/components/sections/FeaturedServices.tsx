import type { FC } from "react";

import { GridSection } from "@/components/ui/GridSection";

type FeaturedServicesProps = {
  title: string;
  services: {
    title: string;
    description: string;
  }[];
};

/**
 * Featured services section component
 */
export const FeaturedServices: FC<FeaturedServicesProps> = ({
  title,
  services,
}) => {
  return (
    <GridSection title={title} variant="secondary">
      {services.map((service) => (
        <div key={service.title}>{service.title}</div>
      ))}
    </GridSection>
  );
};
