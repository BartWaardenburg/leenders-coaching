import type { Metadata } from 'next';
import type { CoachingPage } from '@/types/Page';
import { createPageComponent } from '@/utilities/page';

/**
 * Create page component with type, fallback title, and optional wrapper
 * Uses the generic page component utility which handles:
 * - Standard page metadata generation
 * - OpenGraph images and structured data
 * - Sanity CMS data integration
 */
const { getMetadata, PageComponent } = createPageComponent<CoachingPage>(
  'coachingPage',
  'Coaching'
);

/**
 * Generate metadata from Sanity data
 * The generic page component utility handles all metadata generation automatically
 */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Default export is the page component */
export default PageComponent;
