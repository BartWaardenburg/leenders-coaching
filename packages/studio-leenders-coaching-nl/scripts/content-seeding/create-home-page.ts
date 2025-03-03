import { config } from 'dotenv';
import { handlePageCreationError } from './utils/index.js';
import {
  createOrUpdatePage,
  updatePageSections,
} from './utils/page-creator.js';
import {
  createHeaderSection,
  createContentSection,
  createFeaturedSection,
  createTestimonialSection,
  createCardsSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the home page with specified content
 */
const createHomePage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating home page...');

    // 1. Create or update the home page document
    await createOrUpdatePage({
      pageId: 'homePage',
      pageType: 'homePage',
      title: 'Home',
      slug: 'home',
      metadata: {
        title:
          'Leenders Coaching | Professionele coaching voor persoonlijke groei',
        description:
          'Ontdek hoe persoonlijke coaching je kan helpen om je doelen te bereiken, obstakels te overwinnen en je volledige potentieel te benutten.',
        openGraphTitle:
          'Leenders Coaching | Professionele coaching voor persoonlijke groei',
        openGraphDescription:
          'Ontdek hoe persoonlijke coaching je kan helpen om je doelen te bereiken en je volledige potentieel te benutten.',
      },
    });

    // 2. Create sections for the home page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Transformeer je leven met professionele coaching',
      description:
        'Ontdek hoe persoonlijke coaching je kan helpen om je doelen te bereiken, obstakels te overwinnen en je volledige potentieel te benutten.',
      background: 'blue',
      imageUrl: 'https://images.unsplash.com/photo-1542596594-649edbc13630',
      cta: {
        label: 'Gratis kennismaking',
        url: '/contact',
        isExternal: false,
      },
    });

    // Create featured section for benefits/approach
    const featuredSection = createFeaturedSection({
      title: 'Voordelen van coaching',
      displayTitle: 'Waarom kiezen voor coaching?',
      headline: 'Persoonlijke begeleiding voor blijvend resultaat',
      description:
        'Coaching helpt je om obstakels te overwinnen, jezelf beter te begrijpen en concrete stappen te zetten naar je doelen.',
      background: 'purple',
      features: [
        {
          title: 'Persoonlijke aanpak',
          description:
            'Een coachingstraject volledig afgestemd op jouw behoeften en doelen.',
        },
        {
          title: 'Professionele begeleiding',
          description:
            'Deskundige coaching door een gecertificeerd coach met jarenlange ervaring.',
        },
        {
          title: 'Blijvende resultaten',
          description:
            'Focus op duurzame verandering en langetermijnresultaten.',
        },
      ],
      cta: {
        label: 'Meer over mijn aanpak',
        url: '/aanpak',
        isExternal: false,
      },
    });

    // Create services section using cards
    const servicesSection = createCardsSection({
      title: 'Diensten',
      displayTitle: 'Mijn coaching diensten',
      background: 'green',
      cards: [
        {
          title: 'Persoonlijke coaching',
          description:
            'Een-op-een coaching sessies gericht op persoonlijke groei, zelfvertrouwen en het overwinnen van obstakels.',
          link: {
            text: 'Meer informatie',
            url: '/coaching',
          },
        },
        {
          title: 'Loopbaancoaching',
          description:
            'Begeleiding bij het maken van carrièrekeuzes, solliciteren en het vinden van meer voldoening in je werk.',
          link: {
            text: 'Meer informatie',
            url: '/coaching',
          },
        },
        {
          title: 'Teamcoaching',
          description:
            'Coaching voor teams gericht op betere samenwerking, communicatie en het bereiken van gemeenschappelijke doelen.',
          link: {
            text: 'Meer informatie',
            url: '/coaching',
          },
        },
      ],
    });

    // Create testimonials section
    const testimonialSection = createTestimonialSection({
      testimonials: [
        {
          quote:
            'De coaching sessies hebben mij geholpen om mijn angsten te overwinnen en mijn dromen na te jagen. Ik ben nu veel zelfverzekerder.',
          author: 'Marieke de Vries',
          role: 'Marketing Manager',
        },
        {
          quote:
            'Dankzij de coaching heb ik de stap durven zetten om van baan te veranderen. De inzichten waren onmisbaar tijdens mijn transitie.',
          author: 'Thomas Bakker',
          role: 'Software Developer',
        },
      ],
    });

    // Create CTA section
    const ctaSection = createContentSection({
      title: 'Call-to-Action',
      displayTitle: 'Klaar voor de volgende stap?',
      content: [
        'Neem contact op voor een vrijblijvend kennismakingsgesprek en ontdek hoe coaching je kan helpen om je doelen te bereiken.',
      ],
      background: 'yellow',
    });

    // 3. Replace all sections on the home page with our new sections
    await updatePageSections('homePage', [
      heroSection,
      featuredSection,
      servicesSection,
      testimonialSection,
      ctaSection,
    ]);

    console.log('✨ Successfully created/updated home page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating home page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createHomePage();
}

// Export for use in other modules
export { createHomePage };
