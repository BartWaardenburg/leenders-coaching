import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { describe, it, expect, vi } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, fill, className, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-fill={fill}
      {...props}
    />
  ),
}));

// Mock SanityImage component
vi.mock('@/components/ui/Image', () => ({
  SanityImage: ({ image, alt, fill, className, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`sanity-image-${image?.asset?._ref || 'default'}`}
      alt={alt}
      className={className}
      data-fill={fill}
      data-sanity-image="true"
      {...props}
    />
  ),
}));

describe('Avatar', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test avatar',
  };

  it('should render with default props', () => {
    render(<Avatar {...defaultProps} />);

    const avatar = screen.getByAltText('Test avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Avatar {...defaultProps} size="sm" />);

    let avatar = screen.getByAltText('Test avatar');
    let container = avatar.closest('div');
    expect(container).toHaveStyle({ width: '32px', height: '32px' });

    rerender(<Avatar {...defaultProps} size="md" />);
    avatar = screen.getByAltText('Test avatar');
    container = avatar.closest('div');
    expect(container).toHaveStyle({ width: '48px', height: '48px' });

    rerender(<Avatar {...defaultProps} size="lg" />);
    avatar = screen.getByAltText('Test avatar');
    container = avatar.closest('div');
    expect(container).toHaveStyle({ width: '84px', height: '84px' });
  });

  it('should render with fill size', () => {
    render(<Avatar {...defaultProps} size="fill" />);

    const avatar = screen.getByAltText('Test avatar');
    const container = avatar.closest('div');
    expect(container).toHaveClass('w-full', 'h-full');
    expect(container).not.toHaveStyle({ width: '32px', height: '32px' });
  });

  it('should apply default styles', () => {
    render(<Avatar {...defaultProps} />);

    const avatar = screen.getByAltText('Test avatar');
    const container = avatar.closest('div');
    expect(container).toHaveClass('relative', 'border', 'border-foreground/80');
  });

  it('should apply custom className', () => {
    render(<Avatar {...defaultProps} className="custom-avatar" />);

    const avatar = screen.getByAltText('Test avatar');
    const container = avatar.closest('div');
    expect(container).toHaveClass('custom-avatar');
  });

  it('should pass through other props to Image', () => {
    render(<Avatar {...defaultProps} data-testid="avatar-image" priority />);

    const avatar = screen.getByTestId('avatar-image');
    expect(avatar).toHaveAttribute('data-fill', 'true');
  });

  it('should render Image with correct props', () => {
    render(<Avatar {...defaultProps} />);

    const avatar = screen.getByAltText('Test avatar');
    expect(avatar).toHaveAttribute('data-fill', 'true');
    expect(avatar).toHaveClass('object-cover');
  });

  it('should handle different image sources', () => {
    const { rerender } = render(<Avatar src="/image1.jpg" alt="Avatar 1" />);

    let avatar = screen.getByAltText('Avatar 1');
    expect(avatar).toHaveAttribute('src', '/image1.jpg');

    rerender(<Avatar src="/image2.jpg" alt="Avatar 2" />);
    avatar = screen.getByAltText('Avatar 2');
    expect(avatar).toHaveAttribute('src', '/image2.jpg');
  });

  it('should handle different alt texts', () => {
    const { rerender } = render(<Avatar src="/test.jpg" alt="First alt" />);

    let avatar = screen.getByAltText('First alt');
    expect(avatar).toBeInTheDocument();

    rerender(<Avatar src="/test.jpg" alt="Second alt" />);
    avatar = screen.getByAltText('Second alt');
    expect(avatar).toBeInTheDocument();
  });

  it('should handle Sanity image objects', () => {
    const sanityImage = {
      _type: 'image',
      asset: { _ref: 'image-123', _type: 'reference' },
    };

    render(<Avatar src={sanityImage} alt="Sanity avatar" />);

    const avatar = screen.getByAltText('Sanity avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'sanity-image-image-123');
    expect(avatar).toHaveAttribute('data-sanity-image', 'true');
  });

  it('should show fallback when no src is provided', () => {
    render(<Avatar alt="Fallback avatar" />);

    const fallback = screen.getByText('F');
    expect(fallback).toBeInTheDocument();
    expect(fallback.closest('div')).toHaveClass(
      'bg-muted',
      'text-muted-foreground'
    );
  });
});
