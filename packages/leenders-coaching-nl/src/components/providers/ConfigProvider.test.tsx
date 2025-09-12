import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { ConfigProvider, defaultConfig } from './ConfigProvider';
import type { ConfigType } from './ConfigProvider';

/* Mock the ClientConfigProvider */
vi.mock('./ClientConfigProvider', () => ({
  ClientConfigProvider: ({
    children,
    config,
  }: {
    children: ReactNode;
    config: ConfigType;
  }) => (
    <div
      data-testid="client-config-provider"
      data-config={JSON.stringify(config)}
    >
      {children}
    </div>
  ),
  useConfig: () => defaultConfig,
}));

/* Test component to verify children are rendered */
const TestComponent = () => <div data-testid="test-children">Test Content</div>;

describe('ConfigProvider', () => {
  describe('Provider functionality', () => {
    it('should render children and pass config to ClientConfigProvider', () => {
      const customConfig: ConfigType = {
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
            toggleButton: 'Custom Toggle',
            menuLabel: 'Custom Menu',
            closeButton: 'Custom Close',
          },
          themeToggle: {
            label: 'Custom Theme',
          },
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
          paths: {
            blog: '/custom-blog',
          },
        },
        forms: {
          messages: {
            required: 'Custom Required',
            invalid: 'Custom Invalid',
            success: 'Custom Success',
            error: 'Custom Error',
          },
        },
      };

      render(
        <ConfigProvider config={customConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      expect(screen.getByTestId('client-config-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();

      /* Verify config is passed correctly */
      const configProvider = screen.getByTestId('client-config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      expect(configData.accessibility.closeButtons.toast).toBe(
        'Custom Toast Close'
      );
      expect(configData.accessibility.closeButtons.modal).toBe(
        'Custom Modal Close'
      );
      expect(configData.interface.themeToggle.label).toBe('Custom Theme');
      expect(configData.blog.labels.featured).toBe('Custom Featured');
      expect(configData.forms.messages.required).toBe('Custom Required');
    });

    it('should use default config when provided', () => {
      render(
        <ConfigProvider config={defaultConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      expect(screen.getByTestId('client-config-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();

      /* Verify default config is passed */
      const configProvider = screen.getByTestId('client-config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      expect(configData.accessibility.closeButtons.toast).toBe('Sluit melding');
      expect(configData.accessibility.closeButtons.modal).toBe('Sluiten');
      expect(configData.interface.themeToggle.label).toBe('Thema aanpassen');
      expect(configData.blog.labels.featured).toBe('Uitgelicht');
      expect(configData.forms.messages.required).toBe('Dit veld is verplicht');
    });

    it('should handle multiple children', () => {
      const MultipleChildren = () => (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </>
      );

      render(
        <ConfigProvider config={defaultConfig}>
          <MultipleChildren />
        </ConfigProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('should handle nested components', () => {
      const NestedComponent = () => (
        <div data-testid="nested-wrapper">
          <TestComponent />
        </div>
      );

      render(
        <ConfigProvider config={defaultConfig}>
          <NestedComponent />
        </ConfigProvider>
      );

      expect(screen.getByTestId('nested-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = render(
        <ConfigProvider config={defaultConfig}>{null}</ConfigProvider>
      );

      expect(screen.getByTestId('client-config-provider')).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="test-children"]')
      ).not.toBeInTheDocument();
    });

    it('should handle empty children', () => {
      const { container } = render(
        <ConfigProvider config={defaultConfig}>{undefined}</ConfigProvider>
      );

      expect(screen.getByTestId('client-config-provider')).toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="test-children"]')
      ).not.toBeInTheDocument();
    });
  });

  describe('Config structure validation', () => {
    it('should handle config with all required properties', () => {
      const completeConfig: ConfigType = {
        accessibility: {
          closeButtons: {
            toast: 'Toast Close',
            modal: 'Modal Close',
          },
          calendar: {
            previousMonth: 'Previous Month',
            nextMonth: 'Next Month',
          },
        },
        interface: {
          mobileMenu: {
            toggleButton: 'Toggle Button',
            menuLabel: 'Menu Label',
            closeButton: 'Close Button',
          },
          themeToggle: {
            label: 'Theme Toggle',
          },
          buttons: {
            loadMore: 'Load More',
            readMore: 'Read More',
            submit: 'Submit',
            close: 'Close',
          },
        },
        blog: {
          labels: {
            featured: 'Featured',
            readArticle: 'Read Article',
          },
          paths: {
            blog: '/blog',
          },
        },
        forms: {
          messages: {
            required: 'Required',
            invalid: 'Invalid',
            success: 'Success',
            error: 'Error',
          },
        },
      };

      render(
        <ConfigProvider config={completeConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      const configProvider = screen.getByTestId('client-config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      /* Verify all sections are present */
      expect(configData).toHaveProperty('accessibility');
      expect(configData).toHaveProperty('interface');
      expect(configData).toHaveProperty('blog');
      expect(configData).toHaveProperty('forms');

      /* Verify accessibility structure */
      expect(configData.accessibility).toHaveProperty('closeButtons');
      expect(configData.accessibility).toHaveProperty('calendar');
      expect(configData.accessibility.closeButtons).toHaveProperty('toast');
      expect(configData.accessibility.closeButtons).toHaveProperty('modal');
      expect(configData.accessibility.calendar).toHaveProperty('previousMonth');
      expect(configData.accessibility.calendar).toHaveProperty('nextMonth');

      /* Verify interface structure */
      expect(configData.interface).toHaveProperty('mobileMenu');
      expect(configData.interface).toHaveProperty('themeToggle');
      expect(configData.interface).toHaveProperty('buttons');
      expect(configData.interface.mobileMenu).toHaveProperty('toggleButton');
      expect(configData.interface.mobileMenu).toHaveProperty('menuLabel');
      expect(configData.interface.mobileMenu).toHaveProperty('closeButton');
      expect(configData.interface.themeToggle).toHaveProperty('label');
      expect(configData.interface.buttons).toHaveProperty('loadMore');
      expect(configData.interface.buttons).toHaveProperty('readMore');
      expect(configData.interface.buttons).toHaveProperty('submit');
      expect(configData.interface.buttons).toHaveProperty('close');

      /* Verify blog structure */
      expect(configData.blog).toHaveProperty('labels');
      expect(configData.blog).toHaveProperty('paths');
      expect(configData.blog.labels).toHaveProperty('featured');
      expect(configData.blog.labels).toHaveProperty('readArticle');
      expect(configData.blog.paths).toHaveProperty('blog');

      /* Verify forms structure */
      expect(configData.forms).toHaveProperty('messages');
      expect(configData.forms.messages).toHaveProperty('required');
      expect(configData.forms.messages).toHaveProperty('invalid');
      expect(configData.forms.messages).toHaveProperty('success');
      expect(configData.forms.messages).toHaveProperty('error');
    });

    it('should handle config with empty strings', () => {
      const emptyConfig: ConfigType = {
        accessibility: {
          closeButtons: {
            toast: '',
            modal: '',
          },
          calendar: {
            previousMonth: '',
            nextMonth: '',
          },
        },
        interface: {
          mobileMenu: {
            toggleButton: '',
            menuLabel: '',
            closeButton: '',
          },
          themeToggle: {
            label: '',
          },
          buttons: {
            loadMore: '',
            readMore: '',
            submit: '',
            close: '',
          },
        },
        blog: {
          labels: {
            featured: '',
            readArticle: '',
          },
          paths: {
            blog: '',
          },
        },
        forms: {
          messages: {
            required: '',
            invalid: '',
            success: '',
            error: '',
          },
        },
      };

      render(
        <ConfigProvider config={emptyConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      const configProvider = screen.getByTestId('client-config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      expect(configData.accessibility.closeButtons.toast).toBe('');
      expect(configData.interface.themeToggle.label).toBe('');
      expect(configData.blog.labels.featured).toBe('');
      expect(configData.forms.messages.required).toBe('');
    });
  });

  describe('Default config', () => {
    it('should export defaultConfig with correct structure', () => {
      expect(defaultConfig).toHaveProperty('accessibility');
      expect(defaultConfig).toHaveProperty('interface');
      expect(defaultConfig).toHaveProperty('blog');
      expect(defaultConfig).toHaveProperty('forms');

      /* Verify default values */
      expect(defaultConfig.accessibility.closeButtons.toast).toBe(
        'Sluit melding'
      );
      expect(defaultConfig.accessibility.closeButtons.modal).toBe('Sluiten');
      expect(defaultConfig.accessibility.calendar.previousMonth).toBe(
        'Vorige maand'
      );
      expect(defaultConfig.accessibility.calendar.nextMonth).toBe(
        'Volgende maand'
      );

      expect(defaultConfig.interface.mobileMenu.toggleButton).toBe(
        'Menu openen/sluiten'
      );
      expect(defaultConfig.interface.mobileMenu.menuLabel).toBe('Hoofdmenu');
      expect(defaultConfig.interface.mobileMenu.closeButton).toBe(
        'Menu sluiten'
      );
      expect(defaultConfig.interface.themeToggle.label).toBe('Thema aanpassen');
      expect(defaultConfig.interface.buttons.loadMore).toBe('Meer laden');
      expect(defaultConfig.interface.buttons.readMore).toBe('Lees meer');
      expect(defaultConfig.interface.buttons.submit).toBe('Versturen');
      expect(defaultConfig.interface.buttons.close).toBe('Sluiten');

      expect(defaultConfig.blog.labels.featured).toBe('Uitgelicht');
      expect(defaultConfig.blog.labels.readArticle).toBe('Lees artikel');
      expect(defaultConfig.blog.paths.blog).toBe('/blog');

      expect(defaultConfig.forms.messages.required).toBe(
        'Dit veld is verplicht'
      );
      expect(defaultConfig.forms.messages.invalid).toBe('Ongeldig formaat');
      expect(defaultConfig.forms.messages.success).toBe(
        'Formulier succesvol verzonden'
      );
      expect(defaultConfig.forms.messages.error).toBe(
        'Er is een fout opgetreden'
      );
    });

    it('should use default config values when passed to provider', () => {
      render(
        <ConfigProvider config={defaultConfig}>
          <TestComponent />
        </ConfigProvider>
      );

      const configProvider = screen.getByTestId('client-config-provider');
      const configData = JSON.parse(
        configProvider.getAttribute('data-config') || '{}'
      );

      /* Verify all default values are preserved */
      expect(configData.accessibility.closeButtons.toast).toBe(
        defaultConfig.accessibility.closeButtons.toast
      );
      expect(configData.accessibility.closeButtons.modal).toBe(
        defaultConfig.accessibility.closeButtons.modal
      );
      expect(configData.interface.themeToggle.label).toBe(
        defaultConfig.interface.themeToggle.label
      );
      expect(configData.blog.labels.featured).toBe(
        defaultConfig.blog.labels.featured
      );
      expect(configData.forms.messages.required).toBe(
        defaultConfig.forms.messages.required
      );
    });
  });
});
