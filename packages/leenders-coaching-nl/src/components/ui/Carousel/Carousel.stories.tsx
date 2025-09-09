import type { Meta, StoryObj } from '@storybook/nextjs';
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
    image: 'https://picsum.photos/id/64/256/256', // Woman portrait for consistent Storybook/Chromatic testing
  },
  {
    quote:
      "Working with this coach has helped me overcome obstacles I didn't think were possible. The results speak for themselves.",
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://picsum.photos/id/1027/256/256', // Man portrait for consistent Storybook/Chromatic testing
  },
  {
    quote:
      'The personalized approach and actionable strategies have made a real difference in both my professional and personal life.',
    name: 'Emma Davis',
    role: 'Business Owner',
    image: 'https://picsum.photos/id/1025/256/256', // Woman portrait for consistent Storybook/Chromatic testing
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
    src: 'https://picsum.photos/id/237/1200/800', // Dog image for consistent Storybook/Chromatic testing
    alt: 'Team collaborating in a modern office',
  },
  {
    src: 'https://picsum.photos/id/870/1200/800', // Mountain landscape for consistent Storybook/Chromatic testing
    alt: 'Personal coaching session',
  },
  {
    src: 'https://picsum.photos/id/1015/1200/800', // Beach scene for consistent Storybook/Chromatic testing
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
