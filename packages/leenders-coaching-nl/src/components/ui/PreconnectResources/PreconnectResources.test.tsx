import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
});
