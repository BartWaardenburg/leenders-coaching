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
  createCardsSection,
  createTestimonialSection,
  createFAQSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the coaching page with specified content
 */
const createCoachingPage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating coaching page...');

    // 1. Create or update the coaching page document
    await createOrUpdatePage({
      pageId: 'coachingPage',
      pageType: 'coachingPage',
      title: 'Coaching',
      slug: 'coaching',
      metadata: {
        title: 'Coaching | Leenders Coaching | Professionele coaching diensten',
        description:
          'Ontdek mijn coaching diensten voor persoonlijke groei, loopbaanontwikkeling en teamcoaching. Samen werken we aan het bereiken van jouw doelen.',
        openGraphTitle: 'Coaching | Leenders Coaching',
        openGraphDescription:
          'Persoonlijke, loopbaan- en teamcoaching om je te helpen je volledige potentieel te bereiken.',
      },
    });

    // 2. Create sections for the coaching page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Coaching diensten',
      description:
        'Persoonlijke begeleiding op maat voor het bereiken van jouw doelen. Ontdek hoe mijn coaching diensten je kunnen helpen.',
      background: 'green',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
      cta: {
        label: 'Neem contact op',
        url: '/contact',
        isExternal: false,
      },
    });

    // Create intro content section
    const introSection = createContentSection({
      title: 'Introductie',
      displayTitle: 'Jouw reis naar persoonlijke groei',
      background: 'blue',
      content: [
        'Als professioneel coach begeleid ik je bij het omzetten van uitdagingen in kansen voor groei. Mijn coaching is gebaseerd op een persoonlijke aanpak die volledig is afgestemd op jouw behoeften, situatie en doelen.',
        'Of je nu worstelt met persoonlijke uitdagingen, op zoek bent naar loopbaanbegeleiding of je team wilt versterken - samen werken we aan concrete resultaten die echt het verschil maken in je leven of werk.',
      ],
    });

    // Create coaching types overview with cards
    const coachingTypesSection = createCardsSection({
      title: 'Coaching Types',
      displayTitle: 'Mijn coaching diensten',
      background: 'purple',
      cards: [
        {
          title: 'Persoonlijke Coaching',
          description:
            'Eén-op-één begeleiding gericht op persoonlijke groei, zelfvertrouwen, stress management en het overwinnen van blokkades die je tegenhouden.',
          link: {
            text: 'Lees meer',
            url: '#persoonlijke-coaching',
          },
        },
        {
          title: 'Loopbaancoaching',
          description:
            'Begeleiding bij carrièrekeuzes, sollicitatieprocessen, werkgerelateerde uitdagingen en het vinden van meer voldoening in je werk.',
          link: {
            text: 'Lees meer',
            url: '#loopbaancoaching',
          },
        },
        {
          title: 'Teamcoaching',
          description:
            'Coaching voor teams gericht op betere communicatie, conflicthantering, samenwerking en het bereiken van gemeenschappelijke doelen.',
          link: {
            text: 'Lees meer',
            url: '#teamcoaching',
          },
        },
      ],
    });

    // Create personal coaching section
    const personalCoachingSection = createContentSection({
      title: 'Persoonlijke Coaching',
      displayTitle: 'Persoonlijke Coaching',
      background: 'pink',
      content: [
        "Persoonlijke coaching is gericht op jouw individuele groei en ontwikkeling. We werken samen aan thema's als:",
        '- Meer zelfvertrouwen en assertiviteit ontwikkelen',
        '- Omgaan met stress en werkdruk',
        '- Balans vinden tussen werk en privé',
        '- Overwinnen van belemmerende overtuigingen',
        '- Verbeteren van communicatievaardigheden',
        '',
        'Een persoonlijk coachingstraject begint altijd met een kennismakingsgesprek waarin we je doelen verkennen en bepalen of er een klik is. Vervolgens werken we in gemiddeld 6-8 sessies stap voor stap toe naar blijvende resultaten.',
      ],
    });

    // Create career coaching section
    const careerCoachingSection = createContentSection({
      title: 'Loopbaancoaching',
      displayTitle: 'Loopbaancoaching',
      background: 'yellow',
      content: [
        'Loopbaancoaching ondersteunt je bij het maken van bewuste keuzes in je carrière. We richten ons op:',
        '- Inzicht krijgen in je talenten, waarden en drijfveren',
        '- Verhelderen van je carrièredoelen',
        '- Sollicitatievaardigheden verbeteren',
        '- Werkgerelateerde uitdagingen aanpakken',
        '- Voorbereiden op een nieuwe rol of functie',
        '',
        'Bij loopbaancoaching maken we gebruik van verschillende assessments en oefeningen om een helder beeld te krijgen van jouw ideale loopbaanpad. Een traject bestaat meestal uit 5-6 sessies, aangevuld met praktische opdrachten.',
      ],
    });

    // Create team coaching section
    const teamCoachingSection = createContentSection({
      title: 'Teamcoaching',
      displayTitle: 'Teamcoaching',
      background: 'teal',
      content: [
        "Teamcoaching helpt teams om effectiever samen te werken en betere resultaten te behalen. Thema's die aan bod komen zijn:",
        '- Verbeteren van communicatie en feedback',
        '- Versterken van onderling vertrouwen',
        '- Omgaan met conflicten',
        '- Verduidelijken van rollen en verantwoordelijkheden',
        '- Samenwerken aan gemeenschappelijke doelen',
        '',
        'Een teamcoachingstraject wordt op maat samengesteld, afhankelijk van de behoeften van het team. Dit kan variëren van een eenmalige workshop tot een langer ontwikkelingstraject met meerdere sessies en individuele coaching.',
      ],
    });

    // Create process/approach section with features
    const approachSection = createFeaturedSection({
      title: 'Mijn aanpak',
      displayTitle: 'Hoe werk ik?',
      headline: 'Een transparant proces gericht op resultaat',
      description:
        'Mijn coachingsaanpak is persoonlijk, doelgericht en resultaatgericht. Elke stap in het proces is ontworpen om je dichter bij je doelen te brengen.',
      background: 'blue',
      features: [
        {
          title: 'Kennismaking & Intakegesprek',
          description:
            'We verkennen je situatie, behoeften en doelen. We bespreken hoe coaching je kan helpen en of er een klik is.',
        },
        {
          title: 'Doelen & Plan van Aanpak',
          description:
            'We stellen heldere, meetbare doelen op en maken een plan van aanpak specifiek voor jouw situatie.',
        },
        {
          title: 'Coaching Sessies',
          description:
            'In de coaching sessies werken we aan inzichten, vaardigheden en acties die je helpen je doelen te bereiken.',
        },
        {
          title: 'Evaluatie & Borging',
          description:
            'We evalueren regelmatig de voortgang en zorgen voor borging van resultaten, zodat je het geleerde kunt blijven toepassen.',
        },
      ],
      cta: {
        label: 'Maak een afspraak',
        url: '/contact',
        isExternal: false,
      },
    });

    // Create pricing section
    const pricingSection = createFAQSection({
      title: 'Tarieven',
      displayTitle: 'Investering in jezelf',
      background: 'yellow',
      description:
        'Transparante tarieven voor mijn coaching diensten. Coaching is een investering in jezelf die zich terugverdient in resultaten.',
      items: [
        {
          question: 'Wat zijn de kosten van een persoonlijk coachingstraject?',
          answer:
            'Een persoonlijk coachingstraject (6-8 sessies) kost €995,- inclusief BTW voor particulieren. Losse sessies zijn mogelijk tegen een tarief van €150,- per sessie van 75 minuten.',
        },
        {
          question: 'Wat zijn de kosten van loopbaancoaching?',
          answer:
            'Een loopbaancoachingstraject (5-6 sessies) kost €895,- inclusief BTW voor particulieren. Voor zakelijke cliënten gelden andere tarieven, neem contact op voor een offerte op maat.',
        },
        {
          question: 'Wat zijn de kosten van teamcoaching?',
          answer:
            'De kosten voor teamcoaching zijn afhankelijk van de grootte van het team, de duur van het traject en de specifieke behoeften. Neem contact op voor een vrijblijvende offerte op maat.',
        },
        {
          question: 'Worden de kosten vergoed?',
          answer:
            'Sommige werkgevers vergoeden coaching als onderdeel van opleidings- of ontwikkelingsbudget. Persoonlijke coaching wordt niet vergoed door zorgverzekeraars. Loopbaancoaching is in sommige gevallen fiscaal aftrekbaar als studiekosten.',
        },
      ],
    });

    // Create testimonials section
    const testimonialSection = createTestimonialSection({
      displayTitle: 'Ervaringen van cliënten',
      background: 'purple',
      testimonials: [
        {
          quote:
            'De coaching sessies hebben mij geholpen om mijn angsten te overwinnen en mijn dromen na te jagen. Ik heb nu veel meer zelfvertrouwen en durf keuzes te maken die bij mij passen.',
          author: 'Sandra van der Meer',
          role: 'HR Manager',
        },
        {
          quote:
            'Dankzij de loopbaancoaching heb ik eindelijk helder wat ik wil in mijn carrière. De inzichten en praktische oefeningen waren onmisbaar tijdens mijn zoektocht naar een nieuwe baan.',
          author: 'Marco Jansen',
          role: 'Marketing Specialist',
        },
        {
          quote:
            'Als teamleider zocht ik hulp om mijn team beter te laten functioneren. De teamcoaching sessies hebben ons geholpen om effectiever te communiceren en samen te werken.',
          author: 'Linda de Bruin',
          role: 'Team Manager',
        },
      ],
    });

    // 3. Replace all sections on the coaching page with our new sections
    await updatePageSections('coachingPage', [
      heroSection,
      introSection,
      coachingTypesSection,
      personalCoachingSection,
      careerCoachingSection,
      teamCoachingSection,
      approachSection,
      pricingSection,
      testimonialSection,
    ]);

    console.log('✨ Successfully created/updated coaching page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating coaching page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createCoachingPage();
}

// Export for use in other modules
export { createCoachingPage };
