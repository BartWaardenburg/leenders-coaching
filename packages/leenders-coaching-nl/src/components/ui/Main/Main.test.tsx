import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { describe, it, expect } from 'vitest';

describe('Main', () => {
  it('should render as a main element', () => {
    render(<Main>Main content</Main>);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.tagName).toBe('MAIN');
  });

  it('should apply default styles', () => {
    render(<Main>Main content</Main>);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-grow', 'mt-[125px]');
  });

  it('should apply custom className', () => {
    render(<Main className="custom-main">Main content</Main>);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('custom-main');
  });

  it('should pass through other props', () => {
    render(
      <Main data-testid="main-element" id="test-id">
        Main content
      </Main>
    );

    const main = screen.getByTestId('main-element');
    expect(main).toHaveAttribute('id', 'test-id');
  });

  it('should render children correctly', () => {
    render(
      <Main>
        <span>Main with</span>
        <strong>multiple children</strong>
      </Main>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveTextContent('Main with');
    expect(main).toHaveTextContent('multiple children');
  });

  it('should have correct flex direction', () => {
    render(<Main>Main content</Main>);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-col');
  });
});
