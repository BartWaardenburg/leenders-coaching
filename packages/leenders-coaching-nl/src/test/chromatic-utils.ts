import { expect, waitFor, screen } from 'storybook/test';

/**
 * A thin "query API" that works with either Storybook's `canvas` or global `screen`.
 * Pass `canvas` from play(): e.g. `const q = queries(canvas)`.
 */
export const queries = (q?: typeof screen) => q ?? screen;

/**
 * Wait until all images matching `selector` are fully loaded (no broken images).
 * Chromatic already waits for resources, but this can help with custom loaders.
 * @see https://www.chromatic.com/docs/resource-loading/
 */
export async function waitForImagesToLoad(
  selector = 'img',
  timeout = 5000,
  q?: typeof screen
) {
  const query = queries(q);
  await waitFor(
    () => {
      const imgs: HTMLImageElement[] = Array.from(
        (query as typeof screen & { container?: HTMLElement }).container
          ? (
              query as typeof screen & { container: HTMLElement }
            ).container.querySelectorAll(selector)
          : document.querySelectorAll(selector)
      ) as HTMLImageElement[];

      if (imgs.length === 0) return; // no images is fine
      const anyPending = imgs.some(
        (img) => !img.complete || img.naturalWidth === 0
      );
      expect(anyPending).toBe(false);
    },
    { timeout }
  );
}

/**
 * Wait for animation completion using a data attribute you set when the animation finishes.
 * Recommended approach for JS-driven animations (e.g., Framer Motion).
 * @see https://www.chromatic.com/docs/animations/#use-a-play-function-to-wait-for-animations-to-complete
 */
export async function waitForAnimationsToComplete(
  {
    testId = 'animated-element',
    attribute = 'data-animation',
    doneValue = 'complete',
    timeout = 5000,
  }: {
    testId?: string;
    attribute?: string;
    doneValue?: string;
    timeout?: number;
  },
  q?: typeof screen | { queryAllByTestId?: typeof screen.queryAllByTestId }
) {
  await waitFor(
    () => {
      const nodes = q?.queryAllByTestId
        ? q.queryAllByTestId(testId)
        : screen.queryAllByTestId(testId);

      expect(nodes.length).toBeGreaterThan(0);

      nodes.forEach((el: HTMLElement) => {
        expect(el).toHaveAttribute(attribute, doneValue);
      });
    },
    { timeout }
  );
}

/**
 * Wait for an element (by role) to be visible.
 * Prefer semantic queries over CSS selectors.
 */
export async function waitForRoleVisible(
  q: typeof screen,
  role: Parameters<typeof screen.findByRole>[0],
  options?: Parameters<typeof screen.findByRole>[1],
  timeout = 3000
) {
  const el = await q.findByRole(role, options, { timeout });
  await expect(el).toBeVisible();
  return el;
}

/**
 * Wait for specific text to appear (case-insensitive by default via RegExp).
 */
export async function waitForText(
  q: typeof screen,
  text: string | RegExp,
  timeout = 3000
) {
  const matcher = typeof text === 'string' ? new RegExp(text, 'i') : text;
  const el = await q.findByText(matcher, undefined, { timeout });
  await expect(el).toBeInTheDocument();
  return el;
}

/**
 * Convenience: run a user-defined interaction, then ensure the UI is "stable".
 * - optional images loaded
 * - optional animations complete
 * Rely on Chromatic's pause/delay where possible; this is an extra safety net.
 */
export async function interactThenStabilize(
  q: typeof screen,
  interact: () => Promise<void> | void,
  options?: {
    waitImages?: boolean | { selector?: string; timeout?: number };
    waitAnimations?:
      | boolean
      | {
          testId?: string;
          attribute?: string;
          doneValue?: string;
          timeout?: number;
        };
  }
) {
  await interact();

  if (options?.waitImages) {
    const cfg = options.waitImages === true ? {} : options.waitImages;
    await waitForImagesToLoad(cfg?.selector, cfg?.timeout, q);
  }

  if (options?.waitAnimations) {
    const cfg = options.waitAnimations === true ? {} : options.waitAnimations;
    await waitForAnimationsToComplete(cfg, q);
  }
}

/**
 * Very small utility to yield a couple of RAFs – sometimes useful after complex layout thrashes.
 * Prefer assertions-based waits first; use this sparingly.
 */
export async function settleFrames(count = 2) {
  for (let i = 0; i < count; i++) {
    await new Promise(requestAnimationFrame);
  }
}

/**
 * Simple delay function for backward compatibility with existing stories.
 * Prefer assertions-based waits first; use this sparingly.
 * @deprecated Use settleFrames() or assertions-based waits instead
 */
export const waitForAnimations = async (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
