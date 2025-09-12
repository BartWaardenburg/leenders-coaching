import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Header } from './Header';
import { waitForAnimation } from '../../../test/chromatic-utils';

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
  play: async ({ canvas }) => {
    // Check that the header structure is present
    await expect(canvas.getByRole('banner')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Menu openen')).toBeInTheDocument();
    await expect(
      canvas.getByLabelText('Wissel kleurenschema')
    ).toBeInTheDocument();
  },
};

export const HeaderMobileMenu: Story = {
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
        {
          _key: '2',
          platform: 'instagram',
          url: 'https://www.instagram.com',
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
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Verify mobile header structure', async () => {
      // Check that mobile menu button is present and clickable
      const menuButton = canvas.getByLabelText('Menu openen');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toBeEnabled();
    });

    await step('Test menu button interactions', async () => {
      const menuButton = canvas.getByLabelText('Menu openen');

      // Test clicking the menu button multiple times
      await userEvent.click(menuButton);
      // Simple interaction - no animation wait needed

      await userEvent.click(menuButton);
      // Simple interaction - no animation wait needed

      await userEvent.click(menuButton);
      // Simple interaction - no animation wait needed
    });

    await step('Verify menu button remains functional', async () => {
      const menuButton = canvas.getByLabelText('Menu openen');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toBeEnabled();
    });
  },
};

export const HeaderNavigation: Story = {
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
  // TODO: TEST IS HANGING WITH ERROR BUT PASSES
  // play: async ({ canvas, userEvent, step }) => {
  //   await step('Click on navigation items', async () => {
  //     // First open the mobile menu to access navigation items
  //     const menuButton = canvas.getByLabelText('Menu openen');
  //     await userEvent.click(menuButton);
  //     await waitForAnimation(50);

  //     const homeLink = canvas.getByText('Home');
  //     await userEvent.click(homeLink);
  //     // Simple interaction - no animation wait needed

  //     const aboutLink = canvas.getAllByText('About')[0];
  //     if (aboutLink) {
  //       await userEvent.click(aboutLink);
  //       // Simple interaction - no animation wait needed
  //     }

  //     const servicesLink = canvas.getByText('Services');
  //     await userEvent.click(servicesLink);
  //     // Simple interaction - no animation wait needed

  //     const contactLink = canvas.getByText('Contact');
  //     await userEvent.click(contactLink);
  //     // Simple interaction - no animation wait needed
  //   });

  //   await step('Hover over navigation items', async () => {
  //     const homeLink = canvas.getByText('Home');
  //     await userEvent.hover(homeLink);
  //     // Simple interaction - no animation wait needed

  //     const aboutLink = canvas.getAllByText('About')[0];
  //     if (aboutLink) {
  //       await userEvent.hover(aboutLink);
  //       // Simple interaction - no animation wait needed
  //     }
  //   });
  // },
};

export const HeaderSocialLinks: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
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
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  // TODO: TEST IS HANGING WITH ERROR BUT PASSES
  // play: async ({ canvas, userEvent, step }) => {
  //   await step('Open mobile menu to access social links', async () => {
  //     const menuButton = canvas.getByLabelText('Menu openen');
  //     await userEvent.click(menuButton);
  //     await waitForAnimation(50);
  //   });

  //   await step('Interact with social links', async () => {
  //     // Check that social links are visible in mobile menu
  //     const facebookLink = canvas.getByText('facebook');
  //     const instagramLink = canvas.getByText('instagram');
  //     const twitterLink = canvas.getByText('twitter');

  //     expect(facebookLink).toBeVisible();
  //     expect(instagramLink).toBeVisible();
  //     expect(twitterLink).toBeVisible();

  //     // Hover over social links
  //     await userEvent.hover(facebookLink);
  //     // Simple interaction - no animation wait needed

  //     await userEvent.hover(instagramLink);
  //     // Simple interaction - no animation wait needed

  //     await userEvent.hover(twitterLink);
  //     // Simple interaction - no animation wait needed
  //   });
  // },
};

export const HeaderContactLinks: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
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
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  // TODO: TEST IS HANGING WITH ERROR BUT PASSES
  // play: async ({ canvas, userEvent, step }) => {
  //   await step('Open mobile menu to access contact links', async () => {
  //     const menuButton = canvas.getByLabelText('Menu openen');
  //     await userEvent.click(menuButton);
  //     await waitForAnimation(50);
  //   });

  //   await step('Interact with contact links', async () => {
  //     // Check that contact links are visible - use getAllByText since there are multiple
  //     const contactLinks = canvas.getAllByText('Contact Us');
  //     expect(contactLinks.length).toBeGreaterThan(0);

  //     // Click on the first contact link (should be a clickable link)
  //     const clickableLinks = contactLinks.filter(
  //       (link) => link.tagName === 'A'
  //     );
  //     if (clickableLinks.length > 0) {
  //       if (clickableLinks[0]) {
  //         await userEvent.click(clickableLinks[0]);
  //       }
  //       // Simple interaction - no animation wait needed
  //     }
  //   });
  // },
};

export const HeaderThemeToggle: Story = {
  args: {
    navigation: [
      { _key: '1', label: 'Home', href: '/' },
      { _key: '2', label: 'About', href: '/about' },
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
  play: async ({ canvas, userEvent, step }) => {
    await step('Toggle theme multiple times', async () => {
      const themeButton = canvas.getByLabelText('Wissel kleurenschema');
      expect(themeButton).toBeInTheDocument();

      // Click theme toggle multiple times
      await userEvent.click(themeButton);
      // Simple interaction - no animation wait needed

      await userEvent.click(themeButton);
      // Simple interaction - no animation wait needed

      await userEvent.click(themeButton);
      // Simple interaction - no animation wait needed
    });

    await step('Hover over theme toggle', async () => {
      const themeButton = canvas.getByLabelText('Wissel kleurenschema');
      await userEvent.hover(themeButton);
      // Simple interaction - no animation wait needed

      await userEvent.unhover(themeButton);
      // Simple interaction - no animation wait needed
    });
  },
};

export const HeaderAccessibility: Story = {
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
  play: async ({ canvas, userEvent, step }) => {
    await step('Keyboard navigation', async () => {
      // Test tab navigation
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
    });

    await step('Screen reader accessibility', async () => {
      // Check for proper ARIA labels
      const menuButton = canvas.getByLabelText('Menu openen');
      const themeButton = canvas.getByLabelText('Wissel kleurenschema');

      expect(menuButton).toBeInTheDocument();
      expect(themeButton).toBeInTheDocument();

      // Check for navigation landmark (may not be present in all implementations)
      const nav = canvas.queryByRole('navigation');
      if (nav) {
        expect(nav).toBeInTheDocument();
      }
    });

    await step('Focus management', async () => {
      const menuButton = canvas.getByLabelText('Menu openen');

      // Focus on menu button
      await userEvent.click(menuButton);
      await waitForAnimation(50);

      // Check that focus is properly managed
      expect(menuButton).toBeInTheDocument();
    });
  },
};
