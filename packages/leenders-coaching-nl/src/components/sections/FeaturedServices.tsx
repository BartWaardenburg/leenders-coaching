import type { FC } from "react";

import { GridSection } from "@/components/ui/GridSection";
import { ServiceCard, type Service } from "@/components/ui/ServiceCard";

type FeaturedServicesProps = {
  title: string;
  services: Service[];
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
        <ServiceCard key={service.title} service={service} />
      ))}
    </GridSection>
  );
};
