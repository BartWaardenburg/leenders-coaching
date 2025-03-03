import { config } from 'dotenv';
import { handlePageCreationError } from './utils/index.js';
import {
  createOrUpdatePage,
  updatePageSections,
} from './utils/page-creator.js';
import {
  createHeaderSection,
  createContentSection,
  createFormSection,
  createFAQSection,
} from './utils/section-creator.js';

// Load environment variables
config();

/**
 * Creates or updates the contact page with specified content
 */
const createContactPage = async (): Promise<void> => {
  try {
    console.log('🚀 Creating/updating contact page...');

    // 1. Create or update the contact page document
    await createOrUpdatePage({
      pageId: 'contactPage',
      pageType: 'contactPage',
      title: 'Contact',
      slug: 'contact',
      metadata: {
        title: 'Contact | Leenders Coaching | Neem contact op',
        description:
          'Neem contact op voor een vrijblijvend kennismakingsgesprek. Samen bespreken we hoe coaching je kan helpen om je doelen te bereiken.',
        openGraphTitle: 'Contact | Leenders Coaching',
        openGraphDescription:
          'Neem vandaag nog contact op voor een vrijblijvend kennismakingsgesprek.',
      },
    });

    // 2. Create sections for the contact page

    // Create hero section
    const heroSection = await createHeaderSection({
      displayTitle: 'Neem contact op',
      description:
        'Heb je een vraag of wil je een afspraak maken voor een vrijblijvend kennismakingsgesprek? Neem gerust contact met me op.',
      background: 'blue',
      imageUrl: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e',
    });

    // Create contact info section
    const contactInfoSection = createContentSection({
      title: 'Contact Informatie',
      displayTitle: 'Contactgegevens',
      background: 'green',
      content: [
        '**Leenders Coaching**',
        'Julia Leenders',
        '',
        '**Email**',
        'info@leenderscoaching.nl',
        '',
        '**Telefoon**',
        '06-12345678',
        '',
        '**Adres**',
        'Coachingstraat 123',
        '1234 AB Amsterdam',
        '',
        '**Bereikbaarheid**',
        'Telefonisch bereikbaar op werkdagen van 9.00 tot 17.00 uur.',
        'E-mails worden binnen 24 uur beantwoord op werkdagen.',
      ],
    });

    // Create form section
    const formSection = createFormSection({
      displayTitle: 'Stuur een bericht',
      description:
        'Vul het formulier in en ik neem zo snel mogelijk contact met je op.',
      background: 'purple',
      fields: [
        {
          name: 'name',
          label: 'Naam',
          type: 'text',
          required: true,
          placeholder: 'Jouw naam',
        },
        {
          name: 'email',
          label: 'E-mailadres',
          type: 'email',
          required: true,
          placeholder: 'jouw@email.nl',
        },
        {
          name: 'phone',
          label: 'Telefoonnummer',
          type: 'tel',
          required: false,
          placeholder: '06-12345678',
        },
        {
          name: 'subject',
          label: 'Onderwerp',
          type: 'select',
          required: true,
          options: [
            { label: 'Aanvraag kennismakingsgesprek', value: 'kennismaking' },
            { label: 'Vraag over coaching', value: 'vraag' },
            { label: 'Zakelijke aanvraag', value: 'zakelijk' },
            { label: 'Anders', value: 'anders' },
          ],
        },
        {
          name: 'message',
          label: 'Bericht',
          type: 'textarea',
          required: true,
          placeholder: 'Je bericht...',
        },
        {
          name: 'privacy',
          label: 'Ik ga akkoord met de privacyverklaring',
          type: 'checkbox',
          required: true,
        },
      ],
      submitLabel: 'Versturen',
    });

    // Create FAQ section
    const faqSection = createFAQSection({
      title: 'FAQ',
      displayTitle: 'Veelgestelde vragen',
      background: 'yellow',
      items: [
        {
          question: 'Hoe verloopt een kennismakingsgesprek?',
          answer:
            'Een kennismakingsgesprek duurt ongeveer 30 minuten en is vrijblijvend. Tijdens dit gesprek bespreken we je vraag of doel, licht ik toe hoe ik werk en bepalen we of er een klik is. Na het gesprek beslis je of je een coachingstraject wilt starten.',
        },
        {
          question: 'Waar vinden de coaching sessies plaats?',
          answer:
            'Coaching sessies vinden plaats in mijn praktijkruimte in Amsterdam. Online coaching via video call is ook mogelijk, bijvoorbeeld als je verder weg woont of als je agenda het lastig maakt om fysiek af te spreken.',
        },
        {
          question: 'Wat kost een coachingssessie?',
          answer:
            'Een individuele coaching sessie kost €150,- inclusief BTW voor particulieren. Voor zakelijke cliënten gelden andere tarieven. Complete coachingstrajecten worden tegen een voordelig pakketprijs aangeboden. Kijk op de pagina "Coaching" voor meer informatie.',
        },
        {
          question: 'Hoe snel kan ik terecht?',
          answer:
            'Voor een kennismakingsgesprek kun je meestal binnen 1-2 weken terecht. De wachttijd voor het starten van een coachingstraject is gemiddeld 2-3 weken. In urgente situaties probeer ik altijd ruimte te maken.',
        },
      ],
    });

    // Create location/route section
    const routeSection = createContentSection({
      title: 'Locatie',
      displayTitle: 'Routebeschrijving',
      background: 'pink',
      content: [
        '**Met de auto**',
        'Er is betaald parkeren in de buurt van de praktijk. De dichtstbijzijnde parkeergarage is Parkeergarage Centrum op 5 minuten loopafstand.',
        '',
        '**Met het openbaar vervoer**',
        'De praktijk is goed bereikbaar met het openbaar vervoer:',
        '- Trein: 10 minuten lopen vanaf Amsterdam Centraal',
        '- Tram: Lijn R en 3 stoppen op 2 minuten loopafstand (halte Coaching)',
        '- Bus: Lijn 15 en 22 stoppen op 5 minuten loopafstand (halte Coachingplein)',
        '',
        '**Toegankelijkheid**',
        'De praktijkruimte is toegankelijk voor rolstoelgebruikers. Er is een lift aanwezig in het gebouw.',
      ],
    });

    // 3. Replace all sections on the contact page with our new sections
    await updatePageSections('contactPage', [
      heroSection,
      contactInfoSection,
      formSection,
      faqSection,
      routeSection,
    ]);

    console.log('✨ Successfully created/updated contact page!');
  } catch (error) {
    handlePageCreationError(error, 'Error creating/updating contact page');
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createContactPage();
}

// Export for use in other modules
export { createContactPage };
