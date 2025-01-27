import type { FC } from "react";

import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedTestimonials } from "@/components/sections/FeaturedTestimonials";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/components/ui/ServiceCard";
import { Stack } from "@/components/ui/Stack";
import type { Testimonial } from "@/components/ui/TestimonialCard";

/**
 * Home page component
 */
const HomePage: FC = () => {
  const services: Service[] = [
    {
      title: "Personal Development",
      description:
        "Unlock your full potential and achieve personal growth through one-on-one coaching sessions.",
      features: [
        "Self-discovery and awareness",
        "Goal setting and achievement",
        "Confidence building",
        "Work-life balance",
      ],
      slug: "personal-development",
    },
    {
      title: "Career Coaching",
      description:
        "Navigate your career path and achieve your professional goals with expert guidance.",
      features: [
        "Career planning and strategy",
        "Leadership development",
        "Professional networking",
        "Interview preparation",
      ],
      slug: "career-coaching",
    },
  ];

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
  ];

  return (
    <Section>
      <Stack space={24}>
        <Hero
          title="Transform Your Life With Professional Coaching"
          description="Discover your potential and achieve your goals with personalized coaching sessions"
          primaryCta={{
            href: "/contact",
            label: "Book a Free Consultation",
          }}
          secondaryCta={{
            href: "/services",
            label: "Learn More",
          }}
        />
        <FeaturedServices title="Our Services" services={services} />
        <FeaturedTestimonials
          title="What Our Clients Say"
          testimonials={testimonials}
        />
      </Stack>
    </Section>
  );
};

export default HomePage;
