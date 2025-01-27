import type { FC } from "react";

import { Grid } from "@/components/ui/Grid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import {
  TestimonialCard,
  type Testimonial,
} from "@/components/ui/TestimonialCard";

/**
 * Testimonials page component
 */
const TestimonialsPage: FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Working with Leenders Coaching transformed my approach to leadership and personal growth.",
      author: "Sarah Johnson",
      role: "Marketing Executive",
    },
    {
      quote:
        "The coaching sessions helped me find clarity in my business goals and personal life.",
      author: "Michael Chen",
      role: "Entrepreneur",
    },
    {
      quote:
        "The personalized approach and actionable strategies made all the difference in my career transition.",
      author: "Emma Williams",
      role: "HR Professional",
    },
  ];

  return (
    <Section>
      <PageHeader
        title="Client Testimonials"
        description="Hear what others say about their coaching experience"
      />
      <Grid className="max-w-7xl">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} testimonial={testimonial} />
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsPage;
