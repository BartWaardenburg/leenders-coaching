import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionFAQ } from './SectionFAQ';
import type { FAQItem } from '@/components/ui/FAQ';

// Mock the FAQ component
vi.mock('@/components/ui/FAQ', () => ({
  FAQ: ({ items, variant }: { items: FAQItem[]; variant?: string }) =>
    React.createElement(
      'div',
      { 'data-testid': 'faq-component', 'data-variant': variant },
      items.map((item, index) =>
        React.createElement(
          'div',
          { key: index, 'data-testid': 'faq-item' },
          item.question
        )
      )
    ),
}));

// Mock UI components
vi.mock('@/components/ui/Section', () => ({
  Section: ({
    children,
    background,
    border,
    className,
    ...props
  }: React.ComponentProps<'section'> & {
    background?: string;
    border?: boolean;
  }) =>
    React.createElement(
      'section',
      {
        'data-testid': 'section',
        'data-background': background,
        'data-border': border,
        className,
        ...props,
      },
      children
    ),
}));

vi.mock('@/components/ui/Stack', () => ({
  Stack: ({
    children,
    gap,
    space,
    className,
  }: React.ComponentProps<'div'> & { gap?: string; space?: string }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'stack',
        'data-gap': gap,
        'data-space': space,
        className,
      },
      children
    ),
}));

vi.mock('@/components/ui/Box', () => ({
  Box: ({ children, className }: React.ComponentProps<'div'>) =>
    React.createElement('div', { 'data-testid': 'box', className }, children),
}));

vi.mock('@/components/ui/Heading', () => ({
  Heading: ({
    children,
    level,
    variant,
    showBorder,
    borderColor,
    textAlign,
  }: React.ComponentProps<'h2'> & {
    level?: string;
    variant?: string;
    showBorder?: boolean;
    borderColor?: string;
    textAlign?: string;
  }) =>
    React.createElement(
      'h2',
      {
        'data-testid': 'heading',
        'data-level': level,
        'data-variant': variant,
        'data-show-border': showBorder,
        'data-border-color': borderColor,
        'data-text-align': textAlign,
      },
      children
    ),
}));

vi.mock('@/components/ui/Text', () => ({
  Text: ({
    children,
    variant,
    className,
  }: React.ComponentProps<'p'> & { variant?: string }) =>
    React.createElement(
      'p',
      { 'data-testid': 'text', 'data-variant': variant, className },
      children
    ),
}));

const mockFAQItems: FAQItem[] = [
  {
    question: 'What is this service?',
    answer: [
      {
        _type: 'block',
        _key: '1',
        children: [
          { _type: 'span', _key: '1-1', text: 'This is a test answer.' },
        ],
      },
    ],
  },
  {
    question: 'How does it work?',
    answer: [
      {
        _type: 'block',
        _key: '2',
        children: [
          {
            _type: 'span',
            _key: '2-1',
            text: 'It works by following these steps.',
          },
        ],
      },
    ],
  },
];

/**
 * Test suite for SectionFAQ component
 */
describe('SectionFAQ', () => {
  it('should render with all props correctly', () => {
    render(
      <SectionFAQ
        title="FAQ Section"
        description="Frequently asked questions"
        items={mockFAQItems}
        background="blue"
        border={true}
        className="custom-class"
      />
    );

    expect(screen.getByTestId('section')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toHaveAttribute(
      'data-background',
      'blue'
    );
    expect(screen.getByTestId('section')).toHaveAttribute(
      'data-border',
      'true'
    );
    expect(screen.getByTestId('section')).toHaveClass('custom-class');

    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('heading')).toHaveTextContent('FAQ Section');
    expect(screen.getByTestId('heading')).toHaveAttribute('data-level', 'h2');
    expect(screen.getByTestId('heading')).toHaveAttribute(
      'data-variant',
      'large'
    );
    expect(screen.getByTestId('heading')).toHaveAttribute(
      'data-show-border',
      'true'
    );
    expect(screen.getByTestId('heading')).toHaveAttribute(
      'data-border-color',
      'blue'
    );
    expect(screen.getByTestId('heading')).toHaveAttribute(
      'data-text-align',
      'center'
    );

    expect(screen.getByTestId('text')).toBeInTheDocument();
    expect(screen.getByTestId('text')).toHaveTextContent(
      'Frequently asked questions'
    );
    expect(screen.getByTestId('text')).toHaveAttribute('data-variant', 'large');

    expect(screen.getByTestId('faq-component')).toBeInTheDocument();
    expect(screen.getByTestId('faq-component')).toHaveAttribute(
      'data-variant',
      'blue'
    );
  });

  it('should render without title and description', () => {
    render(<SectionFAQ items={mockFAQItems} />);

    expect(screen.getByTestId('section')).toBeInTheDocument();
    expect(screen.queryByTestId('heading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text')).not.toBeInTheDocument();
    expect(screen.getByTestId('faq-component')).toBeInTheDocument();
  });

  it('should render with only title', () => {
    render(<SectionFAQ title="FAQ Section" items={mockFAQItems} />);

    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('heading')).toHaveTextContent('FAQ Section');
    expect(screen.queryByTestId('text')).not.toBeInTheDocument();
  });

  it('should render with only description', () => {
    render(
      <SectionFAQ
        description="Frequently asked questions"
        items={mockFAQItems}
      />
    );

    expect(screen.queryByTestId('heading')).not.toBeInTheDocument();
    expect(screen.getByTestId('text')).toBeInTheDocument();
    expect(screen.getByTestId('text')).toHaveTextContent(
      'Frequently asked questions'
    );
  });

  it('should use default border value', () => {
    render(<SectionFAQ items={mockFAQItems} />);

    expect(screen.getByTestId('section')).toHaveAttribute(
      'data-border',
      'false'
    );
  });

  it('should pass background color to FAQ component', () => {
    render(<SectionFAQ items={mockFAQItems} background="purple" />);

    expect(screen.getByTestId('faq-component')).toHaveAttribute(
      'data-variant',
      'purple'
    );
  });

  it('should handle empty items array', () => {
    render(<SectionFAQ items={[]} />);

    expect(screen.getByTestId('faq-component')).toBeInTheDocument();
    expect(screen.queryByTestId('faq-item')).not.toBeInTheDocument();
  });

  it('should render FAQ items correctly', () => {
    render(<SectionFAQ items={mockFAQItems} />);

    const faqItems = screen.getAllByTestId('faq-item');
    expect(faqItems).toHaveLength(2);
    expect(faqItems[0]).toHaveTextContent('What is this service?');
    expect(faqItems[1]).toHaveTextContent('How does it work?');
  });

  it('should apply correct layout structure', () => {
    render(
      <SectionFAQ
        title="FAQ Section"
        description="Description"
        items={mockFAQItems}
      />
    );

    // Check that the layout structure is correct
    const section = screen.getByTestId('section');
    const box = screen.getByTestId('box');
    const stacks = screen.getAllByTestId('stack');

    expect(section).toContainElement(box);
    expect(box).toContainElement(stacks[0]!); // Main stack
    expect(stacks[0]!).toContainElement(stacks[1]!); // Title/description stack
  });

  it('should handle additional props passed to section', () => {
    render(
      <SectionFAQ
        items={mockFAQItems}
        id="faq-section"
        data-testid="custom-section"
      />
    );

    const section = screen.getByTestId('custom-section');
    expect(section).toHaveAttribute('id', 'faq-section');
    expect(section).toHaveAttribute('data-testid', 'custom-section');
  });

  it('should apply correct CSS classes', () => {
    render(
      <SectionFAQ
        title="FAQ Section"
        description="Description"
        items={mockFAQItems}
      />
    );

    const box = screen.getByTestId('box');
    expect(box).toHaveClass('mx-auto', 'max-w-3xl');

    const titleStack = screen.getAllByTestId('stack')[1];
    expect(titleStack).toHaveClass('text-center');

    const text = screen.getByTestId('text');
    expect(text).toHaveClass('max-w-2xl', 'mx-auto');
  });
});
