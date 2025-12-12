'use client';

import type { ViewTransitionProps } from 'react';
import { ViewTransition as ReactViewTransition } from 'react';

/**
 * Wrapper component for React's experimental ViewTransition API.
 * Provides smooth transitions for elements between pages and component state changes.
 *
 * Key features:
 * - Automatic view-transition-name assignment with name="auto"
 * - CSS class management for enter, exit, update, and share animations
 * - Callback support for animation lifecycle events
 * - Shared element transitions between components with the same name
 * - Optional disabled prop to render children without ViewTransition wrapper
 *
 * @param props - ViewTransition props including animation classes, callbacks, and configuration
 * @returns A ViewTransition component with smooth element animations
 */
export const ViewTransition = ({
  name = 'auto',
  disabled = false,
  ...props
}: ViewTransitionProps & { disabled?: boolean }) => {
  if (!ReactViewTransition || disabled) {
    return <>{props.children}</>;
  }

  return (
    <ReactViewTransition name={name} {...props}>
      {props.children}
    </ReactViewTransition>
  );
};
