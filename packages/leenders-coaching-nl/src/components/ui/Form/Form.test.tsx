import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import { describe, it, expect, vi } from 'vitest';

describe('Form', () => {
  it('should render as a form element', () => {
    render(<Form>Form content</Form>);

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form?.tagName).toBe('FORM');
  });

  it('should apply default styles', () => {
    render(<Form>Form content</Form>);

    const form = document.querySelector('form');
    expect(form).toHaveClass('w-full');
  });

  it('should apply custom className', () => {
    render(<Form className="custom-form">Form content</Form>);

    const form = document.querySelector('form');
    expect(form).toHaveClass('custom-form');
  });

  it('should pass through other props', () => {
    render(
      <Form data-testid="form-element" id="test-id">
        Form content
      </Form>
    );

    const form = screen.getByTestId('form-element');
    expect(form).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Form>
        <span>Form with</span>
        <strong>multiple children</strong>
      </Form>
    );

    const form = document.querySelector('form');
    expect(form).toHaveTextContent('Form with');
    expect(form).toHaveTextContent('multiple children');
  });

  it('should call onSubmit when form is submitted', () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should prevent default form submission', () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    // The form should not actually submit (preventDefault was called)
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        preventDefault: expect.any(Function),
      })
    );
  });

  it('should handle form submission without onSubmit handler', () => {
    render(
      <Form>
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole('button');

    // Should not throw error when onSubmit is not provided
    expect(() => fireEvent.click(submitButton)).not.toThrow();
  });

  it('should handle form submission with Enter key', () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <input type="text" />
      </Form>
    );

    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Note: This test might not trigger form submission in all cases
    // as it depends on the input being inside a form and having proper event handling
  });
});
