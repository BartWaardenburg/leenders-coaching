import { config } from 'dotenv';
import { handlePageCreationError } from './utils/index.js';
import {
  createOrUpdatePage,
  updatePageSections,
} from './utils/page-creator.js';
import {
  createHeaderSection,
  createContentSection,
  createBlogSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the blog page with specified content
 */
const createBlogPage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating blog page...');

    // 1. Create or update the blog page document
    await createOrUpdatePage({
      pageId: 'blogPage',
      pageType: 'blogPage',
      title: 'Blog',
      slug: 'blog',
      metadata: {
        title: 'Blog | Leenders Coaching | Inzichten en inspiratie',
        description:
          'Lees de nieuwste blog artikelen over coaching, persoonlijke ontwikkeling en loopbaanbegeleiding. Praktische tips en inzichten voor groei.',
        openGraphTitle: 'Blog | Leenders Coaching',
        openGraphDescription:
          'Inzichten en inspiratie voor persoonlijke en professionele groei.',
      },
    });

    // 2. Create sections for the blog page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Blog',
      description:
        'Inzichten, inspiratie en praktische tips voor persoonlijke en professionele groei. Ontdek de nieuwste artikelen over coaching, mindfulness en loopbaanontwikkeling.',
      background: 'green',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    });

    // Create intro section
    const introSection = createContentSection({
      title: 'Introductie',
      displayTitle: 'Welkom op de blog van Leenders Coaching',
      background: 'blue',
      content: [
        "Op deze pagina deel ik regelmatig nieuwe artikelen over thema's als persoonlijke ontwikkeling, loopbaanvraagstukken, mindfulness en praktische coaching tips. De blog is bedoeld om je te inspireren en je handvatten te geven voor je eigen groeiproces.",
        'Je vindt hier zowel diepgaande artikelen over coaching methodieken als praktische tips die je direct kunt toepassen. Heb je een specifiek onderwerp waar je graag meer over zou willen lezen? Laat het me weten via het contactformulier.',
      ],
    });

    // Create featured blog posts section
    const featuredBlogSection = createBlogSection({
      title: 'Uitgelichte blogs',
      displayTitle: 'Uitgelichte artikelen',
      background: 'purple',
      description: 'Ontdek mijn meest populaire en recente blog artikelen.',
      postsToShow: 3,
      showFeaturedOnly: true,
      cta: {
        label: 'Alle artikelen bekijken',
        url: '#alle-artikelen',
        isExternal: false,
      },
    });

    // Create category sections
    const personalDevelopmentSection = createBlogSection({
      title: 'Persoonlijke ontwikkeling',
      displayTitle: 'Persoonlijke ontwikkeling',
      background: 'pink',
      description:
        'Artikelen over zelfvertrouwen, mindfulness, stress management en persoonlijke groei.',
      postsToShow: 4,
      showFeaturedOnly: false,
      cta: {
        label: 'Meer over persoonlijke ontwikkeling',
        url: '/blog/categorie/persoonlijke-ontwikkeling',
        isExternal: false,
      },
    });

    const careerSection = createBlogSection({
      title: 'Loopbaan & Carrière',
      displayTitle: 'Loopbaan & Carrière',
      background: 'yellow',
      description:
        'Inzichten en tips voor je loopbaan, carrièreswitch, solliciteren en werkgeluk.',
      postsToShow: 4,
      showFeaturedOnly: false,
      cta: {
        label: 'Meer over loopbaan',
        url: '/blog/categorie/loopbaan',
        isExternal: false,
      },
    });

    // Create all blog posts section
    const allBlogPostsSection = createBlogSection({
      title: 'Alle artikelen',
      displayTitle: 'Alle blog artikelen',
      background: 'teal',
      description:
        'Bekijk hier al mijn blog artikelen. Gebruik de filters om op categorie of thema te filteren.',
      postsToShow: 10,
      showFeaturedOnly: false,
    });

    // Create newsletter signup section
    const newsletterSection = createContentSection({
      title: 'Newsletter',
      displayTitle: 'Schrijf je in voor de nieuwsbrief',
      background: 'blue',
      content: [
        'Wil je op de hoogte blijven van nieuwe blog artikelen en tips ontvangen voor persoonlijke en professionele groei? Schrijf je dan in voor de maandelijkse nieuwsbrief.',
        '',
        'In de nieuwsbrief deel ik:',
        '- De nieuwste blog artikelen',
        '- Praktische coaching tips en oefeningen',
        '- Inspirerende quotes en boekentips',
        '- Exclusieve content die niet op de website verschijnt',
        '',
        'Je kunt je altijd uitschrijven en ik deel je gegevens nooit met derden. Lees voor meer informatie de privacyverklaring.',
      ],
    });

    // 3. Replace all sections on the blog page with our new sections
    await updatePageSections('blogPage', [
      heroSection,
      introSection,
      featuredBlogSection,
      personalDevelopmentSection,
      careerSection,
      allBlogPostsSection,
      newsletterSection,
    ]);

    console.log('✨ Successfully created/updated blog page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating blog page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createBlogPage();
}

// Export for use in other modules
export { createBlogPage };
