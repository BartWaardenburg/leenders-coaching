import { render, screen, fireEvent } from '@testing-library/react';
import { Box } from './Box';
import { describe, it, expect, vi } from 'vitest';

/**
 * Test suite for Box component
 */
describe('Box', () => {
  it('should render as a div by default', () => {
    render(<Box>Default box</Box>);

    const box = screen.getByText('Default box');
    expect(box).toBeInTheDocument();
    expect(box.tagName).toBe('DIV');
  });

  it('should render with custom element using as prop', () => {
    render(<Box as="span">Span box</Box>);

    const box = screen.getByText('Span box');
    expect(box.tagName).toBe('SPAN');
  });

  it('should render with section element', () => {
    render(<Box as="section">Section box</Box>);

    const box = screen.getByText('Section box');
    expect(box.tagName).toBe('SECTION');
  });

  it('should render with article element', () => {
    render(<Box as="article">Article box</Box>);

    const box = screen.getByText('Article box');
    expect(box.tagName).toBe('ARTICLE');
  });

  it('should render with header element', () => {
    render(<Box as="header">Header box</Box>);

    const box = screen.getByText('Header box');
    expect(box.tagName).toBe('HEADER');
  });

  it('should render with footer element', () => {
    render(<Box as="footer">Footer box</Box>);

    const box = screen.getByText('Footer box');
    expect(box.tagName).toBe('FOOTER');
  });

  it('should render with main element', () => {
    render(<Box as="main">Main box</Box>);

    const box = screen.getByText('Main box');
    expect(box.tagName).toBe('MAIN');
  });

  it('should render with nav element', () => {
    render(<Box as="nav">Nav box</Box>);

    const box = screen.getByText('Nav box');
    expect(box.tagName).toBe('NAV');
  });

  it('should render with aside element', () => {
    render(<Box as="aside">Aside box</Box>);

    const box = screen.getByText('Aside box');
    expect(box.tagName).toBe('ASIDE');
  });

  it('should apply className', () => {
    render(<Box className="custom-class">Styled box</Box>);

    const box = screen.getByText('Styled box');
    expect(box).toHaveClass('custom-class');
  });

  it('should apply multiple classes', () => {
    render(<Box className="class1 class2 class3">Multi-class box</Box>);

    const box = screen.getByText('Multi-class box');
    expect(box).toHaveClass('class1', 'class2', 'class3');
  });

  it('should pass through other props', () => {
    render(
      <Box
        data-testid="box-element"
        id="test-id"
        role="banner"
        aria-label="Test box"
      >
        Box with props
      </Box>
    );

    const box = screen.getByTestId('box-element');
    expect(box).toHaveAttribute('id', 'test-id');
    expect(box).toHaveAttribute('role', 'banner');
    expect(box).toHaveAttribute('aria-label', 'Test box');
  });

  it('should render children correctly', () => {
    render(
      <Box>
        <span>Box with</span>
        <strong>multiple children</strong>
        <div>and nested elements</div>
      </Box>
    );

    const box = screen.getByText('Box with');
    expect(box).toBeInTheDocument();
    expect(screen.getByText('multiple children')).toBeInTheDocument();
    expect(screen.getByText('and nested elements')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Box onClick={handleClick}>Clickable box</Box>);

    const box = screen.getByText('Clickable box');
    fireEvent.click(box);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle mouse events', () => {
    const handleMouseOver = vi.fn();
    const handleMouseOut = vi.fn();

    render(
      <Box onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Interactive box
      </Box>
    );

    const box = screen.getByText('Interactive box');
    fireEvent.mouseOver(box);
    fireEvent.mouseOut(box);

    expect(handleMouseOver).toHaveBeenCalledTimes(1);
    expect(handleMouseOut).toHaveBeenCalledTimes(1);
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <Box tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
        Focusable box
      </Box>
    );

    const box = screen.getByText('Focusable box');
    fireEvent.focus(box);
    fireEvent.blur(box);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should render with different HTML elements', () => {
    const elements = [
      'div',
      'span',
      'section',
      'article',
      'header',
      'footer',
      'main',
      'nav',
      'aside',
    ] as const;

    elements.forEach((element) => {
      const { unmount } = render(<Box as={element}>{element} box</Box>);

      const box = screen.getByText(`${element} box`);
      expect(box.tagName).toBe(element.toUpperCase());

      unmount();
    });
  });

  it('should pass through style prop', () => {
    render(
      <Box style={{ backgroundColor: 'red', color: 'white' }}>Styled box</Box>
    );

    const box = screen.getByText('Styled box');
    expect(box).toHaveStyle({ color: 'rgb(255, 255, 255)' });
  });

  it('should pass through data attributes', () => {
    render(
      <Box data-testid="test-box" data-custom="custom-value" data-number="123">
        Data box
      </Box>
    );

    const box = screen.getByTestId('test-box');
    expect(box).toHaveAttribute('data-custom', 'custom-value');
    expect(box).toHaveAttribute('data-number', '123');
  });

  it('should render with no children', () => {
    render(<Box data-testid="empty-box" />);

    const box = screen.getByTestId('empty-box');
    expect(box).toBeInTheDocument();
    expect(box).toBeEmptyDOMElement();
  });

  it('should render with complex nested children', () => {
    render(
      <Box>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Box>
    );

    const box = screen.getByText('Title');
    expect(box).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
