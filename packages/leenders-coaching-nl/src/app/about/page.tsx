import type { Metadata } from 'next';
import { getAboutPage } from '@/graphql/queries';
import { notFound } from 'next/navigation';
import { SectionMapper } from '@/components/sections/SectionMapper';
import type { Section } from '@/components/sections/SectionMapper';
import type { Maybe } from '@/graphql/generated/graphql';

/* Generate metadata from Sanity data */
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  if (!aboutPage?.metadata) {
    return {
      title: 'About - Leenders Coaching',
      description: 'Learn about my approach to coaching and how I can help you achieve your goals.',
    };
  }

  const { metadata } = aboutPage;

  return {
    title: metadata.title || 'About - Leenders Coaching',
    description: metadata.description || undefined,
    keywords: metadata.keywords?.filter((keyword): keyword is string => Boolean(keyword)) || undefined,
    openGraph: metadata.image?.asset?.url ? {
      images: [{
        url: metadata.image.asset.url,
        alt: metadata.image.asset.altText || ''
      }],
    } : undefined,
  };
}

/**
 * About page with information about the coach and approach
 */
export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    notFound();
  }

  console.log('Raw aboutPage:', JSON.stringify(aboutPage, null, 2));

  const sections = aboutPage.sections?.map((section): Maybe<Section> => {
    if (!section) return null;
    if (section._type === 'sectionHeader' || section._type === 'sectionContent' || section._type === 'sectionCards') {
      const mappedSection = {
        ...section,
        _key: section._key ?? '',
        title: section.title ?? '',
        displayTitle: section.displayTitle ?? undefined,
        description: 'description' in section ? section.description : undefined,
        background: undefined,
        showBorder: undefined,
        maxWidth: undefined,
      } as Section;
      console.log('Mapped section:', JSON.stringify(mappedSection, null, 2));
      return mappedSection;
    }
    return null;
  }) ?? null;

  console.log('Final sections:', JSON.stringify(sections, null, 2));

  return <SectionMapper sections={sections} />;
}
