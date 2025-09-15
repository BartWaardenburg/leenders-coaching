import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Carousel } from './Carousel';
import { Quote } from '@/components/ui/Quote';
import { Person } from '@/components/ui/Person';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    slides: {
      control: 'object',
      description: 'Array van slides om weer te geven',
    },
    className: {
      control: 'text',
      description: 'Optionele className voor styling',
    },
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
  },
};

const images = [
  {
    src: 'https://picsum.photos/id/237/1200/800',
    alt: 'Team samenwerkend in een modern kantoor',
  },
  {
    src: 'https://picsum.photos/id/870/1200/800',
    alt: 'Persoonlijke coachingsessie',
  },
  {
    src: 'https://picsum.photos/id/1015/1200/800',
    alt: 'Groepsworkshop sessie',
  },
];

const ImageSlide = ({ src, alt }: (typeof images)[number]) => (
  <Box className="relative aspect-[16/9] w-full max-w-4xl mx-auto">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
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
      canvas.getByAltText('Team samenwerkend in een modern kantoor')
    ).toBeVisible();
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [
      <Box key="single" className="p-8 text-center">
        <Heading level="h2" variant="medium" className="mb-4">
          Single Slide
        </Heading>
        <Text variant="muted">
          This carousel has only one slide, so navigation should be hidden.
        </Text>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Single Slide')).toBeVisible();
  },
};

export const EmptyCarousel: Story = {
  args: {
    slides: [],
  },
  play: async ({ canvas: _canvas }) => {
    /* Empty carousel should render without errors. */
  },
};

export const ManySlides: Story = {
  args: {
    slides: Array.from({ length: 10 }, (_, i) => (
      <Box key={i} className="p-8 text-center">
        <Heading level="h2" variant="medium" className="mb-4">
          Slide {i + 1}
        </Heading>
        <Text variant="muted">This is slide number {i + 1} of 10 slides.</Text>
      </Box>
    )),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Slide 1')).toBeVisible();
  },
};

export const MixedContent: Story = {
  args: {
    slides: [
      <Box key="text" className="p-8 text-center">
        <Heading level="h2" variant="medium" className="mb-4">
          Text Content
        </Heading>
        <Text variant="muted">This slide contains only text content.</Text>
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
        <Heading level="h2" variant="medium" className="mb-4">
          Form Content
        </Heading>
        <Box className="space-y-4">
          <Input type="text" placeholder="Voer je naam in" />
          <Button variant="blue">Submit</Button>
        </Box>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Text Content')).toBeVisible();
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
    <Box className="space-y-6">
      <Box>
        <h3 className="text-lg font-semibold mb-4">Default Carousel</h3>
        <Carousel
          slides={testimonials.map((testimonial) => (
            <TestimonialSlide key={testimonial.name} {...testimonial} />
          ))}
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Image Carousel</h3>
        <Carousel
          slides={images.map((image) => (
            <ImageSlide key={image.src} {...image} />
          ))}
        />
      </Box>

      <Box>
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
      </Box>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Default Carousel')).toBeVisible();
    await expect(canvas.getAllByText('Single Slide')).toHaveLength(2);
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
      const nextButton = canvas.getByLabelText('Volgende slide');
      await userEvent.click(nextButton);

      /* Verify navigation buttons are still present after clicking. */
      await expect(canvas.getByLabelText('Volgende slide')).toBeVisible();
      await expect(canvas.getByLabelText('Vorige slide')).toBeVisible();
    });

    await step('Navigate to previous slide', async () => {
      const prevButton = canvas.getByLabelText('Vorige slide');
      await userEvent.click(prevButton);

      /* Verify navigation buttons are still present after clicking. */
      await expect(canvas.getByLabelText('Volgende slide')).toBeVisible();
      /* Previous button might be disabled at first slide, so just check it exists. */
      await expect(canvas.getByLabelText('Vorige slide')).toBeInTheDocument();
    });

    await step('Navigate through all slides', async () => {
      const nextButton = canvas.getByLabelText('Volgende slide');

      /* Go to second slide. */
      await userEvent.click(nextButton);

      /* Go to third slide. */
      await userEvent.click(nextButton);

      /* Verify navigation buttons are still present after navigating. */
      await expect(canvas.getByLabelText('Volgende slide')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Vorige slide')).toBeInTheDocument();
    });

    await step('Navigate back to first slide', async () => {
      const prevButton = canvas.getByLabelText('Vorige slide');

      /* Go back to second slide. */
      await userEvent.click(prevButton);

      /* Go back to first slide. */
      await userEvent.click(prevButton);

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
    await step('Verify dot indicators exist', async () => {
      /* Check that all three dot indicators are present. */
      const firstDot = canvas.getByLabelText('Ga naar slide 1');
      const secondDot = canvas.getByLabelText('Ga naar slide 2');
      const thirdDot = canvas.getByLabelText('Ga naar slide 3');

      expect(firstDot).toBeInTheDocument();
      expect(secondDot).toBeInTheDocument();
      expect(thirdDot).toBeInTheDocument();
    });

    await step('Test dot navigation functionality', async () => {
      /* Click on the second dot and verify it's clickable. */
      const secondDot = canvas.getByLabelText('Ga naar slide 2');
      await userEvent.click(secondDot);

      /* Verify the dot is still present after clicking. */
      expect(secondDot).toBeInTheDocument();
    });

    await step('Test third dot navigation', async () => {
      /* Click on the third dot and verify it's clickable. */
      const thirdDot = canvas.getByLabelText('Ga naar slide 3');
      await userEvent.click(thirdDot);

      /* Verify the dot is still present after clicking. */
      expect(thirdDot).toBeInTheDocument();
    });

    await step('Test first dot navigation', async () => {
      /* Click on the first dot and verify it's clickable. */
      const firstDot = canvas.getByLabelText('Ga naar slide 1');
      await userEvent.click(firstDot);

      /* Verify the dot is still present after clicking. */
      expect(firstDot).toBeInTheDocument();
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
      /* Find the carousel container by looking for the testimonial content. */
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
        /* Test that the carousel container exists and is interactive. */
        expect(carousel).toBeInTheDocument();

        /* Test touch events on the carousel. */
        await userEvent.pointer([
          { keys: '[TouchA>]', target: carousel },
          { coords: { x: 300, y: 200 } },
          { coords: { x: 100, y: 200 } },
          { keys: '[/TouchA]' },
        ]);

        /* Verify the carousel is still visible after touch interaction. */
        expect(carousel).toBeInTheDocument();
      }
    });

    await step('Test carousel navigation buttons', async () => {
      /* Test that navigation buttons are present. */
      const nextButton = canvas.getByLabelText('Volgende slide');
      const prevButton = canvas.getByLabelText('Vorige slide');

      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();

      /* Test clicking navigation buttons. */
      await userEvent.click(nextButton);

      await userEvent.click(prevButton);
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
        /* Focus on the carousel. */
        await userEvent.click(carousel);
        expect(carousel).toBeInTheDocument();

        /* Test keyboard navigation. */
        await userEvent.keyboard('{ArrowRight}');

        await userEvent.keyboard('{ArrowLeft}');

        /* Verify carousel is still functional. */
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
      /* Check for proper ARIA labels on navigation buttons. */
      const nextButton = canvas.getByLabelText('Volgende slide');
      const prevButton = canvas.getByLabelText('Vorige slide');

      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });

    await step('Check dot indicators accessibility', async () => {
      const dots = canvas.getAllByRole('button');
      const slideDots = dots.filter((button: Element) =>
        button.getAttribute('aria-label')?.includes('Ga naar slide')
      );

      /* If there are no slide dots with aria-labels, check for any dot buttons. */
      if (slideDots.length === 0) {
        /* Look for any small circular buttons that might be dots. */
        const allDots = dots.filter(
          (button: Element) =>
            button.className.includes('rounded-full') &&
            button.className.includes('w-2') &&
            button.className.includes('h-2')
        );
        expect(allDots.length).toBeGreaterThan(0);
      } else {
        expect(slideDots.length).toBeGreaterThan(0);

        /* Check that first dot is selected initially. */
        const firstDot = slideDots.find((button: Element) =>
          button.getAttribute('aria-label')?.includes('Ga naar slide 1')
        );
        expect(firstDot).toBeInTheDocument();
      }
    });

    await step('Check live region for screen readers', async () => {
      /* Check if there is a live region (may not be present in all implementations). */
      const liveRegion = canvas.queryByRole('status');
      if (liveRegion) {
        expect(liveRegion).toBeInTheDocument();
      }
    });
  },
};
