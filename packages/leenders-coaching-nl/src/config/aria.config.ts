/**
 * Configuration for aria labels and other accessibility content
 */
export const ariaConfig = {
  toast: {
    closeButton: 'Sluiten',
  },
  modal: {
    closeButton: 'Sluiten',
  },
  calendar: {
    previousMonth: 'Vorige maand',
    nextMonth: 'Volgende maand',
  },
} as const;

export type AriaConfig = typeof ariaConfig;
