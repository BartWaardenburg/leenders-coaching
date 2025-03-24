/**
 * Base interface for all section types
 */
export interface Section {
  _key?: string;
  _type: string;
  title?: string;
  displayTitle?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  showBorder?: boolean;
  description?: string;
}
