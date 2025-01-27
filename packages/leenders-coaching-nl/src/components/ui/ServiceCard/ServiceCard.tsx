import type { ComponentPropsWithoutRef } from "react";

import { Card, CardTitle, CardDescription, CardList } from "@/components/ui/Card";

export type Service = {
  title: string;
  description: string;
  features: string[];
  slug: string;
};

type ServiceCardProps = {
  service: Service;
} & ComponentPropsWithoutRef<"div">;

/**
 * Card component for displaying service information
 */
export const ServiceCard = ({ service, className, ...props }: ServiceCardProps) => {
  return (
    <Card
      href={`/services/${service.slug}`}
      className={className}
      {...props}
    >
      <CardTitle>{service.title}</CardTitle>
      <CardDescription>{service.description}</CardDescription>
      <CardList items={service.features} bulletStyle="check" />
    </Card>
  );
};
