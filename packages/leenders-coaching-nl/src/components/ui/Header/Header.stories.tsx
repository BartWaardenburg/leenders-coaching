import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
      { _key: '3', label: 'Services', href: '/services' },
      { _key: '4', label: 'Contact', href: '/contact' },
    ],
    about: {
      title: 'About',
      description: 'Learn more about our services',
    },
    social: {
      title: 'Follow Us',
    },
    contact: {
      title: 'Contact Us',
      projectEnquiry: {
        label: 'Project Enquiry',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'General Enquiry',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
};