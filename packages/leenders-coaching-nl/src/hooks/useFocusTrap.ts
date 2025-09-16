import { useEffect } from 'react';

/**
 * Hook for implementing focus trap functionality in modals and overlays.
 * Traps focus within a container and restores focus to a specified element when closed.
 *
 * @param active - Whether the focus trap should be active
 * @param containerRef - Ref to the container element that should trap focus
 * @param returnTo - Element to restore focus to when trap is deactivated (optional)
 */
export function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  returnTo?: HTMLElement | null
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const root = containerRef.current;
    const prev = (document.activeElement as HTMLElement) || null;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href],button,[tabindex]:not([tabindex="-1"]),input,select,textarea'
        )
      ).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
      );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = getFocusables();
      if (!f.length) return;
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first && last) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last && first) {
        e.preventDefault();
        first.focus();
      }
    };

    // Focus first focusable element, fallback to container if none exist
    const f = getFocusables();
    (f[0] ?? root).focus();

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      (returnTo ?? prev)?.focus?.();
    };
  }, [active, containerRef, returnTo]);
}
