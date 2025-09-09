import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionTestimonial } from './SectionTestimonial';

const meta = {
  title: 'Sections/SectionTestimonial',
  component: SectionTestimonial,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
  },
} satisfies Meta<typeof SectionTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTestimonials = [
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

export const Default: Story = {
  args: {
    title: 'What Our Clients Say',
    description:
      'Read about the experiences of people who have worked with us.',
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
