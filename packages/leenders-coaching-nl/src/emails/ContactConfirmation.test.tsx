import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ContactConfirmation } from './ContactConfirmation';

// Mock @react-email/components
vi.mock('@react-email/components', () => ({
  Html: ({ children }: { children: React.ReactNode }) =>
    React.createElement('html', {}, children),
  Body: ({ children }: { children: React.ReactNode }) =>
    React.createElement('body', {}, children),
  Container: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'container' }, children),
  Text: ({ children }: { children: React.ReactNode }) =>
    React.createElement('p', {}, children),
  Preview: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'preview' }, children),
  Section: ({ children }: { children: React.ReactNode }) =>
    React.createElement('section', {}, children),
  Hr: () => React.createElement('hr', {}),
  Head: ({ children }: { children: React.ReactNode }) =>
    React.createElement('head', {}, children),
  Row: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'row' }, children),
  Column: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'column' }, children),
  Heading: ({ children }: { children: React.ReactNode }) =>
    React.createElement('h1', {}, children),
  Button: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href, 'data-testid': 'button' }, children),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
  Img: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, 'data-testid': 'img' }),
}));

describe('ContactConfirmation', () => {
  it('should render with required props', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('Test Subject');
    expect(container.textContent).toContain('Bedankt voor je bericht');
  });

  it('should render with special characters in name', () => {
    const props = {
      name: "José María O'Connor-Smith",
      subject: 'Test Subject',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    expect(container.textContent).toContain("José María O'Connor-Smith");
  });

  it('should render with special characters in subject', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject with Special Chars: !@#$%^&*()',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    expect(container.textContent).toContain(
      'Test Subject with Special Chars: !@#$%^&*()'
    );
  });

  it('should render correct email structure', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    // Check that the email has the correct structure using our mocks
    expect(
      container.querySelector('[data-testid="container"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="preview"]')
    ).toBeInTheDocument();
  });

  it('should include all required sections', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    // Check for key sections
    expect(container.textContent).toContain('Bedankt voor je bericht');
    expect(container.textContent).toContain('Beste John Doe');
    expect(container.textContent).toContain('Test Subject');
    expect(container.textContent).toContain('Bezoek mijn website');
    expect(container.textContent).toContain('Privacy Beleid');
    expect(container.textContent).toContain('Algemene Voorwaarden');
  });

  it('should include logo image', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { getByTestId } = render(<ContactConfirmation {...props} />);

    const logo = getByTestId('img');
    expect(logo).toHaveAttribute('src', '/images/logo-color.png');
    expect(logo).toHaveAttribute('alt', 'Leenders Coaching');
  });

  it('should include website button', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { getByTestId } = render(<ContactConfirmation {...props} />);

    const button = getByTestId('button');
    expect(button).toHaveAttribute(
      'href',
      'https://leenders-coaching.nl/contact'
    );
    expect(button.textContent).toContain('Bezoek mijn website');
  });

  it('should include current year in footer', () => {
    const props = {
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const { container } = render(<ContactConfirmation {...props} />);
    const currentYear = new Date().getFullYear().toString();

    expect(container.textContent).toContain(currentYear);
  });

  it('should handle empty subject', () => {
    const props = {
      name: 'John Doe',
      subject: '',
    };

    const { container } = render(<ContactConfirmation {...props} />);

    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('Bedankt voor je bericht');
  });

  it('should handle very long subject', () => {
    const longSubject = 'A'.repeat(200);
    const props = {
      name: 'John Doe',
      subject: longSubject,
    };

    const { container } = render(<ContactConfirmation {...props} />);

    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('Bedankt voor je bericht');
  });
});
