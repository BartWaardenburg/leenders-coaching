import type { FC } from "react";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

/**
 * Card component for displaying testimonials
 */
export const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial }) => {
  const { quote, author, role } = testimonial;

  return (
    <Card variant="glass" className="group">
      {/* Quote mark decoration */}
      <div className="absolute top-4 right-4 text-4xl text-primary/10 transition-opacity group-hover:text-primary/20">
        &rdquo;
      </div>

      {/* Quote text */}
      <Text variant="cormorant" weight="medium" className="text-xl relative">
        &ldquo;{quote}&rdquo;
      </Text>

      {/* Author info */}
      <div className="mt-6 flex flex-col gap-1">
        <Text variant="playfair" weight="bold" className="text-lg">
          {author}
        </Text>
        {role && (
          <Text variant="muted" className="text-sm">
            {role}
          </Text>
        )}
      </div>
    </Card>
  );
};
