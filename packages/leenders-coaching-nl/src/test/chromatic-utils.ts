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
 * If reduced motion is active, returns immediately for faster tests.
 *
 * @param {object} options - Configuration options.
 * @param {Element | null | undefined} [options.element] - The element to wait for animations on (defaults to document.body).
 * @param {object} [options.canvas] - Optional canvas object from Storybook play function.
 * @param {number} [options.idle=50] - Idle time in ms before considering animations complete.
 * @param {number} [options.max=2000] - Maximum time to wait in ms.
 * @returns {Promise<void>} A promise that resolves when animations are finished.
 */
export const waitForMotionAnimations = async ({
  element,
  canvas,
  idle = 50,
  max = 2000,
}: {
  element?: Element | null;
  canvas?: { canvasElement?: Element } | { [key: string]: unknown };
  idle?: number;
  max?: number;
} = {}): Promise<void> => {
  // If reduced motion is active, don't wait.
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    // One frame so DOM can settle after interactions
    await new Promise((r) => requestAnimationFrame(r));
    return;
  }

  const targetElement =
    element ||
    (canvas &&
    'canvasElement' in canvas &&
    canvas.canvasElement instanceof Element
      ? canvas.canvasElement
      : null) ||
    document.body;

  if (targetElement) {
    // Fallback: wait until there are no running WAAPI animations for a brief idle.
    const deadline = performance.now() + max;
    let lastActive = performance.now();

    while (true) {
      const running = document.getAnimations
        ? document.getAnimations().filter((a) => a.playState === 'running')
        : [];

      if (running.length === 0) {
        if (performance.now() - lastActive >= idle) return;
      } else {
        lastActive = performance.now();
      }

      if (performance.now() > deadline) return;
      await new Promise((r) => setTimeout(r, 16));
    }
  }
};

/**
 * Waits for a specified duration, but respects reduced motion preferences.
 * If reduced motion is active, waits for a minimal time (16ms for one frame).
 * Otherwise, waits for the specified duration.
 *
 * @param {number} duration - Duration to wait in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the wait period.
 */
export const waitForAnimation = async (duration: number): Promise<void> => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    await new Promise((r) => requestAnimationFrame(r));
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, duration));
};
