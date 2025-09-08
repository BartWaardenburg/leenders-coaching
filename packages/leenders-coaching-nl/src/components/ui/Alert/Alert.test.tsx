import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Alert } from './Alert';
import { describe, it, expect, vi } from 'vitest';

describe('Alert', () => {
  it('should render with default props', () => {
    render(<Alert>Default alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Default alert');
    expect(alert).toHaveClass('bg-pastel-blue', 'dark:bg-pastel-blue-dark');
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Alert variant="purple">Purple alert</Alert>);

    let alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-pastel-purple', 'dark:bg-pastel-purple-dark');

    rerender(<Alert variant="green">Green alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-pastel-green', 'dark:bg-pastel-green-dark');

    rerender(<Alert variant="pink">Pink alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-pastel-pink', 'dark:bg-pastel-pink-dark');

    rerender(<Alert variant="yellow">Yellow alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-pastel-yellow', 'dark:bg-pastel-yellow-dark');

    rerender(<Alert variant="teal">Teal alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-pastel-teal', 'dark:bg-pastel-teal-dark');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Alert size="small">Small alert</Alert>);

    let alert = screen.getByRole('alert');
    expect(alert).toHaveClass('p-2', 'text-sm');

    rerender(<Alert size="medium">Medium alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('p-3', 'text-base');

    rerender(<Alert size="large">Large alert</Alert>);
    alert = screen.getByRole('alert');
    expect(alert).toHaveClass('p-4', 'text-lg');
  });

  it('should show close button by default', () => {
    render(<Alert>Alert with close button</Alert>);

    const closeButton = screen.getByLabelText('Close alert');
    expect(closeButton).toBeInTheDocument();
    const icon = closeButton.querySelector('svg');
    expect(icon).toHaveClass('h-5', 'w-5'); // medium size default
  });

  it('should hide close button when showCloseButton is false', () => {
    render(<Alert showCloseButton={false}>Alert without close button</Alert>);

    const closeButton = screen.queryByLabelText('Close alert');
    expect(closeButton).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Alert onClose={handleClose}>Alert with onClose</Alert>);

    const closeButton = screen.getByLabelText('Close alert');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close alert when close button is clicked', async () => {
    render(<Alert>Alert to close</Alert>);

    const alert = screen.getByRole('alert');
    const closeButton = screen.getByLabelText('Close alert');

    expect(alert).toHaveClass('opacity-100', 'translate-y-0');

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(alert).toHaveClass('opacity-0', '-translate-y-2');
    });
  });

  it('should remove alert from DOM after close animation', async () => {
    render(<Alert>Alert to remove</Alert>);

    const alert = screen.getByRole('alert');
    const closeButton = screen.getByLabelText('Close alert');

    fireEvent.click(closeButton);

    await waitFor(
      () => {
        expect(alert).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should apply custom className', () => {
    render(<Alert className="custom-alert">Custom alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-alert');
  });

  it('should pass through other props', () => {
    render(
      <Alert data-testid="alert-element" id="test-id">
        Alert with props
      </Alert>
    );

    const alert = screen.getByTestId('alert-element');
    expect(alert).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Alert>
        <span>Alert with</span>
        <strong>multiple children</strong>
      </Alert>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Alert with');
    expect(alert).toHaveTextContent('multiple children');
  });

  it('should have correct close button sizes for different alert sizes', () => {
    const { rerender } = render(<Alert size="small">Small alert</Alert>);

    let closeButton = screen.getByLabelText('Close alert');
    expect(closeButton.querySelector('svg')).toHaveClass('h-4', 'w-4');

    rerender(<Alert size="medium">Medium alert</Alert>);
    closeButton = screen.getByLabelText('Close alert');
    expect(closeButton.querySelector('svg')).toHaveClass('h-5', 'w-5');

    rerender(<Alert size="large">Large alert</Alert>);
    closeButton = screen.getByLabelText('Close alert');
    expect(closeButton.querySelector('svg')).toHaveClass('h-6', 'w-6');
  });

  it('should have correct text leading for different sizes', () => {
    const { rerender } = render(<Alert size="small">Small alert</Alert>);

    let text = screen.getByText('Small alert');
    expect(text).toHaveClass('leading-snug');

    rerender(<Alert size="medium">Medium alert</Alert>);
    text = screen.getByText('Medium alert');
    expect(text).toHaveClass('leading-normal');

    rerender(<Alert size="large">Large alert</Alert>);
    text = screen.getByText('Large alert');
    expect(text).toHaveClass('leading-relaxed');
  });
});
