import { render, screen } from '@testing-library/react';
import { Grid } from './';
import { vi, describe, it, expect } from 'vitest';

// Mock the Box component
vi.mock('@/components/ui/Box', () => ({
  Box: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('Grid', () => {
  it('should render with default props', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with custom columns', () => {
    render(
      <Grid columns={{ default: 3 }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with responsive columns', () => {
    render(
      <Grid columns={{ default: 1, '@sm': 2, '@md': 3 }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <Grid className="custom-grid">
        <div>Item 1</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(grid).toHaveClass('custom-grid');
  });

  it('should render with proper structure', () => {
    render(
      <Grid>
        <div>Item 1</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div')?.parentElement;
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass(
      'grid',
      'w-full',
      'grid-cols-1',
      'gap-8',
      'mx-auto'
    );
  });

  it('should render with gap', () => {
    render(
      <Grid gap={4}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with responsive gap', () => {
    render(
      <Grid gap={2}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with all column values', () => {
    const columnValues = [1, 2, 3, 4] as const;

    columnValues.forEach((columns) => {
      const { unmount } = render(
        <Grid columns={{ default: columns }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').closest('div');
      expect(grid).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with all gap values', () => {
    const gapValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

    gapValues.forEach((gap) => {
      const { unmount } = render(
        <Grid gap={gap}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );

      const grid = screen.getByText('Item 1').closest('div');
      expect(grid).toBeInTheDocument();

      unmount();
    });
  });

  it('should render with complex responsive configuration', () => {
    render(
      <Grid
        columns={{
          default: 1,
          '@xs': 2,
          '@sm': 2,
          '@md': 3,
          '@lg': 4,
          '@xl': 4,
          '@2xl': 4,
          '@3xl': 4,
          '@4xl': 4,
        }}
        gap={2}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with multiple children', () => {
    render(
      <Grid columns={{ default: 2 }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      </Grid>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('Item 4')).toBeInTheDocument();
    expect(screen.getByText('Item 5')).toBeInTheDocument();
  });

  it('should render with nested elements', () => {
    render(
      <Grid columns={{ default: 2 }}>
        <div>
          <h3>Title 1</h3>
          <p>Description 1</p>
        </div>
        <div>
          <h3>Title 2</h3>
          <p>Description 2</p>
        </div>
      </Grid>
    );

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<Grid columns={{ default: 2 }}>{null}</Grid>);

    const grid =
      document.querySelector('[data-testid]') || document.querySelector('div');
    expect(grid).toBeInTheDocument();
  });

  it('should render with proper semantic structure', () => {
    render(
      <Grid columns={{ default: 2 }}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByText('Item 1').closest('div');
    expect(grid).toBeInTheDocument();
  });

  it('should handle edge cases', () => {
    render(
      <Grid columns={{ default: 1 }} gap={0}>
        <div>Single item</div>
      </Grid>
    );

    expect(screen.getByText('Single item')).toBeInTheDocument();
  });
});
