import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Card, CardTitle, CardDescription, CardList } from "@/components/ui/Card";

type FeatureCardProps = {
  title: string;
  description: string;
  items?: string[];
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

/**
 * Reusable feature card component for content sections
 */
export const FeatureCard = ({
  title,
  description,
  items,
  children,
  ...props
}: FeatureCardProps) => {
  return (
    <Card variant="glass" {...props}>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {items && items.length > 0 && (
        <CardList items={items} bulletStyle="check" />
      )}
      {children}
    </Card>
  );
};
