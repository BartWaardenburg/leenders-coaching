import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQ, type FAQItem } from './FAQ';

// Mock motion components
vi.mock('motion/react', () => ({
  motion: {
    create: (Component: React.ComponentType | undefined) => {
      const MotionComponent = ({
        children,
        ...props
      }: React.ComponentProps<'div'>) =>
        React.createElement(Component || 'div', props, children);
      MotionComponent.displayName = `motion(${Component?.displayName || 'div'})`;
      return MotionComponent;
    },
    div: ({ children, ...props }: React.ComponentProps<'div'>) =>
      React.createElement('div', props, children),
  },
  AnimatePresence: ({ children }: React.ComponentProps<'div'>) =>
    React.createElement('div', {}, children),
}));

// Mock react-icons
vi.mock('react-icons/io5', () => ({
  IoChevronDown: () =>
    React.createElement('div', { 'data-testid': 'chevron-down' }, '▼'),
}));

// Mock PortableText component
vi.mock('@/components/ui/PortableText', () => ({
  PortableText: ({ content }: { content: unknown }) =>
    React.createElement(
      'div',
      { 'data-testid': 'portable-text' },
      JSON.stringify(content)
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
 * Test suite for FAQ component
 */
describe('FAQ', () => {
  it('should render FAQ items correctly', () => {
    render(<FAQ items={mockFAQItems} />);

    expect(screen.getByText('What is this service?')).toBeInTheDocument();
    expect(screen.getByText('How does it work?')).toBeInTheDocument();
    expect(screen.getAllByTestId('chevron-down')).toHaveLength(2);
  });

  it('should show empty state when no items provided', () => {
    render(<FAQ items={[]} />);

    expect(
      screen.getByText(
        'Er zijn momenteel geen veelgestelde vragen beschikbaar.'
      )
    ).toBeInTheDocument();
  });

  it('should show empty state when items is undefined', () => {
    render(<FAQ />);

    expect(
      screen.getByText(
        'Er zijn momenteel geen veelgestelde vragen beschikbaar.'
      )
    ).toBeInTheDocument();
  });

  it('should toggle FAQ item when clicked', () => {
    render(<FAQ items={mockFAQItems} />);

    const firstQuestion = screen.getByText('What is this service?');

    // Initially, answer should not be visible
    expect(screen.queryByTestId('portable-text')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(firstQuestion);
    expect(screen.queryByTestId('portable-text')).not.toBeInTheDocument();
  });

  it('should only show one answer at a time', () => {
    render(<FAQ items={mockFAQItems} />);

    const firstQuestion = screen.getByText('What is this service?');
    const secondQuestion = screen.getByText('How does it work?');

    // Click first question
    fireEvent.click(firstQuestion);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();

    // Click second question
    fireEvent.click(secondQuestion);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();

    // Only one answer should be visible
    const answers = screen.getAllByTestId('portable-text');
    expect(answers).toHaveLength(1);
  });

  it('should apply correct variant styles', () => {
    const { rerender } = render(<FAQ items={mockFAQItems} variant="blue" />);

    // Test blue variant - look for the outer container that has the variant styles
    const blueContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(blueContainer).toHaveClass('bg-pastel-blue/50');

    // Test purple variant
    rerender(<FAQ items={mockFAQItems} variant="purple" />);
    const purpleContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(purpleContainer).toHaveClass('bg-pastel-purple/50');

    // Test green variant
    rerender(<FAQ items={mockFAQItems} variant="green" />);
    const greenContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(greenContainer).toHaveClass('bg-pastel-green/50');

    // Test pink variant
    rerender(<FAQ items={mockFAQItems} variant="pink" />);
    const pinkContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(pinkContainer).toHaveClass('bg-pastel-pink/50');

    // Test yellow variant
    rerender(<FAQ items={mockFAQItems} variant="yellow" />);
    const yellowContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(yellowContainer).toHaveClass('bg-pastel-yellow/50');

    // Test teal variant
    rerender(<FAQ items={mockFAQItems} variant="teal" />);
    const tealContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement;
    expect(tealContainer).toHaveClass('bg-pastel-teal/50');
  });

  it('should apply custom className', () => {
    render(<FAQ items={mockFAQItems} className="custom-class" />);

    // The className is applied to the Stack component, which is the parent of the FAQ items
    const stackContainer = screen
      .getByText('What is this service?')
      .closest('div')?.parentElement?.parentElement;
    expect(stackContainer!).toHaveClass('custom-class');
  });

  it('should handle FAQ items with empty answers', () => {
    const itemsWithEmptyAnswer: FAQItem[] = [
      {
        question: 'Question with empty answer',
        answer: [],
      },
    ];

    render(<FAQ items={itemsWithEmptyAnswer} />);

    expect(screen.getByText('Question with empty answer')).toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Question with empty answer'));
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
    expect(screen.getByText('[]')).toBeInTheDocument(); // Empty array stringified
  });

  it('should handle FAQ items with complex answer content', () => {
    const complexAnswer: FAQItem[] = [
      {
        question: 'Complex question',
        answer: [
          {
            _type: 'block',
            _key: 'complex-1',
            children: [
              { _type: 'span', _key: 'complex-1-1', text: 'Part 1 of answer' },
              { _type: 'span', _key: 'complex-1-2', text: 'Part 2 of answer' },
            ],
          },
          {
            _type: 'block',
            _key: 'complex-2',
            children: [
              { _type: 'span', _key: 'complex-2-1', text: 'Second block' },
            ],
          },
        ],
      },
    ];

    render(<FAQ items={complexAnswer} />);

    fireEvent.click(screen.getByText('Complex question'));
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
  });
});
