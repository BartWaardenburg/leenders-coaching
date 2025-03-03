import type { Metadata } from 'next';
import type { ContactPage } from '@/generated/graphql';
import { createPageComponent } from '@/utilities/page';

/* 
 * Create page component with type, fallback title, and optional wrapper
 */
const { getMetadata, PageComponent } = createPageComponent<ContactPage>(
  'contactPage',
  'Contact | Leenders Coaching'
);

/* Generate metadata from Sanity data */
export const generateMetadata = (): Promise<Metadata> => getMetadata();

/* Default export is the page component */
export default PageComponent;
