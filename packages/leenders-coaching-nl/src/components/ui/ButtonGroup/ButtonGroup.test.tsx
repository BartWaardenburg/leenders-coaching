import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';
import { describe, it, expect } from 'vitest';

describe('ButtonGroup', () => {
  it('should render with default props', () => {
    render(
      <ButtonGroup>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <ButtonGroup>
        <button>First Button</button>
        <button>Second Button</button>
        <button>Third Button</button>
      </ButtonGroup>
    );

    expect(screen.getByText('First Button')).toBeInTheDocument();
    expect(screen.getByText('Second Button')).toBeInTheDocument();
    expect(screen.getByText('Third Button')).toBeInTheDocument();
  });

  it('should apply default styles', () => {
    render(
      <ButtonGroup>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('justify-center', 'w-auto', 'sm:flex-row');
  });

  it('should apply custom className', () => {
    render(
      <ButtonGroup className="custom-group">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('custom-group');
  });

  it('should pass through other props', () => {
    render(
      <ButtonGroup data-testid="button-group" id="test-id">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByTestId('button-group');
    expect(buttonGroup).toHaveAttribute('id', 'test-id');
  });

  it('should handle stackOnMobile prop', () => {
    const { rerender } = render(
      <ButtonGroup stackOnMobile={true}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    let buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('flex-col', 'sm:flex-row');

    rerender(
      <ButtonGroup stackOnMobile={false}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('flex-row');
    expect(buttonGroup).not.toHaveClass('sm:flex-row');
  });

  it('should handle justify prop with string value', () => {
    const { rerender } = render(
      <ButtonGroup justify="start">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    let buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('justify-start');

    rerender(
      <ButtonGroup justify="end">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('justify-end');
  });

  it('should handle justify prop with responsive values', () => {
    render(
      <ButtonGroup justify={{ base: 'start', md: 'center', lg: 'end' }}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass(
      'justify-start',
      'md:justify-center',
      'lg:justify-end'
    );
  });

  it('should handle width prop with string value', () => {
    const { rerender } = render(
      <ButtonGroup width="full">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    let buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('w-full');

    rerender(
      <ButtonGroup width="auto">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('w-auto');
  });

  it('should handle width prop with responsive values', () => {
    render(
      <ButtonGroup width={{ base: 'auto', md: 'full' }}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('w-auto', 'md:w-full');
  });

  it('should handle flex prop', () => {
    const { rerender } = render(
      <ButtonGroup flex={true}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    let buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass('flex');

    rerender(
      <ButtonGroup flex={false}>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    buttonGroup = screen.getByText('Button 1').closest('div');
    // Flex component always applies 'flex' class, so it should always be present
    expect(buttonGroup).toHaveClass('flex');
  });

  it('should handle complex responsive props', () => {
    render(
      <ButtonGroup
        justify={{ base: 'start', sm: 'center', lg: 'end' }}
        width={{ base: 'auto', md: 'full' }}
        stackOnMobile={false}
        flex={true}
        className="custom-class"
      >
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    const buttonGroup = screen.getByText('Button 1').closest('div');
    expect(buttonGroup).toHaveClass(
      'justify-start',
      'sm:justify-center',
      'lg:justify-end',
      'w-auto',
      'md:w-full',
      'flex-row',
      'flex',
      'custom-class'
    );
  });
});
