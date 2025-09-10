/**
 * Waits for the next animation frame.
 * Useful for letting Motion schedule WAAPI animations.
 *
 * @returns {Promise<void>} A promise that resolves on the next animation frame.
 */
export const nextFrame = (): Promise<void> =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Waits for Motion animations on a specific element and its subtree to complete.
 *
 * @param {Element | null} elem - The element to check for animations.
 * @param {number} [timeout=1000] - Maximum time to wait in milliseconds.
 * @returns {Promise<void>} A promise that resolves when animations are finished or timeout occurs.
 */
export const waitForMotion = async (
  elem: Element | null,
  timeout = 1000
): Promise<void> => {
  if (!elem) return;

  /* Collect animations on elem and its children */
  const all = [...elem.getAnimations({ subtree: true })];

  if (all.length === 0) {
    /* Give Motion a frame to schedule animations if none are found yet */
    await nextFrame();
    return;
  }

  /* Wait for all animations to finish, but respect the timeout */
  try {
    await Promise.race([
      Promise.allSettled(all.map((a) => a.finished)),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Animation timeout')), timeout)
      ),
    ]);
  } catch {
    /* If timeout occurs, just continue - animations might be CSS-only */
    console.warn('Animation timeout, continuing...');
  }
};

/**
 * Waits for Motion animations to complete using the Web Animations API.
 * This is the recommended approach for Motion components.
 *
 * @param {object} options - Configuration options.
 * @param {Element | null | undefined} [options.element] - The element to wait for animations on (defaults to document.body).
 * @param {object} [options.canvas] - Optional canvas object from Storybook play function.
 * @returns {Promise<void>} A promise that resolves when animations are finished.
 */
export const waitForMotionAnimations = async ({
  element,
  canvas,
}: {
  element?: Element | null;
  canvas?: { canvasElement?: Element } | { [key: string]: unknown };
} = {}): Promise<void> => {
  const targetElement =
    element ||
    (canvas &&
    'canvasElement' in canvas &&
    canvas.canvasElement instanceof Element
      ? canvas.canvasElement
      : null) ||
    document.body;

  if (targetElement) {
    await waitForMotion(targetElement);
  }
};
