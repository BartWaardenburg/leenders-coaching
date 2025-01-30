/**
 * Configuration for aria labels and other accessibility content
 */
export const ariaConfig = {
  toast: {
    closeButton: "Close notification",
  },
  modal: {
    closeButton: "Close modal",
  },
} as const;

export type AriaConfig = typeof ariaConfig;
