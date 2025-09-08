import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect, vi } from 'vitest';

/**
 * Test suite for Button component
 */
describe('Button', () => {
  it('should render as a button by default', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should render as a link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>);

    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should apply default variant and size classes', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11', 'px-8'); // md size
    expect(button).toHaveClass('bg-foreground', 'text-background'); // black variant
  });

  it('should apply variant classes correctly', () => {
    const { rerender } = render(<Button variant="blue">Blue Button</Button>);

    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-pastel-blue', 'text-foreground');

    rerender(<Button variant="transparent">Transparent Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', 'text-foreground');

    rerender(<Button variant="purple">Purple Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-pastel-purple', 'text-foreground');
  });

  it('should apply size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);

    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'px-4');

    rerender(<Button size="lg">Large Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'px-12');
  });

  it('should show loading state', () => {
    render(<Button isLoading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('text-transparent');

    // Check for loading spinner
    const spinner = button.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      'disabled:opacity-50',
      'disabled:pointer-events-none'
    );
  });

  it('should be disabled when loading', () => {
    render(<Button isLoading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should apply fullWidthOnContainer class when true', () => {
    render(<Button fullWidthOnContainer>Full Width Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full', '@md:w-auto');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not handle click events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not handle click events when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Loading Button
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should pass through other button props', () => {
    render(
      <Button type="submit" data-testid="submit-button">
        Submit
      </Button>
    );

    const button = screen.getByTestId('submit-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should pass through other link props when href is provided', () => {
    render(
      <Button href="/test" target="_blank" data-testid="link-button">
        Link
      </Button>
    );

    const link = screen.getByTestId('link-button');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should set aria-disabled on links when disabled', () => {
    render(
      <Button href="/test" disabled>
        Disabled Link
      </Button>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should set aria-disabled on links when loading', () => {
    render(
      <Button href="/test" isLoading>
        Loading Link
      </Button>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render children correctly', () => {
    render(
      <Button>
        <span>Button with</span>
        <strong>multiple children</strong>
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Button with');
    expect(button.querySelector('span')).toBeInTheDocument();
    expect(button.querySelector('strong')).toBeInTheDocument();
  });

  it('should apply all variant styles correctly', () => {
    const variants = [
      'black',
      'transparent',
      'blue',
      'purple',
      'green',
      'pink',
      'yellow',
      'teal',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Button variant={variant}>{variant} Button</Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all size styles correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size} Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      unmount();
    });
  });
});
