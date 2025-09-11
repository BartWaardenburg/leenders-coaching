import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Footer } from './Footer';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    copyright: {
      control: 'text',
      description: 'Copyright text',
    },
    contact: {
      control: 'object',
      description: 'Contact information',
    },
    socialLinks: {
      control: 'object',
      description: 'Social media links',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockContact = {
  email: 'info@leenders-coaching.nl',
  phone: '+31 6 12345678',
};

const mockSocialLinks = [
  {
    _key: 'instagram-1',
    platform: 'Instagram',
    url: 'https://www.instagram.com/leenders_coaching',
  },
  {
    _key: 'facebook-1',
    platform: 'Facebook',
    url: 'https://www.facebook.com/leenders-coaching-nl',
  },
  {
    _key: 'linkedin-1',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/company/leenders-coaching',
  },
];

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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await waitForMotionAnimations({ canvas });
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
    await expect(canvas.getByText('Instagram')).toBeVisible();
    await waitForMotionAnimations({ canvas });
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Footer</h3>
        <Footer
          copyright="© 2024 Leenders Coaching. Alle rechten voorbehouden."
          contact={mockContact}
          socialLinks={mockSocialLinks}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Footer</h3>
        <Footer
          copyright="© 2024 Leenders Coaching."
          contact={{ email: null, phone: null }}
          socialLinks={[]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Email Only</h3>
        <Footer
          copyright="© 2024 Leenders Coaching. Alle rechten voorbehouden."
          contact={{ email: 'info@leenders-coaching.nl', phone: null }}
          socialLinks={[]}
        />
      </div>
    </div>
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
    await waitForMotionAnimations({ canvas });
  },
};
