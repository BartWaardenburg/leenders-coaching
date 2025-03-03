import { config } from 'dotenv';
import { handlePageCreationError } from './utils/index.js';
import {
  createOrUpdatePage,
  updatePageSections,
} from './utils/page-creator.js';
import {
  createHeaderSection,
  createContentSection,
  createTestimonialSection,
  createTimelineSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the about page with specified content
 */
const createAboutPage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating about page...');

    // 1. Create or update the about page document
    await createOrUpdatePage({
      pageId: 'aboutPage',
      pageType: 'aboutPage',
      title: 'Over Mij',
      slug: 'over-mij',
      metadata: {
        title: 'Over Mij | Leenders Coaching | Leer mij kennen',
        description:
          'Leer meer over mijn achtergrond, ervaring en visie op coaching. Ontdek hoe mijn persoonlijke aanpak je kan helpen je doelen te bereiken.',
        openGraphTitle: 'Over Mij | Leenders Coaching',
        openGraphDescription:
          'Leer meer over mijn achtergrond, ervaring en visie op coaching.',
      },
    });

    // 2. Create sections for the about page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Mijn verhaal en passie voor coaching',
      description:
        'Leer meer over mijn achtergrond, ervaring en visie op coaching. Als gedreven coach help ik mensen hun potentieel te ontdekken en hun doelen te bereiken.',
      background: 'purple',
      // Skip image for now to avoid issues
      // imageUrl: 'https://source.unsplash.com/random/1200x800/?coaching,person',
    });

    // Create bio/intro section with personal story
    const bioSection = createContentSection({
      title: 'Introductie',
      displayTitle: 'Wie ben ik?',
      background: 'blue',
      content: [
        'Mijn naam is Julia Leenders en ik ben een gecertificeerd coach met meer dan 10 jaar ervaring in het begeleiden van individuen en teams. Mijn reis naar coaching begon toen ik zelf een transformatieve ervaring had met een coach die mij hielp om een belangrijke carrièrekeuze te maken.',
        'Deze ervaring heeft mij geïnspireerd om anderen te helpen hun eigen potentieel te ontdekken en te verwezenlijken. Ik geloof sterk in de kracht van persoonlijke groei en ontwikkeling, en hoe dit kan leiden tot meer voldoening en succes in alle aspecten van het leven.',
      ],
    });

    // Create certification and education timeline
    const timelineSection = createTimelineSection({
      title: 'Opleidingen',
      displayTitle: 'Mijn pad naar professionele coaching',
      background: 'green',
      description:
        'Een overzicht van mijn opleidingen, certificeringen en professionele ervaring in coaching.',
      events: [
        {
          title: 'ICF Certified Professional Coach',
          description:
            'Behaalde de internationale certificering van de International Coach Federation (ICF).',
          date: '2018',
        },
        {
          title: 'Master NLP Practitioner',
          description:
            'Voltooide de opleiding tot Master NLP Practitioner bij het Nederlands Instituut voor NLP.',
          date: '2016',
        },
        {
          title: 'Opleiding Systemisch Werken',
          description:
            'Volgde de opleiding Systemisch Werken en Familieopstellingen bij het Bert Hellinger Instituut.',
          date: '2014',
        },
        {
          title: 'Master Psychologie',
          description:
            'Behaalde mijn Master in Psychologie met specialisatie in Coaching en Consulting aan de Universiteit van Amsterdam.',
          date: '2012',
        },
      ],
    });

    // Create philosophy section with coaching approach
    const philosophySection = createContentSection({
      title: 'Filosofie',
      displayTitle: 'Mijn coaching filosofie',
      background: 'pink',
      content: [
        'Mijn aanpak is gebaseerd op de overtuiging dat ieder persoon uniek is en daarom een gepersonaliseerde benadering verdient. Ik combineer verschillende coachingsmethodieken en -technieken om een aanpak te creëren die past bij jouw specifieke behoeften en doelen.',
        'Ik geloof in een holistische benadering die rekening houdt met alle aspecten van je leven - persoonlijk, professioneel en relationeel. Door een veilige en vertrouwelijke ruimte te creëren, help ik je om je gedachten te verhelderen, je sterke punten te ontdekken en actieplannen te ontwikkelen die leiden tot blijvende verandering.',
      ],
    });

    // Create testimonials section
    const testimonialSection = createTestimonialSection({
      displayTitle: 'Wat cliënten over mij zeggen',
      background: 'yellow',
      testimonials: [
        {
          quote:
            'Julia heeft mij geholpen om mijn carrièrepad te herdefiniëren. Haar inzichten en gerichte vragen leidden tot doorbraken die ik anders nooit had bereikt.',
          author: 'Robert Janssen',
          role: 'Ondernemer',
        },
        {
          quote:
            'Dankzij de coaching van Julia heb ik geleerd hoe ik effectiever kan communiceren met mijn team. Dit heeft geleid tot een betere werksfeer en hogere productiviteit.',
          author: 'Lisa Vermeulen',
          role: 'Afdelingsmanager',
        },
        {
          quote:
            "Julia's holistische benadering heeft me geholpen om balans te vinden tussen werk en privé. Voor het eerst in jaren voel ik me echt in harmonie met mezelf.",
          author: 'Erik de Groot',
          role: 'IT Specialist',
        },
      ],
    });

    // 3. Replace all sections on the about page with our new sections
    await updatePageSections('aboutPage', [
      heroSection,
      bioSection,
      timelineSection,
      philosophySection,
      testimonialSection,
    ]);

    console.log('✨ Successfully created/updated about page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating about page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createAboutPage();
}

// Export for use in other modules
export { createAboutPage };
