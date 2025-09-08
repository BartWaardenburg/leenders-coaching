import { render, screen, fireEvent } from '@testing-library/react';
import { Container } from './Container';
import { describe, it, expect, vi } from 'vitest';

/**
 * Test suite for Container component
 */
describe('Container', () => {
  it('should render as a div element', () => {
    render(<Container>Default container</Container>);

    const container = screen.getByText('Default container');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('DIV');
  });

  it('should apply default container styles', () => {
    render(<Container>Default container</Container>);

    const container = screen.getByText('Default container');
    expect(container).toHaveClass(
      'container',
      'mx-auto',
      'px-4',
      'sm:px-8',
      'md:px-12',
      'lg:px-16'
    );
  });

  it('should apply custom className', () => {
    render(<Container className="custom-class">Custom container</Container>);

    const container = screen.getByText('Custom container');
    expect(container).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    render(
      <Container data-testid="container-element" id="test-id">
        Container with props
      </Container>
    );

    const container = screen.getByTestId('container-element');
    expect(container).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
        <span>Child 3</span>
      </Container>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Container onClick={handleClick}>Clickable container</Container>);

    const container = screen.getByText('Clickable container');
    fireEvent.click(container);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle mouse events', () => {
    const handleMouseOver = vi.fn();
    const handleMouseOut = vi.fn();

    render(
      <Container onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        Interactive container
      </Container>
    );

    const container = screen.getByText('Interactive container');
    fireEvent.mouseOver(container);
    fireEvent.mouseOut(container);

    expect(handleMouseOver).toHaveBeenCalledTimes(1);
    expect(handleMouseOut).toHaveBeenCalledTimes(1);
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <Container tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
        Focusable container
      </Container>
    );

    const container = screen.getByText('Focusable container');
    fireEvent.focus(container);
    fireEvent.blur(container);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should pass through style prop', () => {
    render(
      <Container style={{ backgroundColor: 'red', color: 'white' }}>
        Styled container
      </Container>
    );

    const container = screen.getByText('Styled container');
    expect(container).toHaveStyle({ color: 'rgb(255, 255, 255)' });
  });

  it('should pass through data attributes', () => {
    render(
      <Container
        data-testid="test-container"
        data-custom="custom-value"
        data-number="123"
      >
        Data container
      </Container>
    );

    const container = screen.getByTestId('test-container');
    expect(container).toHaveAttribute('data-custom', 'custom-value');
    expect(container).toHaveAttribute('data-number', '123');
  });

  it('should render with no children', () => {
    render(<Container data-testid="empty-container" />);

    const container = screen.getByTestId('empty-container');
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  it('should render with complex nested children', () => {
    render(
      <Container>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Container>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should merge custom className with default classes', () => {
    render(
      <Container className="my-custom-class another-class">
        Merged classes
      </Container>
    );

    const container = screen.getByText('Merged classes');
    expect(container).toHaveClass(
      'container',
      'mx-auto',
      'px-4',
      'my-custom-class',
      'another-class'
    );
  });

  it('should handle aria attributes', () => {
    render(
      <Container
        role="main"
        aria-label="Main content"
        aria-describedby="description"
      >
        Accessible container
      </Container>
    );

    const container = screen.getByText('Accessible container');
    expect(container).toHaveAttribute('role', 'main');
    expect(container).toHaveAttribute('aria-label', 'Main content');
    expect(container).toHaveAttribute('aria-describedby', 'description');
  });
});
