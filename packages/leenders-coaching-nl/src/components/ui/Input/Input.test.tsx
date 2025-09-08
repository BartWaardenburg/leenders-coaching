import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input', () => {
  it('should render as an input element by default', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('should render as textarea when as="textarea"', () => {
    render(<Input as="textarea" placeholder="Enter text" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('should render with label', () => {
    render(<Input label="Test Label" placeholder="Enter text" />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('should render with error message', () => {
    render(<Input error="This field is required" placeholder="Enter text" />);

    const error = screen.getByText('This field is required');
    expect(error).toBeInTheDocument();
  });

  it('should apply default variant styles', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'bg-background',
      'border-b-2',
      'border-foreground/20'
    );
  });

  it('should apply bordered variant styles', () => {
    render(<Input variant="bordered" placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'bg-background',
      'border',
      'border-foreground/20'
    );
  });

  it('should apply custom className', () => {
    render(<Input className="custom-input" placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should show error styles when error is provided', () => {
    render(<Input error="Error message" placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('!border-destructive');
  });

  it('should pass through other props', () => {
    render(
      <Input
        data-testid="input-element"
        id="test-input"
        placeholder="Enter text"
      />
    );

    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('should handle input changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  it('should render textarea with correct styles', () => {
    render(<Input as="textarea" placeholder="Enter text" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('min-h-[120px]', 'resize-y');
  });

  it('should render textarea with default variant styles', () => {
    render(<Input as="textarea" variant="default" placeholder="Enter text" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-x-0', 'border-t-0');
  });

  it('should show label with disabled styles when disabled', () => {
    render(<Input label="Test Label" disabled placeholder="Enter text" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('opacity-60');
  });

  it('should show error with disabled styles when disabled', () => {
    render(<Input error="Error message" disabled placeholder="Enter text" />);

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('opacity-60');
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    render(<Input onFocus={handleFocus} placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle blur events', () => {
    const handleBlur = vi.fn();
    render(<Input onBlur={handleBlur} placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter your name" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('should render with value', () => {
    render(<Input value="test value" onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });
});
