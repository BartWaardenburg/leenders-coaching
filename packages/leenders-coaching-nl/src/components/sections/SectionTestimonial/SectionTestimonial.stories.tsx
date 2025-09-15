import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionTestimonial } from './SectionTestimonial';
import { mockTestimonialSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionTestimonial',
  component: SectionTestimonial,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'De titel van de sectie',
      required: true,
    },
    description: {
      control: 'text',
      description: 'De beschrijving tekst',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Toon boven- en onderranden',
    },
    testimonials: {
      control: 'object',
      description: 'Array van testimonial objecten',
    },
  },
} satisfies Meta<typeof SectionTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultTestimonials = mockTestimonialSection.testimonials;

export const Default: Story = {
  args: {
    title: mockTestimonialSection.displayTitle,
    description: mockTestimonialSection.description,
    testimonials: defaultTestimonials,
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
  },
};

export const WithPurpleBackground: Story = {
  args: {
    ...Default.args,
    background: 'purple',
    border: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'What Our Clients Say',
    testimonials: defaultTestimonials,
    background: 'pink',
    border: true,
  },
};

export const SingleTestimonial: Story = {
  args: {
    title: 'Single Testimonial',
    description: 'Soms heb je maar één krachtige testimonial nodig.',
    testimonials: [defaultTestimonials[0]!],
    background: 'teal',
    border: true,
  },
};

export const ManyTestimonials: Story = {
  args: {
    title: 'Many Testimonials',
    description:
      'This section demonstrates how the carousel handles multiple testimonials.',
    testimonials: [
      ...defaultTestimonials,
      {
        quote:
          "The personalized approach and actionable strategies have made a real difference in both my professional and personal life. I can't recommend this coaching enough.",
        name: 'Lisa Wang',
        role: 'Product Manager',
        image: 'https://picsum.photos/id/1011/256/256',
      },
      {
        quote:
          'Working with this coach has been a game-changer. The insights and guidance have helped me navigate complex challenges with confidence.',
        name: 'David Rodriguez',
        role: 'Entrepreneur',
        image: 'https://picsum.photos/id/1012/256/256',
      },
      {
        quote:
          'The coaching sessions provided clarity when I needed it most. The structured approach and practical tools have been invaluable.',
        name: 'Jennifer Kim',
        role: 'Marketing Specialist',
        image: 'https://picsum.photos/id/1013/256/256',
      },
    ],
    background: 'blue',
    border: true,
  },
};

export const TestimonialsWithoutImages: Story = {
  args: {
    title: 'Testimonials Without Images',
    description: "Sommige testimonials hebben mogelijk geen profielfoto's.",
    testimonials: defaultTestimonials.map((testimonial) => ({
      ...testimonial,
      image: undefined,
    })),
    background: 'purple',
  },
};

export const AllBackgroundVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    testimonials: [],
  },
  render: () => (
    <div className="space-y-0">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (background) => (
          <SectionTestimonial
            key={background}
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Background`}
            description={`This section demonstrates the ${background} background variant.`}
            testimonials={defaultTestimonials}
            background={background}
            border={true}
          />
        )
      )}
    </div>
  ),
};
