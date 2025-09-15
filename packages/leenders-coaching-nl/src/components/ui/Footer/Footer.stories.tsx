import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Footer } from './Footer';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';
import { mockGlobalData } from '@/mocks';

const meta = {
  title: 'UI/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    copyright: {
      control: 'text',
      description: 'Copyright tekst',
    },
    contact: {
      control: 'object',
      description: 'Contact informatie',
    },
    socialLinks: {
      control: 'object',
      description: 'Social media links',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mocks from @/mocks
const mockContact = mockGlobalData.footer.contact;
const mockSocialLinks = mockGlobalData.footer.social;

export const Default: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithEmailOnly: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: {
      email: 'info@leenders-coaching.nl',
      phone: null,
    },
    socialLinks: [],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithPhoneOnly: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: {
      email: null,
      phone: '+31 6 12345678',
    },
    socialLinks: [],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithInstagramOnly: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: [
      {
        _key: 'instagram-1',
        platform: 'Instagram',
        url: 'https://www.instagram.com/leenders_coaching',
      },
    ],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithMultipleSocialLinks: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithoutCopyright: Story = {
  args: {
    copyright: null,
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithoutContact: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: {
      email: null,
      phone: null,
    },
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithoutSocialLinks: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: [],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const MinimalFooter: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching.',
    contact: {
      email: null,
      phone: null,
    },
    socialLinks: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('© 2024 Leenders Coaching.')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const LongCopyright: Story = {
  args: {
    copyright:
      '© 2024 Leenders Coaching. Alle rechten voorbehouden. Deze website is eigendom van Leenders Coaching en mag niet worden gekopieerd zonder toestemming.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(
        '© 2024 Leenders Coaching. Alle rechten voorbehouden. Deze website is eigendom van Leenders Coaching en mag niet worden gekopieerd zonder toestemming.'
      )
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const WithCustomClassName: Story = {
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
    className: 'border-t-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const ResponsiveLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const DesktopInstagramVisibility: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('© 2024 Leenders Coaching. Alle rechten voorbehouden.')
    ).toBeVisible();
    await expect(canvas.getByText('info@leenders-coaching.nl')).toBeVisible();
    await expect(canvas.getByText('+31 6 12345678')).toBeVisible();
    // Footer rendering complete - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: mockContact,
    socialLinks: mockSocialLinks,
  },
  render: () => (
    <Box className="space-y-8">
      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Default Footer
        </Heading>
        <Footer
          copyright="© 2024 Leenders Coaching. Alle rechten voorbehouden."
          contact={mockContact}
          socialLinks={mockSocialLinks}
        />
      </Box>

      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Minimal Footer
        </Heading>
        <Footer
          copyright="© 2024 Leenders Coaching."
          contact={{ email: null, phone: null }}
          socialLinks={[]}
        />
      </Box>

      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Email Only
        </Heading>
        <Footer
          copyright="© 2024 Leenders Coaching. Alle rechten voorbehouden."
          contact={{ email: 'info@leenders-coaching.nl', phone: null }}
          socialLinks={[]}
        />
      </Box>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getAllByText(
        '© 2024 Leenders Coaching. Alle rechten voorbehouden.'
      )
    ).toHaveLength(2);
    await expect(canvas.getByText('© 2024 Leenders Coaching.')).toBeVisible();
    await expect(canvas.getAllByText('info@leenders-coaching.nl')).toHaveLength(
      2
    );
    // Footer rendering complete - no animation wait needed
  },
};
