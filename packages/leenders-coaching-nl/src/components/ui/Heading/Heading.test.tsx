import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

/**
 * Test suite for Heading component
 */
describe('Heading', () => {
  it('should render as h1 by default', () => {
    render(<Heading>Default heading</Heading>);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('should render with specified level', () => {
    const { rerender } = render(<Heading level="h2">H2 heading</Heading>);

    let heading = screen.getByRole('heading', { level: 2 });
    expect(heading.tagName).toBe('H2');

    rerender(<Heading level="h3">H3 heading</Heading>);
    heading = screen.getByRole('heading', { level: 3 });
    expect(heading.tagName).toBe('H3');

    rerender(<Heading level="h4">H4 heading</Heading>);
    heading = screen.getByRole('heading', { level: 4 });
    expect(heading.tagName).toBe('H4');

    rerender(<Heading level="h5">H5 heading</Heading>);
    heading = screen.getByRole('heading', { level: 5 });
    expect(heading.tagName).toBe('H5');

    rerender(<Heading level="h6">H6 heading</Heading>);
    heading = screen.getByRole('heading', { level: 6 });
    expect(heading.tagName).toBe('H6');
  });

  it('should apply default variant and weight styles', () => {
    render(<Heading>Default heading</Heading>);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'text-3xl',
      'md:text-4xl',
      'font-bold',
      'font-playfair'
    );
  });

  it('should apply variant styles correctly', () => {
    const { rerender } = render(
      <Heading variant="large">Large heading</Heading>
    );

    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-5xl', 'md:text-7xl');

    rerender(<Heading variant="medium">Medium heading</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'text-3xl',
      'sm:text-4xl',
      'md:text-[42px]',
      'leading-[1.1]'
    );

    rerender(<Heading variant="small">Small heading</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-lg', 'md:text-xl');
  });

  it('should apply weight styles correctly', () => {
    const { rerender } = render(
      <Heading weight="normal">Normal weight</Heading>
    );

    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-normal');

    rerender(<Heading weight="bold">Bold weight</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('font-bold');
  });

  it('should apply spacing styles correctly', () => {
    const { rerender } = render(<Heading spacing="none">No spacing</Heading>);

    let heading = screen.getByRole('heading');
    expect(heading).not.toHaveClass('mb-6');

    rerender(<Heading spacing="normal">Normal spacing</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('mb-6');
  });

  it('should apply color styles correctly', () => {
    const { rerender } = render(
      <Heading color="default">Default color</Heading>
    );

    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-foreground');

    rerender(<Heading color="muted">Muted color</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-foreground/80');
  });

  it('should apply text alignment correctly', () => {
    const { rerender } = render(
      <Heading textAlign="left">Left aligned</Heading>
    );

    let heading = screen.getByRole('heading');
    expect(heading).not.toHaveClass('text-center', 'text-right');

    rerender(<Heading textAlign="center">Center aligned</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-center');

    rerender(<Heading textAlign="right">Right aligned</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-right');
  });

  it('should show border when showBorder is true', () => {
    render(<Heading showBorder>Heading with border</Heading>);

    const heading = screen.getByRole('heading');
    const border = heading.parentElement?.querySelector('.absolute');
    expect(border).toBeInTheDocument();
    expect(border).toHaveClass('h-[2px]', 'w-24');
  });

  it('should not show border by default', () => {
    render(<Heading>Heading without border</Heading>);

    const heading = screen.getByRole('heading');
    const border = heading.parentElement?.querySelector('.absolute');
    expect(border).not.toBeInTheDocument();
  });

  it('should apply border color styles correctly', () => {
    const { rerender } = render(
      <Heading showBorder borderColor="blue">
        Blue border
      </Heading>
    );

    let border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-blue-dark');

    rerender(
      <Heading showBorder borderColor="purple">
        Purple border
      </Heading>
    );
    border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-purple-dark');

    rerender(
      <Heading showBorder borderColor="green">
        Green border
      </Heading>
    );
    border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-green-dark');

    rerender(
      <Heading showBorder borderColor="pink">
        Pink border
      </Heading>
    );
    border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-pink-dark');

    rerender(
      <Heading showBorder borderColor="yellow">
        Yellow border
      </Heading>
    );
    border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-yellow-dark');

    rerender(
      <Heading showBorder borderColor="teal">
        Teal border
      </Heading>
    );
    border = screen
      .getByRole('heading')
      .parentElement?.querySelector('.absolute');
    expect(border).toHaveClass('bg-pastel-teal-dark');
  });

  it('should apply custom className', () => {
    render(<Heading className="custom-class">Custom heading</Heading>);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    render(
      <Heading data-testid="heading-element" id="test-id">
        Heading with props
      </Heading>
    );

    const heading = screen.getByTestId('heading-element');
    expect(heading).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Heading>
        <span>Heading with</span>
        <strong>multiple children</strong>
      </Heading>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Heading with');
    expect(heading.querySelector('span')).toBeInTheDocument();
    expect(heading.querySelector('strong')).toBeInTheDocument();
  });

  it('should apply all variants correctly', () => {
    const variants = ['default', 'large', 'medium', 'small'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Heading variant={variant}>{variant} heading</Heading>
      );

      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all border colors correctly', () => {
    const borderColors = [
      'default',
      'blue',
      'purple',
      'green',
      'pink',
      'yellow',
      'teal',
    ] as const;

    borderColors.forEach((borderColor) => {
      const { unmount } = render(
        <Heading showBorder borderColor={borderColor}>
          {borderColor} border
        </Heading>
      );

      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all text alignments correctly', () => {
    const alignments = ['left', 'center', 'right'] as const;

    alignments.forEach((alignment) => {
      const { unmount } = render(
        <Heading textAlign={alignment}>{alignment} aligned</Heading>
      );

      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all heading levels correctly', () => {
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

    levels.forEach((level) => {
      const { unmount } = render(
        <Heading level={level}>{level} heading</Heading>
      );

      const heading = screen.getByRole('heading', {
        level: parseInt(level[1]!),
      });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe(level.toUpperCase());

      unmount();
    });
  });
});
