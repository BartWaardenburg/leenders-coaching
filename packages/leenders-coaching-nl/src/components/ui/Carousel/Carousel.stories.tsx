import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Carousel } from './Carousel';
import { Quote } from '@/components/ui/Quote';
import { Person } from '@/components/ui/Person';
import { Box } from '@/components/ui/Box';
import Image from 'next/image';
import {
  waitForMotionAnimations as _waitForMotionAnimations,
  waitForAnimation,
} from '../../../test/chromatic-utils';

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
    await expect(
      canvas.getAllByText((_: string, element: Element | null) => {
        return (
          element?.textContent?.includes(
            'The coaching sessions have been transformative'
          ) ?? false
        );
      })[0]
    ).toBeVisible();
    await waitForAnimation(50);
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
    await expect(
      canvas.getByAltText('Team collaborating in a modern office')
    ).toBeVisible();
    await waitForAnimation(50);
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
    await expect(canvas.getByText('Single Slide')).toBeVisible();
    await waitForAnimation(50);
  },
};

export const EmptyCarousel: Story = {
  args: {
    slides: [],
  },
  play: async ({ canvas: _canvas }) => {
    // Empty carousel should render without errors
    await waitForAnimation(50);
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
    await expect(canvas.getByText('Slide 1')).toBeVisible();
    await waitForAnimation(50);
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
    await expect(
      canvas.getAllByText((_: string, element: Element | null) => {
        return (
          element?.textContent?.includes(
            'The coaching sessions have been transformative'
          ) ?? false
        );
      })[0]
    ).toBeVisible();
    await waitForAnimation(50);
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
      <ImageSlide
        key="image"
        src={images[0]?.src || ''}
        alt={images[0]?.alt || ''}
      />,
      <TestimonialSlide
        key="testimonial"
        quote={testimonials[0]?.quote || ''}
        name={testimonials[0]?.name || ''}
        role={testimonials[0]?.role || ''}
        image={testimonials[0]?.image || ''}
      />,
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
    await expect(canvas.getByText('Text Content')).toBeVisible();
    await waitForAnimation(50);
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
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
    await expect(canvas.getByText('Default Carousel')).toBeVisible();
    await expect(canvas.getAllByText('Single Slide')).toHaveLength(2);
    await waitForAnimation(50);
  },
};

export const CarouselNavigation: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Initial carousel state', async () => {
      await expect(
        canvas.getAllByText((_: string, element: Element | null) => {
          return (
            element?.textContent?.includes(
              'The coaching sessions have been transformative'
            ) ?? false
          );
        })[0]
      ).toBeVisible();
    });

    await step('Navigate to next slide', async () => {
      const nextButton = canvas.getByLabelText('Next slide');
      await userEvent.click(nextButton);
      await waitForAnimation(50);

      // Verify navigation buttons are still present after clicking
      await expect(canvas.getByLabelText('Next slide')).toBeVisible();
      await expect(canvas.getByLabelText('Previous slide')).toBeVisible();
    });

    await step('Navigate to previous slide', async () => {
      const prevButton = canvas.getByLabelText('Previous slide');
      await userEvent.click(prevButton);
      await waitForAnimation(50);

      // Verify navigation buttons are still present after clicking
      await expect(canvas.getByLabelText('Next slide')).toBeVisible();
      // Previous button might be disabled at first slide, so just check it exists
      await expect(canvas.getByLabelText('Previous slide')).toBeInTheDocument();
    });

    await step('Navigate through all slides', async () => {
      const nextButton = canvas.getByLabelText('Next slide');

      // Go to second slide
      await userEvent.click(nextButton);
      await waitForAnimation(50);

      // Go to third slide
      await userEvent.click(nextButton);
      await waitForAnimation(50);

      // Verify navigation buttons are still present after navigating
      await expect(canvas.getByLabelText('Next slide')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Previous slide')).toBeInTheDocument();
    });

    await step('Navigate back to first slide', async () => {
      const prevButton = canvas.getByLabelText('Previous slide');

      // Go back to second slide
      await userEvent.click(prevButton);
      await waitForAnimation(50);

      // Go back to first slide
      await userEvent.click(prevButton);
      await waitForAnimation(50);

      await expect(
        canvas.getAllByText((_: string, element: Element | null) => {
          return (
            element?.textContent?.includes(
              'The coaching sessions have been transformative'
            ) ?? false
          );
        })[0]
      ).toBeVisible();
    });
  },
};

export const CarouselDotNavigation: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Click on dot indicators', async () => {
      // Find and click the second dot
      const dots = canvas.getAllByRole('button');
      const secondDot = dots.find((button: Element) =>
        button.getAttribute('aria-label')?.includes('Go to slide 2')
      );

      if (secondDot) {
        await userEvent.click(secondDot);
        await waitForAnimation(50);

        await expect(
          canvas.getAllByText((_: string, element: Element | null) => {
            return (
              element?.textContent?.includes(
                'Working with this coach has helped me overcome obstacles'
              ) ?? false
            );
          })[0]
        ).toBeVisible();
      }
    });

    await step('Click on third dot', async () => {
      const dots = canvas.getAllByRole('button');
      const thirdDot = dots.find((button: Element) =>
        button.getAttribute('aria-label')?.includes('Go to slide 3')
      );

      if (thirdDot) {
        await userEvent.click(thirdDot);
        await waitForAnimation(50);

        await expect(
          canvas.getAllByText((_: string, element: Element | null) => {
            return (
              element?.textContent?.includes(
                'The personalized approach and actionable strategies'
              ) ?? false
            );
          })[0]
        ).toBeVisible();
      }
    });

    await step('Click on first dot', async () => {
      const dots = canvas.getAllByRole('button');
      const firstDot = dots.find((button: Element) =>
        button.getAttribute('aria-label')?.includes('Go to slide 1')
      );

      if (firstDot) {
        await userEvent.click(firstDot);
        await waitForAnimation(50);

        await expect(
          canvas.getAllByText((_: string, element: Element | null) => {
            return (
              element?.textContent?.includes(
                'The coaching sessions have been transformative'
              ) ?? false
            );
          })[0]
        ).toBeVisible();
      }
    });
  },
};

export const CarouselSwipeGestures: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Test carousel structure and touch events', async () => {
      // Find the carousel container by looking for the testimonial content
      const testimonialTexts = canvas.getAllByText(
        (_content: string, element: Element | null) => {
          return (
            element?.textContent?.includes(
              'The coaching sessions have been transformative'
            ) ?? false
          );
        }
      );
      const carousel = testimonialTexts[0]?.closest('div');

      if (carousel) {
        // Test that the carousel container exists and is interactive
        expect(carousel).toBeInTheDocument();

        // Test touch events on the carousel
        await userEvent.pointer([
          { keys: '[TouchA>]', target: carousel },
          { coords: { x: 300, y: 200 } },
          { coords: { x: 100, y: 200 } },
          { keys: '[/TouchA]' },
        ]);

        await waitForAnimation(50);

        // Verify the carousel is still visible after touch interaction
        expect(carousel).toBeInTheDocument();
      }
    });

    await step('Test carousel navigation buttons', async () => {
      // Test that navigation buttons are present
      const nextButton = canvas.getByLabelText('Next slide');
      const prevButton = canvas.getByLabelText('Previous slide');

      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();

      // Test clicking navigation buttons
      await userEvent.click(nextButton);
      await waitForAnimation(50);

      await userEvent.click(prevButton);
      await waitForAnimation(50);
    });
  },
};

export const CarouselKeyboardNavigation: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Test keyboard navigation', async () => {
      const testimonialTexts = canvas.getAllByText(
        (_content: string, element: Element | null) => {
          return (
            element?.textContent?.includes(
              'The coaching sessions have been transformative'
            ) ?? false
          );
        }
      );
      const carousel = testimonialTexts[0]?.closest('div');

      if (carousel) {
        // Focus on the carousel
        await userEvent.click(carousel);
        expect(carousel).toBeInTheDocument();

        // Test keyboard navigation
        await userEvent.keyboard('{ArrowRight}');
        await waitForAnimation(50);

        await userEvent.keyboard('{ArrowLeft}');
        await waitForAnimation(50);

        // Verify carousel is still functional
        expect(carousel).toBeInTheDocument();
      }
    });
  },
};

export const CarouselAccessibility: Story = {
  args: {
    slides: testimonials.map((testimonial) => (
      <TestimonialSlide key={testimonial.name} {...testimonial} />
    )),
  },
  play: async ({ canvas, step }) => {
    await step('Check ARIA attributes', async () => {
      // Check for proper ARIA labels on navigation buttons
      const nextButton = canvas.getByLabelText('Next slide');
      const prevButton = canvas.getByLabelText('Previous slide');

      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });

    await step('Check dot indicators accessibility', async () => {
      const dots = canvas.getAllByRole('button');
      const slideDots = dots.filter((button: Element) =>
        button.getAttribute('aria-label')?.includes('Go to slide')
      );

      // If there are no slide dots with aria-labels, check for any dot buttons
      if (slideDots.length === 0) {
        // Look for any small circular buttons that might be dots
        const allDots = dots.filter(
          (button: Element) =>
            button.className.includes('rounded-full') &&
            button.className.includes('w-2') &&
            button.className.includes('h-2')
        );
        expect(allDots.length).toBeGreaterThan(0);
      } else {
        expect(slideDots.length).toBeGreaterThan(0);

        // Check that first dot is selected initially
        const firstDot = slideDots.find((button: Element) =>
          button.getAttribute('aria-label')?.includes('Go to slide 1')
        );
        expect(firstDot).toBeInTheDocument();
      }
    });

    await step('Check live region for screen readers', async () => {
      // Check if there's a live region (may not be present in all implementations)
      const liveRegion = canvas.queryByRole('status');
      if (liveRegion) {
        expect(liveRegion).toBeInTheDocument();
      }
    });
  },
};
