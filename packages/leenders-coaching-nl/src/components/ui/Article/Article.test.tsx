import { render, screen } from '@testing-library/react';
import { Article } from './Article';
import { describe, it, expect, vi } from 'vitest';
import type { PortableTextBlock } from '@portabletext/react';

// Mock PortableText component
vi.mock('@/components/ui/PortableText', () => ({
  PortableText: ({ content }: { content: any }) => (
    <div data-testid="portable-text">{JSON.stringify(content)}</div>
  ),
}));

describe('Article', () => {
  const mockContent: PortableTextBlock[] = [
    {
      _type: 'block',
      _key: 'test-key',
      children: [{ _type: 'span', _key: 'test-span', text: 'Test content' }],
    },
  ] as PortableTextBlock[];

  it('should render as an article element', () => {
    render(<Article content={mockContent as any} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article.tagName).toBe('ARTICLE');
  });

  it('should render PortableText with content', () => {
    render(<Article content={mockContent as any} />);

    const portableText = screen.getByTestId('portable-text');
    expect(portableText).toBeInTheDocument();
    expect(portableText).toHaveTextContent(JSON.stringify(mockContent));
  });

  it('should apply default styles', () => {
    render(<Article content={mockContent as any} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('mx-auto', 'max-w-3xl');
  });

  it('should apply custom className', () => {
    render(<Article content={mockContent as any} className="custom-article" />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('custom-article');
  });

  it('should pass through other props', () => {
    render(
      <Article
        content={mockContent as any}
        data-testid="article-element"
        id="test-id"
      />
    );

    const article = screen.getByTestId('article-element');
    expect(article).toHaveAttribute('id', 'test-id');
  });

  it('should handle empty content array', () => {
    render(<Article content={[] as any} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    const portableText = screen.getByTestId('portable-text');
    expect(portableText).toHaveTextContent('[]');
  });

  it('should handle complex content structure', () => {
    const complexContent: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: 'block1',
        children: [{ _type: 'span', _key: 'span1', text: 'First paragraph' }],
      },
      {
        _type: 'block',
        _key: 'block2',
        children: [{ _type: 'span', _key: 'span2', text: 'Second paragraph' }],
      },
    ] as PortableTextBlock[];

    render(<Article content={complexContent as any} />);

    const portableText = screen.getByTestId('portable-text');
    expect(portableText).toHaveTextContent(JSON.stringify(complexContent));
  });
});
