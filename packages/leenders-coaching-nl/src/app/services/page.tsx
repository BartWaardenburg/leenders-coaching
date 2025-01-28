import { type FC } from "react";
import { type Metadata } from "next";

import { Grid } from "@/components/ui/Grid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceCard, type Service } from "@/components/ui/ServiceCard";
import { Stack } from "@/components/ui/Stack";
import { generateMetadata } from "@/utilities/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Our Services",
  description:
    "Discover our range of coaching services designed to help you achieve your personal and professional goals.",
  images: [
    {
      url: "/services-og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Leenders Coaching Services",
    },
  ],
});

/**
 * Services page showcasing available coaching options
 */
const ServicesPage: FC = () => {
  const services: Service[] = [
    {
      title: "Personal Development Coaching",
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
    {
      title: "Life Balance Coaching",
      description:
        "Find harmony in your life by balancing personal, professional, and social aspects.",
      features: [
        "Stress management",
        "Time management",
        "Relationship building",
        "Personal boundaries",
      ],
      slug: "life-balance",
    },
  ];

  return (
    <Section>
      <Stack space={12}>
        <PageHeader
          title="Our Services"
          description="Personalized coaching services to help you reach your full potential"
        />
        <Grid columns={{ default: 1, md: 2, lg: 3 }}>
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Grid>
      </Stack>
    </Section>
  );
};

export default ServicesPage;
