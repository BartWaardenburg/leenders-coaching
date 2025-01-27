import type { FC } from "react";

import { GridSection } from "@/components/ui/GridSection";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/ui/TestimonialCard";

type FeaturedTestimonialsProps = {
  title: string;
  testimonials: Testimonial[];
};

/**
 * Featured testimonials section component
 */
export const FeaturedTestimonials: FC<FeaturedTestimonialsProps> = ({
  title,
  testimonials,
}) => {
  return (
    <GridSection
      title={title}
      variant="primary"
      columns={{ default: 1, md: 2, lg: 3 }}
      maxWidth="6xl"
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.author} testimonial={testimonial} />
      ))}
    </GridSection>
  );
};
