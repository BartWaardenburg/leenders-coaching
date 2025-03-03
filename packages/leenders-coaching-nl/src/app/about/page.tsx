import type { Metadata } from 'next';
import type { AboutPage } from '@/generated/graphql';
import { createPageComponent } from '@/utilities/page';

/* 
 * Create page component with type, fallback title, and optional wrapper
 */
const { getMetadata, PageComponent } = createPageComponent<AboutPage>(
  'aboutPage',
  'Over Mij | Leenders Coaching'
);

/* Generate metadata from Sanity data */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Default export is the page component */
export default PageComponent;
