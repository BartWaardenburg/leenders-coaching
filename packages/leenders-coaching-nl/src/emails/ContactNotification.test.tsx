import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ContactNotification } from './ContactNotification';

// Mock @react-email/components
vi.mock('@react-email/components', () => ({
  Html: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'html' }, children),
  Body: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'body' }, children),
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
    React.createElement('div', { 'data-testid': 'head' }, children),
  Row: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'row' }, children),
  Column: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'column' }, children),
  Heading: ({ children }: { children: React.ReactNode }) =>
    React.createElement('h1', {}, children),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
  Img: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, 'data-testid': 'img' }),
}));

// Import mock data after mock definition
const mockEmailTemplates = {
  notification: {
    name: 'Jan van der Berg',
    email: 'jan.vandenberg@example.nl',
    subject: 'Vraag over coaching sessies',
    message:
      'Hallo, ik ben geïnteresseerd in jullie coaching diensten. Kunnen we een afspraak maken voor een kennismakingsgesprek?',
  },
};

describe('ContactNotification', () => {
  it('should render with required props', () => {
    const props = mockEmailTemplates.notification;

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain(props.name);
    expect(container.textContent).toContain(props.email);
    expect(container.textContent).toContain(props.subject);
    expect(container.textContent).toContain(props.message);
  });

  it('should render with special characters in name', () => {
    const props = {
      name: "José María O'Connor-Smith",
      email: 'jose@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain("José María O'Connor-Smith");
  });

  it('should render with special characters in subject', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject with Special Chars: !@#$%^&*()',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain(
      'Test Subject with Special Chars: !@#$%^&*()'
    );
  });

  it('should render with special characters in message', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message:
        'This is a test message with special chars: !@#$%^&*() and newlines:\nLine 2\nLine 3',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain(
      'This is a test message with special chars: !@#$%^&*() and newlines:'
    );
  });

  it('should render correct email structure', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

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
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    // Check for key sections
    expect(container.textContent).toContain('Nieuw contact bericht ontvangen');
    expect(container.textContent).toContain('Afzender');
    expect(container.textContent).toContain('Email');
    expect(container.textContent).toContain('Onderwerp');
    expect(container.textContent).toContain('Bericht');
    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('john@example.com');
    expect(container.textContent).toContain('Test Subject');
    expect(container.textContent).toContain('Test message');
  });

  it('should include logo image', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { getByTestId } = render(<ContactNotification {...props} />);

    const logo = getByTestId('img');
    expect(logo).toHaveAttribute(
      'src',
      'https://leenders-coaching.nl/images/logo-color.png'
    );
    expect(logo).toHaveAttribute('alt', 'Leenders Coaching');
  });

  it('should include email link', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    const emailLink = container.querySelector(
      'a[href="mailto:john@example.com"]'
    );
    expect(emailLink).toBeInTheDocument();
    expect(emailLink?.textContent).toContain('john@example.com');
  });

  it('should include current year in footer', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);
    const currentYear = new Date().getFullYear().toString();

    expect(container.textContent).toContain(currentYear);
    expect(container.textContent).toContain(
      'Leenders Coaching. Alle rechten voorbehouden.'
    );
  });

  it('should handle empty message', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: '',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('Nieuw contact bericht ontvangen');
  });

  it('should handle very long message', () => {
    const longMessage = 'A'.repeat(1000);
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: longMessage,
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain('John Doe');
    expect(container.textContent).toContain('Nieuw contact bericht ontvangen');
  });

  it('should handle email with special characters', () => {
    const props = {
      name: 'John Doe',
      email: 'john+test@example-domain.co.uk',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain('john+test@example-domain.co.uk');

    const emailLink = container.querySelector(
      'a[href="mailto:john+test@example-domain.co.uk"]'
    );
    expect(emailLink).toBeInTheDocument();
  });

  it('should include preview text', () => {
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    };

    const { container } = render(<ContactNotification {...props} />);

    expect(container.textContent).toContain(
      'Nieuw contactformulier bericht van John Doe'
    );
  });
});
