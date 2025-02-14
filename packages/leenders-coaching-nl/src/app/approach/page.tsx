import type { Metadata } from 'next';

/**
 * Fetches data for the Approach page
 */
const getApproachPageData = async () => {
  // TODO: Implement data fetching
  return null;
};

/**
 * Generates metadata for the Approach page
 */
export async function generateMetadata(): Promise<Metadata> {
  await getApproachPageData();
  return {
    title: 'Aanpak | Leenders Coaching',
    description: 'Ontdek de aanpak van Leenders Coaching',
  };
}

/**
 * Approach page component
 */
export default async function ApproachPage() {
  await getApproachPageData();
  return (
    <main>
      {/* TODO: Implement page sections based on data */}
      <h1>Aanpak</h1>
    </main>
  );
} 