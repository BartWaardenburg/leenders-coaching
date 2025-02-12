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
export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getCoachingPageData();

  return {
    title: 'Coaching | Leenders Coaching',
    description: 'Ontdek mijn coaching diensten en hoe ik je kan helpen.',
  };
};

/**
 * Coaching page component
 */
const CoachingPage = async () => {
  const data = await getCoachingPageData();

  return (
    <main>
      {/* TODO: Implement page sections based on data */}
      <h1>Coaching</h1>
    </main>
  );
};

export default CoachingPage; 