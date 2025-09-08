import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';
import { describe, it, expect, vi } from 'vitest';

describe('IconButton', () => {
  it('should render with default props', () => {
    render(
      <IconButton label="Test button">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('should render children correctly', () => {
    render(
      <IconButton label="Test button">
        <span data-testid="icon">Icon</span>
      </IconButton>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('Icon');
  });

  it('should apply default styles', () => {
    render(
      <IconButton label="Test button">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'p-2',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center',
      'rounded-full'
    );
  });

  it('should apply primary variant styles', () => {
    render(
      <IconButton label="Test button" variant="primary">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary/10', 'hover:bg-primary/20');
  });

  it('should apply ghost variant styles', () => {
    render(
      <IconButton label="Test button" variant="ghost">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'hover:bg-foreground',
      'hover:text-background',
      'dark:hover:bg-background',
      'dark:hover:text-foreground'
    );
  });

  it('should apply round shape styles', () => {
    render(
      <IconButton label="Test button" shape="round">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full');
  });

  it('should apply square shape styles', () => {
    render(
      <IconButton label="Test button" shape="square">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-none');
  });

  it('should apply bordered styles when bordered is true', () => {
    render(
      <IconButton label="Test button" bordered={true}>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'border',
      'border-foreground/80',
      'dark:border-background/80'
    );
  });

  it('should not apply bordered styles when bordered is false', () => {
    render(
      <IconButton label="Test button" bordered={false}>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('border');
  });

  it('should apply custom className', () => {
    render(
      <IconButton label="Test button" className="custom-button">
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button');
  });

  it('should pass through other props', () => {
    render(
      <IconButton
        label="Test button"
        data-testid="icon-button"
        id="test-id"
        disabled
      >
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByTestId('icon-button');
    expect(button).toHaveAttribute('id', 'test-id');
    expect(button).toBeDisabled();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(
      <IconButton label="Test button" onClick={handleClick}>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    render(
      <IconButton label="Test button" onFocus={handleFocus}>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    fireEvent.focus(button);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle blur events', () => {
    const handleBlur = vi.fn();
    render(
      <IconButton label="Test button" onBlur={handleBlur}>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    fireEvent.blur(button);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <IconButton label="Test button" disabled>
        <span>Icon</span>
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should handle complex combinations of props', () => {
    render(
      <IconButton
        label="Complex button"
        variant="ghost"
        shape="square"
        bordered={true}
        className="custom-class"
        data-testid="complex-button"
      >
        <span>Complex Icon</span>
      </IconButton>
    );

    const button = screen.getByTestId('complex-button');
    expect(button).toHaveClass(
      'p-2',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center',
      'rounded-none',
      'border',
      'border-foreground/80',
      'dark:border-background/80',
      'hover:bg-foreground',
      'hover:text-background',
      'dark:hover:bg-background',
      'dark:hover:text-foreground',
      'custom-class'
    );
    expect(button).toHaveAttribute('aria-label', 'Complex button');
  });

  it('should render with different label values', () => {
    const { rerender } = render(
      <IconButton label="First label">
        <span>Icon</span>
      </IconButton>
    );

    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'First label');

    rerender(
      <IconButton label="Second label">
        <span>Icon</span>
      </IconButton>
    );

    button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Second label');
  });
});
