import type { Metadata } from 'next';
import type { HomePage } from '@/types/Page';
import { createPageComponent } from '@/utilities/page';

/* Disable caching in preview mode */
export const revalidate = 0;

/*
 * Create page component with type, fallback title, and optional wrapper
 */
const { getMetadata, PageComponent } = createPageComponent<HomePage>(
  'homePage',
  'Leenders Coaching'
);

/**
 * Generate metadata from Sanity data
 */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Default export is the page component */
export default PageComponent;
