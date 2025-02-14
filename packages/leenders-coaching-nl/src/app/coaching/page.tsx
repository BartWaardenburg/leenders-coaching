import type { Metadata } from 'next';

/**
 * Fetches data for the Coaching page
 */
const getCoachingPageData = async () => {
  // TODO: Implement data fetching
  return null;
};

/**
 * Generates metadata for the Coaching page
 */
export async function generateMetadata(): Promise<Metadata> {
  await getCoachingPageData();
  return {
    title: 'Coaching | Leenders Coaching',
    description: 'Ontdek de coaching mogelijkheden van Leenders Coaching',
  };
}

/**
 * Coaching page component
 */
export default async function CoachingPage() {
  await getCoachingPageData();
  return (
    <main>
      {/* TODO: Implement page sections based on data */}
      <h1>Coaching</h1>
    </main>
  );
} 