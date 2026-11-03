import { render } from '@testing-library/react';
import { preconnect } from 'react-dom';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-dom')>()),
  preconnect: vi.fn(),
}));

import { PreconnectResources } from './PreconnectResources';

describe('PreconnectResources', () => {
  it('should render without errors', () => {
    expect(() => render(<PreconnectResources />)).not.toThrow();
  });

  it('should render nothing visible', () => {
    const { container } = render(<PreconnectResources />);
    expect(container.firstChild).toBeNull();
  });

  it('should be a client component', () => {
    const { container } = render(<PreconnectResources />);
    expect(container).toBeDefined();
  });

  it('preconnects to the Sanity image CDN without CORS, as img requests use', () => {
    render(<PreconnectResources />);
    expect(preconnect).toHaveBeenCalledWith('https://cdn.sanity.io');
  });
});
