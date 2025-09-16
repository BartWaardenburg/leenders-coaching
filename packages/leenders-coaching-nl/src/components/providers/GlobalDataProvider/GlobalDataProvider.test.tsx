import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { GlobalDataProvider } from './GlobalDataProvider';
import { getGlobalData } from '@/utilities/groq-queries';
import {
  transformNullable,
  transformNullableArray,
} from '@/utilities/transform';
// import { mockGlobalData } from '@/mocks';

/* Mock dependencies */
vi.mock('@/utilities/groq-queries');
vi.mock('@/utilities/transform');
vi.mock('@/components/ui/Header', () => ({
  Header: ({ navigation, about, social, contact }: any) => (
    <div data-testid="header">
      <div data-testid="navigation">{JSON.stringify(navigation)}</div>
      <div data-testid="about">{JSON.stringify(about)}</div>
      <div data-testid="social">{JSON.stringify(social)}</div>
      <div data-testid="contact">{JSON.stringify(contact)}</div>
    </div>
  ),
}));
vi.mock('@/components/ui/Footer', () => ({
  Footer: ({ copyright, contact, socialLinks }: any) => (
    <div data-testid="footer">
      <div data-testid="footer-copyright">{copyright}</div>
      <div data-testid="footer-contact">{JSON.stringify(contact)}</div>
      <div data-testid="footer-social-links">{JSON.stringify(socialLinks)}</div>
    </div>
  ),
}));
vi.mock('@/components/ui/Main', () => ({
  Main: ({ children }: { children: ReactNode }) => (
    <main data-testid="main">{children}</main>
  ),
}));
vi.mock('../ConfigProvider/ConfigProvider', () => ({
  ConfigProvider: ({ children, config }: any) => (
    <div data-testid="config-provider" data-config={JSON.stringify(config)}>
      {children}
    </div>
  ),
  defaultConfig: {
    accessibility: {
      closeButtons: { toast: 'Sluit melding', modal: 'Sluiten' },
      calendar: { previousMonth: 'Vorige maand', nextMonth: 'Volgende maand' },
    },
    interface: {
      mobileMenu: {
        toggleButton: 'Menu openen/sluiten',
        menuLabel: 'Hoofdmenu',
        closeButton: 'Menu sluiten',
      },
      themeToggle: { label: 'Thema aanpassen' },
      buttons: {
        loadMore: 'Meer laden',
        readMore: 'Lees meer',
        submit: 'Versturen',
        close: 'Sluiten',
      },
    },
    blog: {
      labels: { featured: 'Uitgelicht', readArticle: 'Lees artikel' },
      paths: { blog: '/blog' },
    },
    forms: {
      messages: {
        required: 'Dit veld is verplicht',
        invalid: 'Ongeldig formaat',
        success: 'Formulier succesvol verzonden',
        error: 'Er is een fout opgetreden',
      },
    },
  },
}));

const mockGetGlobalData = getGlobalData as MockedFunction<typeof getGlobalData>;
const mockTransformNullable = transformNullable as MockedFunction<
  typeof transformNullable
>;
const mockTransformNullableArray = transformNullableArray as MockedFunction<
  typeof transformNullableArray
>;

describe('GlobalDataProvider', () => {
  const mockChildren = <div data-testid="children">Test Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();

    /* Setup default mock implementations */
    mockTransformNullable.mockImplementation((value, defaultValue) =>
      value !== null && value !== undefined ? value : defaultValue
    );
    mockTransformNullableArray.mockImplementation((array, transform) =>
      array ? array.map(transform) : []
    );
  });

  describe('Successful data fetching', () => {
    it('should render with complete global data', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [
            { _key: 'nav-1', label: 'Home', href: '/' },
            { _key: 'nav-2', label: 'About', href: '/about' },
          ],
          about: {
            title: 'Custom About Title',
            description: 'Custom about description',
          },
          social: {
            title: 'Follow Us',
            links: [
              {
                _key: 'social-1',
                platform: 'twitter' as const,
                url: 'https://twitter.com',
              },
            ],
          },
          contact: {
            title: 'Get in Touch',
            projectEnquiry: {
              label: 'Project Request',
              href: '/contact',
              linkText: 'Contact Us',
            },
            generalEnquiry: {
              label: 'General Questions',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: '© 2024 Custom Copyright',
          contact: {
            email: 'custom@example.com',
            phone: '+1234567890',
          },
          socialLinks: [
            {
              _key: 'footer-social-1',
              platform: 'linkedin' as const,
              url: 'https://linkedin.com',
            },
          ],
        },
        siteSettings: {
          accessibility: {
            closeButtons: {
              toast: 'Custom Toast Close',
              modal: 'Custom Modal Close',
            },
            calendar: {
              previousMonth: 'Custom Prev',
              nextMonth: 'Custom Next',
            },
          },
          interface: {
            mobileMenu: {
              toggleButton: 'Custom Toggle',
              menuLabel: 'Custom Menu',
              closeButton: 'Custom Close',
            },
            themeToggle: { label: 'Custom Theme' },
            buttons: {
              loadMore: 'Custom Load More',
              readMore: 'Custom Read More',
              submit: 'Custom Submit',
              close: 'Custom Close',
            },
          },
          blog: {
            labels: { featured: 'Custom Featured', readArticle: 'Custom Read' },
            paths: { blog: '/custom-blog' },
          },
          forms: {
            messages: {
              required: 'Custom Required',
              invalid: 'Custom Invalid',
              success: 'Custom Success',
              error: 'Custom Error',
            },
          },
        },
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify children are rendered */
      expect(screen.getByTestId('children')).toBeInTheDocument();
      expect(screen.getByTestId('main')).toBeInTheDocument();

      /* Verify Header receives correct data */
      expect(screen.getByTestId('header')).toBeInTheDocument();

      /* Verify Footer receives correct data */
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('footer-copyright')).toHaveTextContent(
        '© 2024 Custom Copyright'
      );

      /* Verify ConfigProvider receives correct config */
      const configProvider = screen.getByTestId('config-provider');
      expect(configProvider).toBeInTheDocument();
    });

    it('should use default values when data is missing', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: null,
          about: null,
          social: null,
          contact: null,
        },
        footer: {
          copyright: undefined,
          contact: { email: undefined, phone: null },
          socialLinks: null,
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify default values are used */
      expect(screen.getByTestId('footer-copyright')).toHaveTextContent(
        '© 2024 Leenders Coaching. Alle rechten voorbehouden.'
      );

      /* Verify transform functions were called with fallbacks */
      expect(mockTransformNullable).toHaveBeenCalledWith(undefined, 'Over ons');
      expect(mockTransformNullable).toHaveBeenCalledWith(
        undefined,
        'Welkom bij Leenders Coaching'
      );
    });

    it('should handle partial data correctly', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [{ _key: 'nav-1', label: 'Home', href: '/' }],
          about: { title: 'Custom Title', description: undefined },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Custom Copyright',
          contact: { email: 'test@example.com', phone: null },
          socialLinks: [],
        },
        siteSettings: {
          accessibility: {
            closeButtons: { toast: 'Close', modal: 'Close' },
            calendar: { previousMonth: 'Prev', nextMonth: 'Next' },
          },
          interface: {
            mobileMenu: {
              toggleButton: 'Toggle',
              menuLabel: 'Menu',
              closeButton: 'Close',
            },
            themeToggle: { label: 'Theme' },
            buttons: {
              loadMore: 'Load',
              readMore: 'Read',
              submit: 'Submit',
              close: 'Close',
            },
          },
          blog: {
            labels: { featured: 'Featured', readArticle: 'Read' },
            paths: { blog: '/blog' },
          },
          forms: {
            messages: {
              required: 'Required',
              invalid: 'Invalid',
              success: 'Success',
              error: 'Error',
            },
          },
        },
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      expect(screen.getByTestId('children')).toBeInTheDocument();
      expect(screen.getByTestId('footer-copyright')).toHaveTextContent(
        'Custom Copyright'
      );
    });
  });

  describe('Error handling', () => {
    it('should throw error when navigation is missing', async () => {
      const mockGlobalData = {
        navigation: null,
        footer: {
          copyright: 'Test',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      await expect(
        GlobalDataProvider({ children: mockChildren })
      ).rejects.toThrow('Failed to fetch required data from Sanity');
    });

    it('should throw error when footer is missing', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: null,
          social: null,
          contact: null,
        },
        footer: null,
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      await expect(
        GlobalDataProvider({ children: mockChildren })
      ).rejects.toThrow('Failed to fetch required data from Sanity');
    });

    it('should throw error when globalData is null', async () => {
      mockGetGlobalData.mockResolvedValue(null as any);

      await expect(
        GlobalDataProvider({ children: mockChildren })
      ).rejects.toThrow('Failed to fetch required data from Sanity');
    });

    it('should throw error when globalData is undefined', async () => {
      mockGetGlobalData.mockResolvedValue(undefined as any);

      await expect(
        GlobalDataProvider({ children: mockChildren })
      ).rejects.toThrow('Failed to fetch required data from Sanity');
    });

    it('should handle getGlobalData throwing an error', async () => {
      const error = new Error('Sanity connection failed');
      mockGetGlobalData.mockRejectedValue(error);

      await expect(
        GlobalDataProvider({ children: mockChildren })
      ).rejects.toThrow('Sanity connection failed');
    });
  });

  describe('Data transformation', () => {
    it('should call transform functions with correct parameters', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [{ _key: 'nav-1', label: 'Home', href: '/' }],
          about: { title: 'About', description: 'Description' },
          social: {
            title: 'Social',
            links: [
              {
                _key: 'social-1',
                platform: 'twitter' as const,
                url: 'https://twitter.com',
              },
            ],
          },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: '+1234567890' },
          socialLinks: [
            {
              _key: 'footer-social-1',
              platform: 'linkedin' as const,
              url: 'https://linkedin.com',
            },
          ],
        },
        siteSettings: {
          accessibility: {
            closeButtons: { toast: 'Close', modal: 'Close' },
            calendar: { previousMonth: 'Prev', nextMonth: 'Next' },
          },
          interface: {
            mobileMenu: {
              toggleButton: 'Toggle',
              menuLabel: 'Menu',
              closeButton: 'Close',
            },
            themeToggle: { label: 'Theme' },
            buttons: {
              loadMore: 'Load',
              readMore: 'Read',
              submit: 'Submit',
              close: 'Close',
            },
          },
          blog: {
            labels: { featured: 'Featured', readArticle: 'Read' },
            paths: { blog: '/blog' },
          },
          forms: {
            messages: {
              required: 'Required',
              invalid: 'Invalid',
              success: 'Success',
              error: 'Error',
            },
          },
        },
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      await GlobalDataProvider({ children: mockChildren });

      /* Verify transformNullableArray was called for navigation */
      expect(mockTransformNullableArray).toHaveBeenCalledWith(
        mockGlobalData.navigation.navigation,
        expect.any(Function)
      );

      /* Verify transformNullableArray was called for social links */
      expect(mockTransformNullableArray).toHaveBeenCalledWith(
        mockGlobalData.navigation.social.links,
        expect.any(Function)
      );

      /* Verify transformNullableArray was called for footer social links */
      expect(mockTransformNullableArray).toHaveBeenCalledWith(
        mockGlobalData.footer.socialLinks,
        expect.any(Function)
      );

      /* Verify transformNullable was called for various fields */
      expect(mockTransformNullable).toHaveBeenCalledWith('About', 'Over ons');
      expect(mockTransformNullable).toHaveBeenCalledWith(
        'Description',
        'Welkom bij Leenders Coaching'
      );
      expect(mockTransformNullable).toHaveBeenCalledWith(
        'Copyright',
        '© 2024 Leenders Coaching. Alle rechten voorbehouden.'
      );
    });

    it('should handle empty arrays correctly', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: { title: 'About', description: 'Description' },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      expect(screen.getByTestId('children')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render all required components in correct order', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: { title: 'About', description: 'Description' },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify component hierarchy */
      const configProvider = screen.getByTestId('config-provider');
      const header = screen.getByTestId('header');
      const main = screen.getByTestId('main');
      const footer = screen.getByTestId('footer');

      expect(configProvider).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      /* Verify children are inside Main */
      expect(main).toContainElement(screen.getByTestId('children'));
    });

    it('should pass correct props to Header component', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [{ _key: 'nav-1', label: 'Home', href: '/' }],
          about: { title: 'Custom About', description: 'Custom Description' },
          social: { title: 'Custom Social', links: [] },
          contact: {
            title: 'Custom Contact',
            projectEnquiry: {
              label: 'Custom Project',
              href: '/custom-contact',
              linkText: 'Custom Contact',
            },
            generalEnquiry: {
              label: 'Custom General',
              href: '/custom-contact',
              linkText: 'Custom Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify Header receives transformed data */
      const navigationData = JSON.parse(
        screen.getByTestId('navigation').textContent || '[]'
      );
      const aboutData = JSON.parse(
        screen.getByTestId('about').textContent || '{}'
      );
      const socialData = JSON.parse(
        screen.getByTestId('social').textContent || '{}'
      );
      const contactData = JSON.parse(
        screen.getByTestId('contact').textContent || '{}'
      );

      expect(navigationData).toHaveLength(1);
      expect(navigationData[0]).toEqual({
        _key: 'nav-1',
        label: 'Home',
        href: '/',
      });
      expect(aboutData.title).toBe('Custom About');
      expect(socialData.title).toBe('Custom Social');
      expect(contactData.title).toBe('Custom Contact');
    });

    it('should pass correct props to Footer component', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: { title: 'About', description: 'Description' },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Custom Copyright Text',
          contact: { email: 'custom@example.com', phone: '+1234567890' },
          socialLinks: [
            {
              _key: 'footer-social-1',
              platform: 'linkedin' as const,
              url: 'https://linkedin.com',
            },
          ],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify Footer receives correct data */
      expect(screen.getByTestId('footer-copyright')).toHaveTextContent(
        'Custom Copyright Text'
      );

      const contactData = JSON.parse(
        screen.getByTestId('footer-contact').textContent || '{}'
      );
      expect(contactData.email).toBe('custom@example.com');
      expect(contactData.phone).toBe('+1234567890');

      const socialLinksData = JSON.parse(
        screen.getByTestId('footer-social-links').textContent || '[]'
      );
      expect(socialLinksData).toHaveLength(1);
      expect(socialLinksData[0]).toEqual({
        _key: 'footer-social-1',
        platform: 'linkedin',
        url: 'https://linkedin.com',
      });
    });
  });

  describe('Configuration data transformation', () => {
    it('should transform site settings to config correctly', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: { title: 'About', description: 'Description' },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: {
          accessibility: {
            closeButtons: {
              toast: 'Custom Toast Close',
              modal: 'Custom Modal Close',
            },
            calendar: {
              previousMonth: 'Custom Previous',
              nextMonth: 'Custom Next',
            },
          },
          interface: {
            mobileMenu: {
              toggleButton: 'Custom Toggle Button',
              menuLabel: 'Custom Menu Label',
              closeButton: 'Custom Close Button',
            },
            themeToggle: { label: 'Custom Theme Label' },
            buttons: {
              loadMore: 'Custom Load More',
              readMore: 'Custom Read More',
              submit: 'Custom Submit',
              close: 'Custom Close',
            },
          },
          blog: {
            labels: {
              featured: 'Custom Featured',
              readArticle: 'Custom Read Article',
            },
            paths: { blog: '/custom-blog' },
          },
          forms: {
            messages: {
              required: 'Custom Required',
              invalid: 'Custom Invalid',
              success: 'Custom Success',
              error: 'Custom Error',
            },
          },
        },
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify ConfigProvider receives transformed config */
      const configProvider = screen.getByTestId('config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      expect(configData.accessibility.closeButtons.toast).toBe(
        'Custom Toast Close'
      );
      expect(configData.accessibility.closeButtons.modal).toBe(
        'Custom Modal Close'
      );
      expect(configData.accessibility.calendar.previousMonth).toBe(
        'Custom Previous'
      );
      expect(configData.accessibility.calendar.nextMonth).toBe('Custom Next');
      expect(configData.interface.mobileMenu.toggleButton).toBe(
        'Custom Toggle Button'
      );
      expect(configData.interface.themeToggle.label).toBe('Custom Theme Label');
      expect(configData.blog.labels.featured).toBe('Custom Featured');
      expect(configData.forms.messages.required).toBe('Custom Required');
    });

    it('should use default config when site settings are null', async () => {
      const mockGlobalData = {
        navigation: {
          navigation: [],
          about: { title: 'About', description: 'Description' },
          social: { title: 'Social', links: [] },
          contact: {
            title: 'Contact',
            projectEnquiry: {
              label: 'Project',
              href: '/contact',
              linkText: 'Contact',
            },
            generalEnquiry: {
              label: 'General',
              href: '/contact',
              linkText: 'Contact',
            },
          },
        },
        footer: {
          copyright: 'Copyright',
          contact: { email: 'test@test.com', phone: null },
          socialLinks: [],
        },
        siteSettings: null,
      };

      mockGetGlobalData.mockResolvedValue(mockGlobalData);

      const result = await GlobalDataProvider({ children: mockChildren });
      render(result);

      /* Verify default config is used */
      const configProvider = screen.getByTestId('config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      expect(configData.accessibility.closeButtons.toast).toBe('Sluit melding');
      expect(configData.accessibility.closeButtons.modal).toBe('Sluiten');
      expect(configData.interface.themeToggle.label).toBe('Thema aanpassen');
      expect(configData.blog.labels.featured).toBe('Uitgelicht');
      expect(configData.forms.messages.required).toBe('Dit veld is verplicht');
    });
  });
});
