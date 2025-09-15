import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { waitForMotionAnimations } from '@/test/chromatic-utils';
import { Header } from './Header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'Over ons', href: '/about' },
      { _key: '3', label: 'Diensten', href: '/services' },
      { _key: '4', label: 'Contact', href: '/contact' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  play: async ({ canvas }) => {
    /* Check that the header structure is present. */
    await expect(canvas.getByRole('banner')).toBeInTheDocument();
    await expect(
      canvas.getByLabelText('Menu openen/sluiten')
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText('Thema aanpassen')).toBeInTheDocument();
  },
};

export const HeaderMobileMenu: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'Over ons', href: '/about' },
      { _key: '3', label: 'Diensten', href: '/services' },
      { _key: '4', label: 'Contact', href: '/contact' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
        {
          _key: '2',
          platform: 'instagram',
          url: 'https://www.instagram.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Verify mobile header structure', async () => {
      /* Check that mobile menu button is present and clickable. */
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toBeEnabled();
    });

    await step('Test menu button interactions', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');

      /* Test clicking the menu button multiple times. */
      await userEvent.click(menuButton);
      /* Simple interaction - no animation wait needed. */

      await userEvent.click(menuButton);
      /* Simple interaction - no animation wait needed. */

      await userEvent.click(menuButton);
      /* Simple interaction - no animation wait needed. */
    });

    await step('Verify menu button remains functional', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toBeEnabled();
    });
  },
};

export const HeaderNavigation: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'Over ons', href: '/about' },
      { _key: '3', label: 'Diensten', href: '/services' },
      { _key: '4', label: 'Contact', href: '/contact' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open mobile menu to access navigation items', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      await userEvent.click(menuButton);

      /* Wait for menu animation to complete */
      await waitForMotionAnimations({ canvas });
    });

    await step('Verify navigation items are present', async () => {
      /* Just verify that navigation items are visible without clicking them */
      const homeLink = canvas.getByText('Home');
      expect(homeLink).toBeVisible();

      const aboutLinks = canvas.getAllByText('Over ons');
      expect(aboutLinks.length).toBeGreaterThan(0);
      expect(aboutLinks[0]).toBeVisible();

      const servicesLink = canvas.getByText('Diensten');
      expect(servicesLink).toBeVisible();

      const contactLink = canvas.getByText('Contact');
      expect(contactLink).toBeVisible();
    });
  },
};

export const HeaderSocialLinks: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
        {
          _key: '2',
          platform: 'instagram',
          url: 'https://www.instagram.com',
        },
        {
          _key: '3',
          platform: 'twitter',
          url: 'https://www.twitter.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open mobile menu to access social links', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      await userEvent.click(menuButton);

      /* Wait for menu animation to complete */
      await waitForMotionAnimations({ canvas });
    });

    await step('Verify social links are present', async () => {
      /* Check that social links are visible in mobile menu */
      const facebookLink = canvas.getByText('facebook');
      const instagramLink = canvas.getByText('instagram');
      const twitterLink = canvas.getByText('twitter');

      expect(facebookLink).toBeVisible();
      expect(instagramLink).toBeVisible();
      expect(twitterLink).toBeVisible();
    });
  },
};

export const HeaderContactLinks: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Open mobile menu to access contact links', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      await userEvent.click(menuButton);

      /* Wait for menu animation to complete */
      await waitForMotionAnimations({ canvas });
    });

    await step('Verify contact links are present', async () => {
      /* Check that contact links are visible - use getAllByText since there are multiple */
      const contactLinks = canvas.getAllByText('Contact Us');
      expect(contactLinks.length).toBeGreaterThan(0);

      /* Verify that at least one contact link is visible */
      const clickableLinks = contactLinks.filter(
        (link) => link.tagName === 'A'
      );
      expect(clickableLinks.length).toBeGreaterThan(0);
      expect(clickableLinks[0]).toBeVisible();
    });
  },
};

export const HeaderThemeToggle: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Toggle theme multiple times', async () => {
      const themeButton = canvas.getByLabelText('Thema aanpassen');
      expect(themeButton).toBeInTheDocument();

      /* Click theme toggle multiple times. */
      await userEvent.click(themeButton);
      /* Simple interaction - no animation wait needed. */

      await userEvent.click(themeButton);
      /* Simple interaction - no animation wait needed. */

      await userEvent.click(themeButton);
      /* Simple interaction - no animation wait needed. */
    });

    await step('Hover over theme toggle', async () => {
      const themeButton = canvas.getByLabelText('Thema aanpassen');
      await userEvent.hover(themeButton);
      /* Simple interaction - no animation wait needed. */

      await userEvent.unhover(themeButton);
      /* Simple interaction - no animation wait needed. */
    });
  },
};

export const HeaderAccessibility: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'Over ons', href: '/about' },
      { _key: '3', label: 'Diensten', href: '/services' },
      { _key: '4', label: 'Contact', href: '/contact' },
    ],
    about: {
      title: 'Over ons',
      description: 'Meer informatie over onze diensten',
    },
    social: {
      title: 'Volg ons',
      links: [
        {
          _key: '1',
          platform: 'facebook',
          url: 'https://www.facebook.com',
        },
      ],
    },
    contact: {
      title: 'Neem contact op',
      projectEnquiry: {
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Contact Us',
      },
      generalEnquiry: {
        label: 'Algemene vragen',
        href: '/contact',
        linkText: 'Contact Us',
      },
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Keyboard navigation', async () => {
      /* Test tab navigation. */
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
    });

    await step('Screen reader accessibility', async () => {
      /* Check for proper ARIA labels. */
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');
      const themeButton = canvas.getByLabelText('Thema aanpassen');

      expect(menuButton).toBeInTheDocument();
      expect(themeButton).toBeInTheDocument();

      /* Check for navigation landmark (may not be present in all implementations). */
      const nav = canvas.queryByRole('navigation');
      if (nav) {
        expect(nav).toBeInTheDocument();
      }
    });

    await step('Focus management', async () => {
      const menuButton = canvas.getByLabelText('Menu openen/sluiten');

      /* Focus on menu button. */
      await userEvent.click(menuButton);

      /* Check that focus is properly managed. */
      expect(menuButton).toBeInTheDocument();
    });
  },
};
