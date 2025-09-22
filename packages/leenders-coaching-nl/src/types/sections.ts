import type { PastelVariant } from '@/utilities/tokens';

/**
 * Base interface for all section types
 */
export interface Section {
  _key?: string;
  _type: string;
  title?: string;
  displayTitle?: string;
  background?: PastelVariant;
  showBorder?: boolean;
  description?: string;
}
