import type { Metadata } from 'next';
import type { VoorwaardenPage } from '@/types/Page';
import { createPageComponent } from '@/utilities/page';

/*
 * Create page component with type, fallback title, and optional wrapper
 */
const { getMetadata, PageComponent } = createPageComponent<VoorwaardenPage>(
  'voorwaardenPage',
  'Voorwaarden'
);

/* Generate metadata from Sanity data */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Default export is the page component */
export default PageComponent;
