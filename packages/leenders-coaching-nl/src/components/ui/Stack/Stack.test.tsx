import { render, screen, fireEvent } from '@testing-library/react';
import { Stack } from './Stack';
import { describe, it, expect, vi } from 'vitest';

/**
 * Test suite for Stack component
 */
describe('Stack', () => {
  it('should render as a div by default', () => {
    render(<Stack>Default stack</Stack>);

    const stack = screen.getByText('Default stack');
    expect(stack).toBeInTheDocument();
    expect(stack.tagName).toBe('DIV');
  });

  it('should apply default direction and justify styles', () => {
    render(<Stack>Default stack</Stack>);

    const stack = screen.getByText('Default stack');
    expect(stack).toHaveClass('flex', 'flex-col', 'w-full', 'justify-start');
  });

  it('should apply column direction correctly', () => {
    render(<Stack direction="col">Column stack</Stack>);

    const stack = screen.getByText('Column stack');
    expect(stack).toHaveClass('flex-col');
    expect(stack).not.toHaveClass('flex-row');
  });

  it('should apply row direction correctly', () => {
    render(<Stack direction="row">Row stack</Stack>);

    const stack = screen.getByText('Row stack');
    expect(stack).toHaveClass('flex-row');
    expect(stack).not.toHaveClass('flex-col');
  });

  it('should apply justify styles correctly', () => {
    const { rerender } = render(<Stack justify="start">Start justified</Stack>);

    let stack = screen.getByText('Start justified');
    expect(stack).toHaveClass('justify-start');

    rerender(<Stack justify="end">End justified</Stack>);
    stack = screen.getByText('End justified');
    expect(stack).toHaveClass('justify-end');

    rerender(<Stack justify="center">Center justified</Stack>);
    stack = screen.getByText('Center justified');
    expect(stack).toHaveClass('justify-center');

    rerender(<Stack justify="between">Between justified</Stack>);
    stack = screen.getByText('Between justified');
    expect(stack).toHaveClass('justify-between');

    rerender(<Stack justify="around">Around justified</Stack>);
    stack = screen.getByText('Around justified');
    expect(stack).toHaveClass('justify-around');

    rerender(<Stack justify="evenly">Evenly justified</Stack>);
    stack = screen.getByText('Evenly justified');
    expect(stack).toHaveClass('justify-evenly');
  });

  it('should apply gap styles correctly', () => {
    const { rerender } = render(<Stack gap={2}>Gap 2</Stack>);

    let stack = screen.getByText('Gap 2');
    expect(stack).toHaveClass('gap-2');

    rerender(<Stack gap={4}>Gap 4</Stack>);
    stack = screen.getByText('Gap 4');
    expect(stack).toHaveClass('gap-4');

    rerender(<Stack gap={8}>Gap 8</Stack>);
    stack = screen.getByText('Gap 8');
    expect(stack).toHaveClass('gap-8');
  });

  it('should apply space styles correctly for column direction', () => {
    const { rerender } = render(<Stack space={2}>Space 2</Stack>);

    let stack = screen.getByText('Space 2');
    expect(stack).toHaveClass('space-y-2');

    rerender(<Stack space={4}>Space 4</Stack>);
    stack = screen.getByText('Space 4');
    expect(stack).toHaveClass('space-y-4');

    rerender(<Stack space="px">Space px</Stack>);
    stack = screen.getByText('Space px');
    expect(stack).toHaveClass('space-y-px');
  });

  it('should apply space styles correctly for row direction', () => {
    const { rerender } = render(
      <Stack direction="row" space={2}>
        Row space 2
      </Stack>
    );

    let stack = screen.getByText('Row space 2');
    expect(stack).toHaveClass('space-x-2');

    rerender(
      <Stack direction="row" space={4}>
        Row space 4
      </Stack>
    );
    stack = screen.getByText('Row space 4');
    expect(stack).toHaveClass('space-x-4');

    rerender(
      <Stack direction="row" space="px">
        Row space px
      </Stack>
    );
    stack = screen.getByText('Row space px');
    expect(stack).toHaveClass('space-x-px');
  });

  it('should apply custom className', () => {
    render(<Stack className="custom-class">Custom stack</Stack>);

    const stack = screen.getByText('Custom stack');
    expect(stack).toHaveClass('custom-class');
  });

  it('should pass through other props', () => {
    render(
      <Stack data-testid="stack-element" id="test-id">
        Stack with props
      </Stack>
    );

    const stack = screen.getByTestId('stack-element');
    expect(stack).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );

    const stack = screen.getByText('Item 1');
    expect(stack).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should apply all space values correctly', () => {
    const spaceValues = [0, 1, 2, 3, 4, 'px'] as const;

    spaceValues.forEach((space) => {
      const { unmount } = render(<Stack space={space}>Space {space}</Stack>);

      const stack = screen.getByText(`Space ${space}`);
      expect(stack).toBeInTheDocument();

      unmount();
    });
  });

  it('should apply all justify values correctly', () => {
    const justifyValues = [
      'start',
      'end',
      'center',
      'between',
      'around',
      'evenly',
    ] as const;

    justifyValues.forEach((justify) => {
      const { unmount } = render(
        <Stack justify={justify}>{justify} justified</Stack>
      );

      const stack = screen.getByText(`${justify} justified`);
      expect(stack).toBeInTheDocument();

      unmount();
    });
  });

  it('should handle both gap and space props', () => {
    render(
      <Stack gap={4} space={2}>
        Both gap and space
      </Stack>
    );

    const stack = screen.getByText('Both gap and space');
    expect(stack).toHaveClass('gap-4', 'space-y-2');
  });

  it('should handle complex combinations of props', () => {
    render(
      <Stack
        direction="row"
        justify="center"
        gap={6}
        space={3}
        className="custom-stack"
        data-testid="complex-stack"
      >
        Complex stack
      </Stack>
    );

    const stack = screen.getByTestId('complex-stack');
    expect(stack).toHaveClass(
      'flex-row',
      'justify-center',
      'gap-6',
      'space-x-3',
      'custom-stack'
    );
  });

  it('should render with no children', () => {
    render(<Stack data-testid="empty-stack">{null}</Stack>);

    const stack = screen.getByTestId('empty-stack');
    expect(stack).toBeInTheDocument();
    expect(stack).toBeEmptyDOMElement();
  });

  it('should render with nested stacks', () => {
    render(
      <Stack space={4}>
        <div>Outer item 1</div>
        <Stack direction="row" gap={2}>
          <div>Inner item 1</div>
          <div>Inner item 2</div>
        </Stack>
        <div>Outer item 2</div>
      </Stack>
    );

    expect(screen.getByText('Outer item 1')).toBeInTheDocument();
    expect(screen.getByText('Inner item 1')).toBeInTheDocument();
    expect(screen.getByText('Inner item 2')).toBeInTheDocument();
    expect(screen.getByText('Outer item 2')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Stack onClick={handleClick}>Clickable stack</Stack>);

    const stack = screen.getByText('Clickable stack');
    fireEvent.click(stack);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
