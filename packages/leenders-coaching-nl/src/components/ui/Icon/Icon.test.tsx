import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import { describe, it, expect } from 'vitest';

describe('Icon', () => {
  const testPath =
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

  it('should render with default props', () => {
    render(<Icon path={testPath} />);

    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName).toBe('svg');
  });

  it('should render with correct SVG attributes', () => {
    render(<Icon path={testPath} />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('stroke-width', '1.5');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render with correct default classes', () => {
    render(<Icon path={testPath} />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('w-6', 'h-6', 'text-primary');
  });

  it('should render path element with correct attributes', () => {
    render(<Icon path={testPath} />);

    const icon = document.querySelector('svg');
    const path = icon?.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
    expect(path).toHaveAttribute('d', testPath);
  });

  it('should apply custom className', () => {
    render(<Icon path={testPath} className="custom-icon" />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('custom-icon');
  });

  it('should pass through other props', () => {
    render(<Icon path={testPath} data-testid="icon-element" id="test-icon" />);

    const icon = screen.getByTestId('icon-element');
    expect(icon).toHaveAttribute('id', 'test-icon');
  });

  it('should handle different path values', () => {
    const { rerender } = render(<Icon path="M1 1h22v22H1z" />);

    let icon = document.querySelector('svg');
    let path = icon?.querySelector('path');
    expect(path).toHaveAttribute('d', 'M1 1h22v22H1z');

    rerender(
      <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    );
    icon = document.querySelector('svg');
    path = icon?.querySelector('path');
    expect(path).toHaveAttribute(
      'd',
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'
    );
  });

  it('should handle empty path', () => {
    render(<Icon path="" />);

    const icon = document.querySelector('svg');
    const path = icon?.querySelector('path');
    expect(path).toHaveAttribute('d', '');
  });

  it('should override default attributes when provided', () => {
    render(
      <Icon path={testPath} viewBox="0 0 32 32" strokeWidth={2} stroke="red" />
    );

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('viewBox', '0 0 32 32');
    expect(icon).toHaveAttribute('stroke-width', '2');
    expect(icon).toHaveAttribute('stroke', 'red');
  });

  it('should handle custom fill attribute', () => {
    render(<Icon path={testPath} fill="currentColor" />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('fill', 'currentColor');
  });
});
