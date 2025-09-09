import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
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
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
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
