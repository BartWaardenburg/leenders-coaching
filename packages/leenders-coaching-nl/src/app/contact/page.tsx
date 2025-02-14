import type { Metadata } from 'next';
import { SectionForm } from '@/components/sections/SectionForm';

/**
 * Fetches data for the Contact page
 */
const getContactPageData = async () => {
  // TODO: Implement data fetching
  return null;
};

/**
 * Generates metadata for the Contact page
 */
export async function generateMetadata(): Promise<Metadata> {
  await getContactPageData();
  return {
    title: 'Contact | Leenders Coaching',
    description: 'Neem contact op met Leenders Coaching',
  };
}

/**
 * Contact page component
 */
export default async function ContactPage() {
  await getContactPageData();
  return (
    <main>
      <SectionForm
        title="Contact"
        description="Heb je een vraag of wil je een afspraak maken? Vul het formulier in en ik neem zo snel mogelijk contact met je op."
        submitLabel="Verstuur bericht"
        maxWidth="xl"
      />
    </main>
  );
}
