import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import { describe, it, expect } from 'vitest';

/**
 * Test suite for Text component
 */
describe('Text', () => {
  it('should render as a paragraph by default', () => {
    render(<Text>Default text</Text>);

    const text = screen.getByText('Default text');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  it('should render with custom element using as prop', () => {
    render(<Text as="span">Span text</Text>);

    const text = screen.getByText('Span text');
    expect(text.tagName).toBe('SPAN');
  });

  it('should apply default variant styles', () => {
    render(<Text>Default text</Text>);

    const text = screen.getByText('Default text');
    expect(text).toHaveClass(
      'text-foreground',
      'font-montserrat',
      'font-normal'
    );
  });

  it('should apply variant styles correctly', () => {
    const { rerender } = render(<Text variant="muted">Muted text</Text>);

    let text = screen.getByText('Muted text');
    expect(text).toHaveClass('text-muted-foreground');

    rerender(<Text variant="large">Large text</Text>);
    text = screen.getByText('Large text');
    expect(text).toHaveClass('text-lg', 'text-foreground/90');

    rerender(<Text variant="small">Small text</Text>);
    text = screen.getByText('Small text');
    expect(text).toHaveClass('text-sm', 'text-foreground/80');

    rerender(<Text variant="label">Label text</Text>);
    text = screen.getByText('Label text');
    expect(text).toHaveClass('text-md', 'font-medium', 'text-foreground');

    rerender(<Text variant="error">Error text</Text>);
    text = screen.getByText('Error text');
    expect(text).toHaveClass('text-sm', 'text-destructive');
  });

  it('should apply playfair and navigation variants with correct font family', () => {
    const { rerender } = render(<Text variant="playfair">Playfair text</Text>);

    let text = screen.getByText('Playfair text');
    expect(text).toHaveClass('font-playfair', 'text-lg', 'text-foreground');

    rerender(<Text variant="navigation">Navigation text</Text>);
    text = screen.getByText('Navigation text');
    expect(text).toHaveClass('font-playfair', 'text-4xl', 'text-inherit');
  });

  it('should apply card variants correctly', () => {
    const { rerender } = render(
      <Text variant="card-meta">Card meta text</Text>
    );

    let text = screen.getByText('Card meta text');
    expect(text).toHaveClass('text-[13px]', 'uppercase', 'text-foreground/60');

    rerender(<Text variant="card-excerpt">Card excerpt text</Text>);
    text = screen.getByText('Card excerpt text');
    expect(text).toHaveClass(
      'text-base',
      'leading-relaxed',
      'text-foreground/70'
    );

    rerender(<Text variant="quote">Quote text</Text>);
    text = screen.getByText('Quote text');
    expect(text).toHaveClass('text-xl', 'md:text-2xl', 'text-foreground');
  });

  it('should apply weight styles correctly', () => {
    const { rerender } = render(<Text weight="normal">Normal weight</Text>);

    let text = screen.getByText('Normal weight');
    expect(text).toHaveClass('font-normal');

    rerender(<Text weight="medium">Medium weight</Text>);
    text = screen.getByText('Medium weight');
    expect(text).toHaveClass('font-medium');

    rerender(<Text weight="bold">Bold weight</Text>);
    text = screen.getByText('Bold weight');
    expect(text).toHaveClass('font-bold');
  });

  it('should apply text alignment correctly', () => {
    const { rerender } = render(<Text textAlign="left">Left aligned</Text>);

    let text = screen.getByText('Left aligned');
    expect(text).not.toHaveClass('text-center', 'text-right');

    rerender(<Text textAlign="center">Center aligned</Text>);
    text = screen.getByText('Center aligned');
    expect(text).toHaveClass('text-center');

    rerender(<Text textAlign="right">Right aligned</Text>);
    text = screen.getByText('Right aligned');
    expect(text).toHaveClass('text-right');
  });

  it('should apply italic style when italic prop is true', () => {
    render(<Text italic>Italic text</Text>);

    const text = screen.getByText('Italic text');
    expect(text).toHaveClass('italic');
  });

  it('should apply custom className', () => {
    render(<Text className="custom-class">Custom text</Text>);

    const text = screen.getByText('Custom text');
    expect(text).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    render(
      <Text data-testid="text-element" id="test-id">
        Text with props
      </Text>
    );

    const text = screen.getByTestId('text-element');
    expect(text).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Text>
        <span>Text with</span>
        <strong>multiple children</strong>
      </Text>
    );

    const text = screen.getByText('Text with');
    expect(text).toBeInTheDocument();
    expect(screen.getByText('multiple children')).toBeInTheDocument();
  });

  it('should apply all variants correctly', () => {
    const variants = [
      'default',
      'muted',
      'large',
      'small',
      'label',
      'error',
      'playfair',
      'navigation',
      'card-meta',
      'card-excerpt',
      'quote',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Text variant={variant}>{variant} text</Text>);

      const text = screen.getByText(`${variant} text`);
      expect(text).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all weights correctly', () => {
    const weights = ['normal', 'medium', 'bold'] as const;

    weights.forEach((weight) => {
      const { unmount } = render(<Text weight={weight}>{weight} weight</Text>);

      const text = screen.getByText(`${weight} weight`);
      expect(text).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all text alignments correctly', () => {
    const alignments = ['left', 'center', 'right'] as const;

    alignments.forEach((alignment) => {
      const { unmount } = render(
        <Text textAlign={alignment}>{alignment} aligned</Text>
      );

      const text = screen.getByText(`${alignment} aligned`);
      expect(text).toBeInTheDocument();

      unmount();
    });
  });
});
