import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { Quote } from '@/components/ui/Quote';
import { Person } from '@/components/ui/Person';
import { Box } from '@/components/ui/Box';
import Image from 'next/image';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const testimonials = [
  {
    quote:
      "The coaching sessions have been transformative. I've gained clarity about my goals and the confidence to pursue them.",
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
  {
    quote:
      "Working with this coach has helped me overcome obstacles I didn't think were possible. The results speak for themselves.",
    name: 'Michael Chen',
    role: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
  {
    quote:
      'The personalized approach and actionable strategies have made a real difference in both my professional and personal life.',
    name: 'Emma Davis',
    role: 'Business Owner',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
];

const TestimonialSlide = ({
  quote,
  name,
  role,
  image,
}: (typeof testimonials)[number]) => (
  <Box className="max-w-2xl mx-auto px-4">
    <Quote
      cite={
        <Person
          name={name}
          description={role}
          imageSrc={image}
          className="max-w-xs mx-auto"
        />
      }
    >
      {quote}
    </Quote>
  </Box>
);

export const Default: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
};

const images = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'Team collaborating in a modern office',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'Personal coaching session',
  },
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'Group workshop session',
  },
];

const ImageSlide = ({ src, alt }: (typeof images)[number]) => (
  <Box className="relative aspect-[16/9] w-full max-w-4xl mx-auto">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover rounded-lg"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    />
  </Box>
);

export const WithImages: Story = {
  args: {
    slides: images.map((image) => <ImageSlide key={image.src} {...image} />),
  },
};
