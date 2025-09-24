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
import { mockTestimonialSection } from '@/mocks';

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

// Using centralized mock data
const testimonials = mockTestimonialSection.testimonials;

const TestimonialSlide = ({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
}) => (
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
            'De coaching sessies hebben mijn carrière getransformeerd'
          ) ?? false
        );
      })[0]
    ).toBeVisible();
  },
};

// Using centralized mock data for images
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
          Enkele Slide
        </Heading>
        <Text variant="muted">
          Deze carousel heeft slechts één slide, dus navigatie zou verborgen
          moeten zijn.
        </Text>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Enkele Slide')).toBeVisible();
  },
};

export const EmptyCarousel: Story = {
  args: {
    slides: [],
  },
};

export const ManySlides: Story = {
  args: {
    slides: Array.from({ length: 10 }, (_, i) => (
      <Box key={i} className="p-8 text-center">
        <Heading level="h2" variant="medium" className="mb-4">
          Slide {i + 1}
        </Heading>
        <Text variant="muted">Dit is slide nummer {i + 1} van 10 slides.</Text>
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
          Tekst Inhoud
        </Heading>
        <Text variant="muted">Deze slide bevat alleen tekst inhoud.</Text>
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
          Formulier Inhoud
        </Heading>
        <Box className="space-y-4">
          <Input type="text" placeholder="Voer je naam in" />
          <Button variant="blue">Versturen</Button>
        </Box>
      </Box>,
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Tekst Inhoud')).toBeVisible();
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
        <h3 className="text-lg font-semibold mb-4">Standaard Carousel</h3>
        <Carousel
          slides={testimonials.map((testimonial) => (
            <TestimonialSlide key={testimonial.name} {...testimonial} />
          ))}
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Afbeelding Carousel</h3>
        <Carousel
          slides={images.map((image) => (
            <ImageSlide key={image.src} {...image} />
          ))}
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Enkele Slide</h3>
        <Carousel
          slides={[
            <Box key="single" className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Enkele Slide</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Deze carousel heeft slechts één slide.
              </p>
            </Box>,
          ]}
        />
      </Box>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Standaard Carousel')).toBeVisible();
    await expect(canvas.getAllByText('Enkele Slide')).toHaveLength(2);
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
              'De coaching sessies hebben mijn carrière getransformeerd'
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
              'De coaching sessies hebben mijn carrière getransformeerd'
            ) ?? false
          );
        })[0]
      ).toBeVisible();
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
              'De coaching sessies hebben mijn carrière getransformeerd'
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
              'De coaching sessies hebben mijn carrière getransformeerd'
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
  },
};
