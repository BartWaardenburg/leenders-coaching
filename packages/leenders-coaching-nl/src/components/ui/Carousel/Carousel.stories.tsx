import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Carousel } from './Carousel';
import { Quote } from '@/components/ui/Quote';
import { Person } from '@/components/ui/Person';
import { Box } from '@/components/ui/Box';
import Image from 'next/image';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const testimonials = [
  {
    quote:
      "The coaching sessions have been transformative. I've gained clarity about my goals and the confidence to pursue them.",
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    image: 'https://picsum.photos/id/64/256/256',
  },
  {
    quote:
      "Working with this coach has helped me overcome obstacles I didn't think were possible. The results speak for themselves.",
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://picsum.photos/id/1027/256/256',
  },
  {
    quote:
      'The personalized approach and actionable strategies have made a real difference in both my professional and personal life.',
    name: 'Emma Davis',
    role: 'Business Owner',
    image: 'https://picsum.photos/id/1025/256/256',
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
  play: async ({ canvas }) => {
    // Wait for the carousel to be visible and animations to complete
    await expect(
      canvas.getAllByText((_, element) => {
        return (
          element?.textContent?.includes(
            'The coaching sessions have been transformative'
          ) ?? false
        );
      })[0]
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

const images = [
  {
    src: 'https://picsum.photos/id/237/1200/800',
    alt: 'Team collaborating in a modern office',
  },
  {
    src: 'https://picsum.photos/id/870/1200/800',
    alt: 'Personal coaching session',
  },
  {
    src: 'https://picsum.photos/id/1015/1200/800',
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
  play: async ({ canvas }) => {
    // Wait for the carousel with images to be visible and animations to complete
    await expect(
      canvas.getByAltText('Team collaborating in a modern office')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [
      <Box key="single" className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Single Slide</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This carousel has only one slide, so navigation should be hidden.
        </p>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    // Wait for the single slide to be visible
    await expect(canvas.getByText('Single Slide')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const EmptyCarousel: Story = {
  args: {
    slides: [],
  },
  play: async ({ canvas }) => {
    // Empty carousel should render without errors
    await waitForMotionAnimations({ canvas });
  },
};

export const ManySlides: Story = {
  args: {
    slides: Array.from({ length: 10 }, (_, i) => (
      <Box key={i} className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Slide {i + 1}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is slide number {i + 1} of 10 slides.
        </p>
      </Box>
    )),
  },
  play: async ({ canvas }) => {
    // Wait for the first slide to be visible
    await expect(canvas.getByText('Slide 1')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomClassName: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
    className: 'border-2 border-blue-500 rounded-lg p-4',
  },
  play: async ({ canvas }) => {
    // Wait for the carousel to be visible and animations to complete
    await expect(
      canvas.getAllByText((_, element) => {
        return (
          element?.textContent?.includes(
            'The coaching sessions have been transformative'
          ) ?? false
        );
      })[0]
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MixedContent: Story = {
  args: {
    slides: [
      <Box key="text" className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Text Content</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This slide contains only text content.
        </p>
      </Box>,
      <ImageSlide key="image" {...images[0]} />,
      <TestimonialSlide key="testimonial" {...testimonials[0]} />,
      <Box key="form" className="p-8">
        <h2 className="text-2xl font-bold mb-4">Form Content</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    // Wait for the first slide to be visible
    await expect(canvas.getByText('Text Content')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {},
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Carousel</h3>
        <Carousel
          slides={testimonials.map((testimonial) => (
            <TestimonialSlide key={testimonial.name} {...testimonial} />
          ))}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Image Carousel</h3>
        <Carousel
          slides={images.map((image) => (
            <ImageSlide key={image.src} {...image} />
          ))}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Single Slide</h3>
        <Carousel
          slides={[
            <Box key="single" className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Single Slide</h2>
              <p className="text-gray-600 dark:text-gray-400">
                This carousel has only one slide.
              </p>
            </Box>,
          ]}
        />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    // Wait for all carousel variants to be visible
    await expect(canvas.getByText('Default Carousel')).toBeVisible();
    await expect(canvas.getAllByText('Single Slide')).toHaveLength(2);
    await waitForMotionAnimations({ canvas });
  },
};
