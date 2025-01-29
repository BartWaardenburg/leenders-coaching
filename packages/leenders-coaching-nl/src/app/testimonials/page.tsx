import type { FC } from "react";

import { Grid } from "@/components/ui/Grid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

/**
 * Testimonials page component
 */
const TestimonialsPage: FC = () => {
  const testimonials = [
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
      <Grid>
        {testimonials.map((testimonial) => (
          <div key={testimonial.author}>{testimonial.author}</div>
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsPage;
