import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import { describe, it, expect } from 'vitest';

/**
 * Test suite for Section component
 */
describe('Section', () => {
  it('should render as a section element', () => {
    render(<Section>Default section</Section>);

    const section = screen.getByText('Default section').closest('section');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('should apply default styles', () => {
    render(<Section>Default section</Section>);

    const section = screen.getByText('Default section').closest('section');
    expect(section).toHaveClass(
      'py-8',
      'sm:py-12',
      'md:py-16',
      'lg:py-20',
      'xl:py-24',
      'bg-background'
    );
  });

  it('should apply background styles correctly', () => {
    const { rerender } = render(
      <Section background="blue">Blue section</Section>
    );

    let section = screen.getByText('Blue section').closest('section');
    expect(section).toHaveClass('bg-pastel-blue', 'dark:bg-pastel-blue-dark');

    rerender(<Section background="purple">Purple section</Section>);
    section = screen.getByText('Purple section').closest('section');
    expect(section).toHaveClass(
      'bg-pastel-purple',
      'dark:bg-pastel-purple-dark'
    );

    rerender(<Section background="green">Green section</Section>);
    section = screen.getByText('Green section').closest('section');
    expect(section).toHaveClass('bg-pastel-green', 'dark:bg-pastel-green-dark');

    rerender(<Section background="pink">Pink section</Section>);
    section = screen.getByText('Pink section').closest('section');
    expect(section).toHaveClass('bg-pastel-pink', 'dark:bg-pastel-pink-dark');

    rerender(<Section background="yellow">Yellow section</Section>);
    section = screen.getByText('Yellow section').closest('section');
    expect(section).toHaveClass(
      'bg-pastel-yellow',
      'dark:bg-pastel-yellow-dark'
    );

    rerender(<Section background="teal">Teal section</Section>);
    section = screen.getByText('Teal section').closest('section');
    expect(section).toHaveClass('bg-pastel-teal', 'dark:bg-pastel-teal-dark');
  });

  it('should apply border styles when border is true', () => {
    const { rerender } = render(
      <Section border background="blue">
        Bordered blue section
      </Section>
    );

    let section = screen.getByText('Bordered blue section').closest('section');
    expect(section).toHaveClass(
      'border-y',
      'border-pastel-blue-dark',
      'dark:border-pastel-blue'
    );

    rerender(
      <Section border background="purple">
        Bordered purple section
      </Section>
    );
    section = screen.getByText('Bordered purple section').closest('section');
    expect(section).toHaveClass(
      'border-y',
      'border-pastel-purple-dark',
      'dark:border-pastel-purple'
    );
  });

  it('should not apply border styles when border is false', () => {
    render(
      <Section border={false} background="blue">
        Non-bordered section
      </Section>
    );

    const section = screen.getByText('Non-bordered section').closest('section');
    expect(section).not.toHaveClass('border-y');
  });

  it('should not apply border styles when no background is provided', () => {
    render(<Section border>Section without background</Section>);

    const section = screen
      .getByText('Section without background')
      .closest('section');
    expect(section).not.toHaveClass('border-y');
  });

  it('should disable padding when noPadding is true', () => {
    render(<Section noPadding>No padding section</Section>);

    const section = screen.getByText('No padding section').closest('section');
    expect(section).not.toHaveClass(
      'py-8',
      'sm:py-12',
      'md:py-16',
      'lg:py-20',
      'xl:py-24'
    );
  });

  it('should apply maxWidth styles correctly', () => {
    const { rerender } = render(
      <Section maxWidth="sm">Small max width</Section>
    );

    let section = screen.getByText('Small max width');
    expect(section).toHaveClass('max-w-sm');

    rerender(<Section maxWidth="lg">Large max width</Section>);
    section = screen.getByText('Large max width');
    expect(section).toHaveClass('max-w-lg');

    rerender(<Section maxWidth="3xl">3xl max width</Section>);
    section = screen.getByText('3xl max width');
    expect(section).toHaveClass('max-w-3xl');

    rerender(<Section maxWidth="7xl">7xl max width</Section>);
    section = screen.getByText('7xl max width');
    expect(section).toHaveClass('max-w-7xl');
  });

  it('should apply custom className', () => {
    render(<Section className="custom-class">Custom section</Section>);

    const section = screen.getByText('Custom section').closest('section');
    expect(section).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    render(
      <Section data-testid="section-element" id="test-id">
        Section with props
      </Section>
    );

    const section = screen.getByTestId('section-element');
    expect(section).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Section>
        <div>Child 1</div>
        <div>Child 2</div>
      </Section>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should render children directly when noPadding is true', () => {
    render(
      <Section noPadding>
        <div>Direct child</div>
      </Section>
    );

    expect(screen.getByText('Direct child')).toBeInTheDocument();
  });

  it('should apply all background colors correctly', () => {
    const backgrounds = [
      'blue',
      'purple',
      'green',
      'pink',
      'yellow',
      'teal',
    ] as const;

    backgrounds.forEach((background) => {
      const { unmount } = render(
        <Section background={background}>{background} section</Section>
      );

      const section = screen.getByText(`${background} section`);
      expect(section).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all maxWidth values correctly', () => {
    const maxWidths = [
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
      '7xl',
    ] as const;

    maxWidths.forEach((maxWidth) => {
      const { unmount } = render(
        <Section maxWidth={maxWidth}>{maxWidth} max width</Section>
      );

      const section = screen.getByText(`${maxWidth} max width`);
      expect(section).toBeInTheDocument();

      unmount();
    });
  });

  it('should handle complex combinations of props', () => {
    render(
      <Section
        background="blue"
        border
        maxWidth="2xl"
        className="custom-section"
        data-testid="complex-section"
      >
        Complex section
      </Section>
    );

    const section = screen.getByTestId('complex-section');
    expect(section).toHaveClass(
      'bg-pastel-blue',
      'dark:bg-pastel-blue-dark',
      'border-y',
      'border-pastel-blue-dark',
      'dark:border-pastel-blue',
      'custom-section'
    );

    // Check that the maxWidth is applied to the Container inside
    const container = section.querySelector('div');
    expect(container).toHaveClass('max-w-2xl');
  });

  it('should handle noPadding with maxWidth', () => {
    render(
      <Section noPadding maxWidth="lg">
        No padding with max width
      </Section>
    );

    const section = screen.getByText('No padding with max width');
    expect(section).toBeInTheDocument();
    expect(section).not.toHaveClass(
      'py-8',
      'sm:py-12',
      'md:py-16',
      'lg:py-20',
      'xl:py-24'
    );
  });
});
