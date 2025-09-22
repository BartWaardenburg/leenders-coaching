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
    title: 'Wat Onze Klanten Zeggen',
    testimonials: defaultTestimonials,
    background: 'pink',
    border: true,
  },
};

export const SingleTestimonial: Story = {
  args: {
    title: 'Enkele Testimonial',
    description: 'Soms heb je maar één krachtige testimonial nodig.',
    testimonials: [defaultTestimonials[0]!],
    background: 'teal',
    border: true,
  },
};

export const ManyTestimonials: Story = {
  args: {
    title: 'Veel Testimonials',
    description:
      'Deze sectie demonstreert hoe de carousel meerdere testimonials afhandelt.',
    testimonials: [
      ...defaultTestimonials,
      {
        quote:
          'De gepersonaliseerde aanpak en uitvoerbare strategieën hebben een echt verschil gemaakt in zowel mijn professionele als persoonlijke leven. Ik kan deze coaching niet genoeg aanbevelen.',
        name: 'Lisa Wang',
        role: 'Product Manager',
        image: 'https://picsum.photos/id/1011/256/256',
      },
      {
        quote:
          'Werken met deze coach is een game-changer geweest. De inzichten en begeleiding hebben me geholpen complexe uitdagingen met vertrouwen aan te pakken.',
        name: 'David Rodriguez',
        role: 'Ondernemer',
        image: 'https://picsum.photos/id/1012/256/256',
      },
      {
        quote:
          'De coachingsessies gaven duidelijkheid toen ik het het meest nodig had. De gestructureerde aanpak en praktische tools zijn van onschatbare waarde geweest.',
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
    title: 'Testimonials Zonder Afbeeldingen',
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
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Achtergrond`}
            description={`Deze sectie demonstreert de ${background} achtergrond variant.`}
            testimonials={defaultTestimonials}
            background={background}
            border={true}
          />
        )
      )}
    </div>
  ),
};
