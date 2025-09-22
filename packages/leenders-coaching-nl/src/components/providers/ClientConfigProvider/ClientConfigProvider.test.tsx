import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ClientConfigProvider, useConfig } from './ClientConfigProvider';
import type { ConfigType } from '../ConfigProvider/ConfigProvider';
import { mockConfig } from '@/mocks';

/* Test component that uses the useConfig hook */
const TestComponent = () => {
  const config = useConfig();
  return (
    <div data-testid="test-component">
      <div data-testid="toast-close">
        {config.accessibility.closeButtons.toast}
      </div>
      <div data-testid="modal-close">
        {config.accessibility.closeButtons.modal}
      </div>
      <div data-testid="theme-label">{config.interface.themeToggle.label}</div>
      <div data-testid="blog-path">{config.blog.paths.blog}</div>
      <div data-testid="form-required">{config.forms.messages.required}</div>
    </div>
  );
};

describe('ClientConfigProvider', () => {
  describe('Provider functionality', () => {
    it('should provide config data to children components', () => {
      render(
        <ClientConfigProvider config={mockConfig}>
          <TestComponent />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByTestId('toast-close')).toHaveTextContent(
        'Sluit melding'
      );
      expect(screen.getByTestId('modal-close')).toHaveTextContent('Sluiten');
      expect(screen.getByTestId('theme-label')).toHaveTextContent(
        'Thema aanpassen'
      );
      expect(screen.getByTestId('blog-path')).toHaveTextContent('/blog');
      expect(screen.getByTestId('form-required')).toHaveTextContent(
        'Dit veld is verplicht'
      );
    });

    it('should render children without config when config is null', () => {
      const TestComponentWithoutConfig = () => {
        try {
          useConfig();
          return <div data-testid="should-not-render">Should not render</div>;
        } catch {
          return <div data-testid="error-caught">Error caught</div>;
        }
      };

      render(
        <ClientConfigProvider config={null as any}>
          <TestComponentWithoutConfig />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('error-caught')).toBeInTheDocument();
      expect(screen.queryByTestId('should-not-render')).not.toBeInTheDocument();
    });

    it('should handle multiple nested children', () => {
      const NestedComponent = () => (
        <div data-testid="nested-component">
          <TestComponent />
        </div>
      );

      render(
        <ClientConfigProvider config={mockConfig}>
          <div data-testid="outer-wrapper">
            <NestedComponent />
          </div>
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('outer-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('nested-component')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      const { container } = render(
        <ClientConfigProvider config={mockConfig}>{null}</ClientConfigProvider>
      );

      expect(container.firstChild).not.toBeNull();
      expect(screen.getByTestId('client-config-provider')).toBeInTheDocument();
    });

    it('should handle fragment children', () => {
      render(
        <ClientConfigProvider config={mockConfig}>
          <>
            <div data-testid="fragment-child-1">Child 1</div>
            <div data-testid="fragment-child-2">Child 2</div>
          </>
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('fragment-child-1')).toBeInTheDocument();
      expect(screen.getByTestId('fragment-child-2')).toBeInTheDocument();
    });
  });

  describe('useConfig hook', () => {
    it('should return config data when used within provider', () => {
      render(
        <ClientConfigProvider config={mockConfig}>
          <TestComponent />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('toast-close')).toHaveTextContent(
        'Sluit melding'
      );
      expect(screen.getByTestId('modal-close')).toHaveTextContent('Sluiten');
    });

    it('should throw error when used outside provider', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useConfig must be used within a ConfigProvider');

      consoleSpy.mockRestore();
    });

    it('should provide access to all config properties', () => {
      const ComprehensiveTestComponent = () => {
        const config = useConfig();
        return (
          <div data-testid="comprehensive-test">
            {/* Accessibility */}
            <div data-testid="accessibility-toast">
              {config.accessibility.closeButtons.toast}
            </div>
            <div data-testid="accessibility-modal">
              {config.accessibility.closeButtons.modal}
            </div>
            <div data-testid="accessibility-prev">
              {config.accessibility.calendar.previousMonth}
            </div>
            <div data-testid="accessibility-next">
              {config.accessibility.calendar.nextMonth}
            </div>

            {/* Interface */}
            <div data-testid="interface-toggle">
              {config.interface.mobileMenu.toggleButton}
            </div>
            <div data-testid="interface-menu">
              {config.interface.mobileMenu.menuLabel}
            </div>
            <div data-testid="interface-close">
              {config.interface.mobileMenu.closeButton}
            </div>
            <div data-testid="interface-theme">
              {config.interface.themeToggle.label}
            </div>
            <div data-testid="interface-load">
              {config.interface.buttons.loadMore}
            </div>
            <div data-testid="interface-read">
              {config.interface.buttons.readMore}
            </div>
            <div data-testid="interface-submit">
              {config.interface.buttons.submit}
            </div>
            <div data-testid="interface-close-btn">
              {config.interface.buttons.close}
            </div>

            {/* Blog */}
            <div data-testid="blog-featured">{config.blog.labels.featured}</div>
            <div data-testid="blog-read">{config.blog.labels.readArticle}</div>
            <div data-testid="blog-path">{config.blog.paths.blog}</div>

            {/* Forms */}
            <div data-testid="form-required">
              {config.forms.messages.required}
            </div>
            <div data-testid="form-invalid">
              {config.forms.messages.invalid}
            </div>
            <div data-testid="form-success">
              {config.forms.messages.success}
            </div>
            <div data-testid="form-error">{config.forms.messages.error}</div>
          </div>
        );
      };

      render(
        <ClientConfigProvider config={mockConfig}>
          <ComprehensiveTestComponent />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('accessibility-toast')).toHaveTextContent(
        'Sluit melding'
      );
      expect(screen.getByTestId('accessibility-modal')).toHaveTextContent(
        'Sluiten'
      );
      expect(screen.getByTestId('accessibility-prev')).toHaveTextContent(
        'Vorige maand'
      );
      expect(screen.getByTestId('accessibility-next')).toHaveTextContent(
        'Volgende maand'
      );
      expect(screen.getByTestId('interface-toggle')).toHaveTextContent(
        'Menu openen/sluiten'
      );
      expect(screen.getByTestId('interface-menu')).toHaveTextContent(
        'Hoofdmenu'
      );
      expect(screen.getByTestId('interface-close')).toHaveTextContent(
        'Menu sluiten'
      );
      expect(screen.getByTestId('interface-theme')).toHaveTextContent(
        'Thema aanpassen'
      );
      expect(screen.getByTestId('interface-load')).toHaveTextContent(
        'Meer laden'
      );
      expect(screen.getByTestId('interface-read')).toHaveTextContent(
        'Lees meer'
      );
      expect(screen.getByTestId('interface-submit')).toHaveTextContent(
        'Versturen'
      );
      expect(screen.getByTestId('interface-close-btn')).toHaveTextContent(
        'Sluiten'
      );
      expect(screen.getByTestId('blog-featured')).toHaveTextContent(
        'Uitgelicht'
      );
      expect(screen.getByTestId('blog-read')).toHaveTextContent('Lees artikel');
      expect(screen.getByTestId('blog-path')).toHaveTextContent('/blog');
      expect(screen.getByTestId('form-required')).toHaveTextContent(
        'Dit veld is verplicht'
      );
      expect(screen.getByTestId('form-invalid')).toHaveTextContent(
        'Ongeldig formaat'
      );
      expect(screen.getByTestId('form-success')).toHaveTextContent(
        'Formulier succesvol verzonden'
      );
      expect(screen.getByTestId('form-error')).toHaveTextContent(
        'Er is een fout opgetreden'
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle config with partial data', () => {
      const partialConfig: Partial<ConfigType> = {
        accessibility: {
          closeButtons: {
            toast: 'Custom Toast',
            modal: 'Custom Modal',
          },
          calendar: {
            previousMonth: 'Custom Prev',
            nextMonth: 'Custom Next',
          },
        },
      };

      const PartialTestComponent = () => {
        const config = useConfig();
        return (
          <div data-testid="partial-test">
            <div data-testid="partial-toast">
              {config.accessibility.closeButtons.toast}
            </div>
            <div data-testid="partial-modal">
              {config.accessibility.closeButtons.modal}
            </div>
          </div>
        );
      };

      render(
        <ClientConfigProvider config={partialConfig as ConfigType}>
          <PartialTestComponent />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('partial-toast')).toHaveTextContent(
        'Custom Toast'
      );
      expect(screen.getByTestId('partial-modal')).toHaveTextContent(
        'Custom Modal'
      );
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
        <ClientConfigProvider config={emptyConfig}>
          <TestComponent />
        </ClientConfigProvider>
      );

      expect(screen.getByTestId('toast-close')).toHaveTextContent('');
      expect(screen.getByTestId('modal-close')).toHaveTextContent('');
      expect(screen.getByTestId('theme-label')).toHaveTextContent('');
      expect(screen.getByTestId('blog-path')).toHaveTextContent('');
      expect(screen.getByTestId('form-required')).toHaveTextContent('');
    });
  });
});
