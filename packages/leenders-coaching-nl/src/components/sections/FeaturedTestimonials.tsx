import type { FC } from "react";

import { GridSection } from "@/components/ui/GridSection";

type FeaturedTestimonialsProps = {
  title: string;
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
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
        <div key={testimonial.author}>{testimonial.author}</div>
      ))}
    </GridSection>
  );
};
