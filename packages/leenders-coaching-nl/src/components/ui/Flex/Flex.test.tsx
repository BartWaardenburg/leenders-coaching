import { render, screen } from '@testing-library/react';
import { Flex } from './';
import { describe, it, expect } from 'vitest';

describe('Flex', () => {
  it('should render with default props', () => {
    render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass('flex');
  });

  it('should render with custom direction', () => {
    render(
      <Flex direction="column">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('flex-col');
  });

  it('should render with custom wrap', () => {
    render(
      <Flex wrap="wrap">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('flex-wrap');
  });

  it('should render with custom justify content', () => {
    render(
      <Flex justify="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('justify-center');
  });

  it('should render with custom align items', () => {
    render(
      <Flex items="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('items-center');
  });

  it('should render with custom gap', () => {
    render(
      <Flex gap={4}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('gap-4');
  });

  it('should apply custom className', () => {
    render(
      <Flex className="custom-flex">
        <div>Item 1</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass('custom-flex');
  });

  it('should render with all direction values', () => {
    const directions = [
      'row',
      'row-reverse',
      'column',
      'column-reverse',
    ] as const;

    directions.forEach((direction) => {
      const { unmount } = render(
        <Flex direction={direction}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByText('Item 1').closest('div')?.parentElement;
      expect(flex).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with all wrap values', () => {
    const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;

    wraps.forEach((wrap) => {
      const { unmount } = render(
        <Flex wrap={wrap}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByText('Item 1').closest('div')?.parentElement;
      expect(flex).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with all justify values', () => {
    const justifies = [
      'start',
      'end',
      'center',
      'between',
      'around',
      'evenly',
    ] as const;

    justifies.forEach((justify) => {
      const { unmount } = render(
        <Flex justify={justify}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByText('Item 1').closest('div')?.parentElement;
      expect(flex).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with all align items values', () => {
    const items = ['start', 'end', 'center', 'baseline', 'stretch'] as const;

    items.forEach((item) => {
      const { unmount } = render(
        <Flex items={item}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByText('Item 1').closest('div')?.parentElement;
      expect(flex).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with all gap values', () => {
    const gaps = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    ] as const;

    gaps.forEach((gap) => {
      const { unmount } = render(
        <Flex gap={gap}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      const flex = screen.getByText('Item 1').closest('div')?.parentElement;
      expect(flex).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with complex configuration', () => {
    render(
      <Flex
        direction="column"
        wrap="wrap"
        justify="between"
        items="center"
        gap={8}
        className="custom-flex"
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toHaveClass(
      'flex',
      'flex-col',
      'flex-wrap',
      'justify-between',
      'items-center',
      'gap-8',
      'custom-flex'
    );
  });

  it('should render with multiple children', () => {
    render(
      <Flex direction="row" gap={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </Flex>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('Item 4')).toBeInTheDocument();
    expect(screen.getByText('Item 5')).toBeInTheDocument();
  });

  it('should render with nested elements', () => {
    render(
      <Flex direction="column" gap={4}>
        <div>
          <h3>Title 1</h3>
          <p>Description 1</p>
        </div>
        <div>
          <h3>Title 2</h3>
          <p>Description 2</p>
        </div>
      </Flex>
    );

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<Flex direction="row" gap={2} />);

    const flex = document.querySelector('div');
    expect(flex).toBeInTheDocument();
  });

  it('should render with proper semantic structure', () => {
    render(
      <Flex direction="row" gap={2}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const flex = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(flex).toBeInTheDocument();
  });

  it('should handle edge cases', () => {
    render(
      <Flex direction="column" gap={0}>
        <div>Single item</div>
      </Flex>
    );

    expect(screen.getByText('Single item')).toBeInTheDocument();
  });
});
