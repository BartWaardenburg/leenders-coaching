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
  createTimelineSection,
  createFAQSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the approach page with specified content
 */
const createApproachPage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating approach page...');

    // 1. Create or update the approach page document
    await createOrUpdatePage({
      pageId: 'approachPage',
      pageType: 'approachPage',
      title: 'Aanpak',
      slug: 'aanpak',
      metadata: {
        title: 'Aanpak | Leenders Coaching | Mijn coaching methodiek',
        description:
          'Leer meer over mijn coaching aanpak en methodiek. Ik werk met een persoonlijke benadering die gericht is op blijvende resultaten.',
        openGraphTitle: 'Mijn Coaching Aanpak | Leenders Coaching',
        openGraphDescription:
          'Ontdek hoe mijn coaching aanpak je helpt je doelen te bereiken met blijvende resultaten.',
      },
    });

    // 2. Create sections for the approach page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Mijn coaching aanpak',
      description:
        'Een persoonlijke en resultaatgerichte methodiek gebaseerd op bewezen principes. Ontdek hoe mijn aanpak je kan helpen je doelen te bereiken.',
      background: 'teal',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    });

    // Create intro content section
    const introSection = createContentSection({
      title: 'Visie',
      displayTitle: 'Mijn visie op coaching',
      background: 'blue',
      content: [
        'Mijn visie op coaching is gebaseerd op het principe dat iedereen over het potentieel beschikt om uitdagingen te overwinnen en doelen te bereiken. Als coach ben ik er om dat potentieel aan te boren en te ontwikkelen.',
        'Ik geloof niet in een one-size-fits-all benadering. Elke persoon is uniek, met eigen uitdagingen, sterktes en ontwikkelpunten. Daarom stem ik mijn coaching altijd af op jouw specifieke situatie en behoeften.',
        'Mijn doel is om niet alleen te werken aan symptomen, maar vooral aan onderliggende patronen en overtuigingen. Dit zorgt voor diepere inzichten en blijvende resultaten, ook na afloop van het coachingstraject.',
      ],
    });

    // Create core principles section with features
    const principlesSection = createFeaturedSection({
      title: 'Principes',
      displayTitle: 'Kernprincipes van mijn aanpak',
      headline: 'Doelgericht, persoonlijk en duurzaam',
      description:
        'Mijn coaching is gebaseerd op een aantal kernprincipes die als fundament dienen voor elk coachingstraject.',
      background: 'purple',
      features: [
        {
          title: 'Persoonlijke benadering',
          description:
            'Elk coachingstraject is volledig afgestemd op jouw persoonlijke situatie, doelen en voorkeuren.',
        },
        {
          title: 'Resultaatgericht werken',
          description:
            'We werken met concrete, meetbare doelen en een heldere structuur om die doelen te bereiken.',
        },
        {
          title: 'Integrale aanpak',
          description:
            'Ik kijk naar alle aspecten van een situatie: gedachten, emoties, gedrag én de context waarin je functioneert.',
        },
        {
          title: 'Focus op zelfredzaamheid',
          description:
            'Je leert vaardigheden en inzichten die je ook na het coachingstraject zelfstandig kunt blijven toepassen.',
        },
      ],
    });

    // Create methodology section with timeline
    const methodologySection = createTimelineSection({
      title: 'Methodiek',
      displayTitle: 'Mijn coaching methodiek',
      background: 'green',
      description:
        'Een helder en transparant proces dat stap voor stap toewerkt naar het bereiken van je doelen.',
      events: [
        {
          title: 'Fase 1: Verkenning & Bewustwording',
          description:
            'We brengen je huidige situatie, uitdagingen en doelen in kaart. We werken aan bewustwording van patronen en belemmeringen.',
        },
        {
          title: 'Fase 2: Inzicht & Perspectief',
          description:
            'Je krijgt nieuwe inzichten en perspectieven die je helpen om situaties anders te bekijken en te benaderen.',
        },
        {
          title: 'Fase 3: Strategieën & Vaardigheden',
          description:
            'Je ontwikkelt concrete strategieën en vaardigheden om effectiever met uitdagingen om te gaan en je doelen te bereiken.',
        },
        {
          title: 'Fase 4: Toepassing & Integratie',
          description:
            'Je past het geleerde toe in de praktijk en integreert nieuwe inzichten en vaardigheden in je dagelijkse leven of werk.',
        },
        {
          title: 'Fase 5: Evaluatie & Borging',
          description:
            'We evalueren de resultaten en zorgen voor borging, zodat het geleerde blijvend effect heeft.',
        },
      ],
    });

    // Create methods and techniques section
    const techniquesSection = createContentSection({
      title: 'Technieken',
      displayTitle: 'Methoden en technieken',
      background: 'pink',
      content: [
        'Ik put uit verschillende coaching methodieken en technieken om een aanpak te creëren die past bij jouw situatie en leerstijl:',
        '',
        '**Oplossingsgerichte coaching**',
        'Focus op het vinden van oplossingen in plaats van analyseren van problemen. We richten ons op wat wél werkt en bouwen daarop voort.',
        '',
        '**Cognitieve gedragscoaching**',
        'Inzicht krijgen in hoe gedachten, emoties en gedrag elkaar beïnvloeden en hoe je belemmerende gedachtenpatronen kunt doorbreken.',
        '',
        '**NLP (Neuro-Linguïstisch Programmeren)**',
        'Technieken gericht op het begrijpen en veranderen van gedragspatronen via taal en communicatie.',
        '',
        '**Systemisch werken**',
        'Inzicht in hoe je functioneert binnen verschillende systemen (werk, familie) en hoe dit je gedrag beïnvloedt.',
        '',
        '**Mindfulness en stressreductie**',
        'Technieken om bewuster in het moment te zijn, beter te ontspannen en effectiever met stress om te gaan.',
      ],
    });

    // Create FAQ section
    const faqSection = createFAQSection({
      title: 'FAQ',
      displayTitle: 'Veelgestelde vragen over mijn aanpak',
      background: 'yellow',
      items: [
        {
          question: 'Hoe lang duurt een coachingstraject?',
          answer:
            'De duur van een coachingstraject is afhankelijk van je doelen en situatie. Een gemiddeld individueel traject bestaat uit 6-8 sessies, verspreid over 3-4 maanden. We bepalen samen wat voor jou het beste werkt.',
        },
        {
          question: 'Hoe vaak hebben we een coaching sessie?',
          answer:
            'Meestal plannen we elke 2-3 weken een sessie. Dit geeft je voldoende tijd om het geleerde toe te passen en te reflecteren, zonder momentum te verliezen. De frequentie kan worden aangepast aan jouw behoeften.',
        },
        {
          question: 'Wat is jouw rol als coach?',
          answer:
            'Als coach ben ik geen adviseur of expert die je vertelt wat je moet doen. Ik ben een gids die je helpt jouw eigen antwoorden te vinden door de juiste vragen te stellen, inzichten te faciliteren en je te ondersteunen bij het ontwikkelen van vaardigheden en het nemen van stappen.',
        },
        {
          question:
            'Wat wordt er van mij verwacht tijdens een coachingstraject?',
          answer:
            'Coaching is een actief proces dat vraagt om jouw betrokkenheid. Ik verwacht openheid, eerlijkheid en de bereidheid om tussen de sessies door aan opdrachten te werken en het geleerde toe te passen. Hoe meer je investeert, hoe groter het rendement.',
        },
        {
          question: 'Wat als de coaching aanpak niet bij mij past?',
          answer:
            'Het is belangrijk dat er een goede match is tussen coach en coachee. Daarom beginnen we altijd met een vrijblijvend kennismakingsgesprek. Als tijdens het traject blijkt dat mijn aanpak niet goed aansluit, bespreken we dit open en zoeken we samen naar een oplossing.',
        },
      ],
    });

    // 3. Replace all sections on the approach page with our new sections
    await updatePageSections('approachPage', [
      heroSection,
      introSection,
      principlesSection,
      methodologySection,
      techniquesSection,
      faqSection,
    ]);

    console.log('✨ Successfully created/updated approach page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating approach page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createApproachPage();
}

// Export for use in other modules
export { createApproachPage };
