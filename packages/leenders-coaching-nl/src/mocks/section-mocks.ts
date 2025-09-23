/**
 * Mock data for section components and stories
 * Contains Dutch content for realistic testing scenarios
 */

export const mockHeaderSection = {
  _type: 'sectionHeader',
  title: 'Interne Header Titel',
  displayTitle: 'Welkom bij Leenders Coaching',
  description:
    'Professionele coaching voor persoonlijke en professionele groei. Ontdek je potentieel en bereik je doelen met onze ervaren coaches.',
  background: 'white',
  border: false,
  ctas: [
    {
      _type: 'callToAction',
      label: 'Boek een Sessie',
      href: '/contact',
      variant: 'blue',
      isExternal: false,
    },
    {
      _type: 'callToAction',
      label: 'Meer Informatie',
      href: '/over-mij',
      variant: 'transparent',
      isExternal: false,
    },
  ],
};

export const mockHeaderSectionNoCtas = {
  _type: 'sectionHeader',
  title: 'Interne Header Titel Zonder CTAs',
  displayTitle: 'Welkom bij Leenders Coaching',
  description:
    'Professionele coaching voor persoonlijke en professionele groei. Ontdek je potentieel en bereik je doelen met onze ervaren coaches.',
  background: 'white',
  border: false,
  ctas: [],
};

export const mockContentSection = {
  _type: 'sectionContent',
  title: 'Interne Content Titel',
  displayTitle: 'Over Ons',
  description: 'Meer informatie over onze missie en aanpak in coaching.',
  content: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Bij Leenders Coaching geloven we in de transformerende kracht van professionele coaching. Onze ervaren coaches helpen je om je doelen te bereiken en je volledige potentieel te ontdekken.',
        },
      ],
    },
  ],
  background: 'gray',
  border: true,
};

export const mockCardsSection = {
  _type: 'sectionCards',
  title: 'Interne Cards Titel',
  displayTitle: 'Onze Diensten',
  description: 'Verken ons uitgebreide aanbod van coaching diensten',
  cards: [
    {
      _key: 'card-1',
      title: 'Loopbaancoaching',
      description:
        'Ontdek nieuwe carrièremogelijkheden en ontwikkel je professionele vaardigheden',
      featured: true,
      variant: 'blue' as const,
      border: true,
      reverse: false,
    },
    {
      _key: 'card-2',
      title: 'Persoonlijke Coaching',
      description: 'Werk aan persoonlijke groei en ontwikkel je zelfvertrouwen',
      featured: false,
      variant: 'purple' as const,
      border: true,
      reverse: true,
    },
    {
      _key: 'card-3',
      title: 'Teamcoaching',
      description: 'Versterk je team en verbeter de samenwerking',
      featured: false,
      variant: 'green' as const,
      border: true,
      reverse: false,
    },
    {
      _key: 'card-4',
      title: 'Ondernemerscoaching',
      description:
        'Ontwikkel leiderschapsvaardigheden en zakelijk inzicht voor succes',
      featured: false,
      variant: 'teal' as const,
      border: true,
      reverse: true,
    },
    {
      _key: 'card-5',
      title: 'Stress Management',
      description:
        'Leer effectieve strategieën om stress te beheersen en burn-out te voorkomen',
      featured: false,
      variant: 'pink' as const,
      border: true,
      reverse: false,
    },
    {
      _key: 'card-6',
      title: 'Communicatie Training',
      description:
        'Verbeter je communicatievaardigheden voor betere relaties en samenwerking',
      featured: false,
      variant: 'yellow' as const,
      border: true,
      reverse: true,
    },
  ],
  background: 'white',
  border: false,
};

export const mockFAQSection = {
  _type: 'sectionFAQ',
  title: 'Interne FAQ Titel',
  displayTitle: 'Veelgestelde Vragen',
  description:
    'Antwoorden op de meest gestelde vragen over onze coaching diensten',
  faqs: [
    {
      _key: 'faq-1',
      question: 'Hoe lang duren de coaching sessies?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Onze coaching sessies duren meestal 60-90 minuten, afhankelijk van je behoeften en doelen.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'faq-2',
      question: 'Wat zijn de kosten van coaching?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'De kosten variëren afhankelijk van het type coaching en de duur van het traject. Neem contact met ons op voor een persoonlijke offerte.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'faq-3',
      question: 'Kan ik online coaching krijgen?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ja, we bieden zowel face-to-face als online coaching sessies aan, afhankelijk van je voorkeur en locatie.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'faq-4',
      question: 'Bieden jullie groepscoaching sessies aan?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Ja, we bieden zowel individuele als groepscoaching sessies aan. Groepssessies kunnen een geweldige manier zijn om van anderen te leren en ervaringen te delen.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'faq-5',
      question: 'Wat is jullie annuleringsbeleid?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'We vragen 24 uur van tevoren om annuleringen. Annuleringen met minder dan 24 uur van tevoren kunnen onderworpen zijn aan een annuleringskosten.',
            },
          ],
          style: 'normal',
        },
      ],
    },
    {
      _key: 'faq-6',
      question: 'Hoe bereid ik me voor op mijn eerste sessie?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Voor je eerste sessie, denk na over je doelen en wat je hoopt te bereiken. Je kunt ook eventuele vragen voorbereiden die je hebt over het coachingsproces.',
            },
          ],
          style: 'normal',
        },
      ],
    },
  ],
  background: 'gray',
  border: true,
};

export const mockTestimonialSection = {
  _type: 'sectionTestimonial',
  title: 'Interne Testimonial Titel',
  displayTitle: 'Wat Onze Klanten Zeggen',
  description: 'Echte ervaringen van mensen die hun doelen hebben bereikt',
  testimonials: [
    {
      _key: 'testimonial-1',
      quote:
        'De coaching sessies hebben mijn carrière getransformeerd. Ik heb duidelijkheid en zelfvertrouwen gekregen.',
      name: 'Marieke van Dijk',
      role: 'Marketing Manager',
      image: 'https://picsum.photos/id/1027/300/300',
    },
    {
      _key: 'testimonial-2',
      quote:
        'Werken met Leenders Coaching heeft me geholpen om mijn doelen sneller te bereiken dan ik dacht mogelijk was.',
      name: 'Pieter de Vries',
      role: 'Ondernemer',
      image: 'https://picsum.photos/id/64/300/300',
    },
    {
      _key: 'testimonial-3',
      quote:
        'De inzichten en strategieën die ik heb opgedaan hebben mijn aanpak van leiderschap volledig getransformeerd.',
      name: 'Sophie Janssen',
      role: 'CEO',
      image: 'https://picsum.photos/id/1025/300/300',
    },
  ],
  background: 'blue',
  border: false,
};

export const mockPricingSection = {
  _type: 'sectionPricing',
  title: 'Interne Pricing Titel',
  displayTitle: 'Investering in Je Toekomst',
  description: 'Kies het pakket dat het beste bij je behoeften past',
  packages: [
    {
      title: 'Starter Pakket',
      description: 'Perfect voor eerste stappen in coaching',
      price: '€150',
      features: [
        { text: '60 minuten coaching' },
        { text: 'Persoonlijke aanpak' },
        { text: 'Follow-up na sessie' },
        { text: 'Email ondersteuning' },
      ],
      isPopular: false,
      callToAction: {
        label: 'Boek Nu',
        href: '/contact',
        variant: 'blue' as const,
        isExternal: false,
      },
    },
    {
      title: 'Professional Pakket',
      description: 'Meest populaire keuze voor serieuze groei',
      price: '€400',
      features: [
        { text: '4 sessies per maand' },
        { text: 'Persoonlijke coach' },
        { text: '24/7 ondersteuning' },
        { text: 'Progressie rapporten' },
        { text: 'Extra resources' },
      ],
      isPopular: true,
      callToAction: {
        label: 'Start Nu',
        href: '/contact',
        variant: 'blue' as const,
        isExternal: false,
      },
    },
    {
      title: 'Enterprise Pakket',
      description: 'Voor teams en organisaties',
      price: 'Op aanvraag',
      features: [
        { text: 'Team coaching' },
        { text: 'Workshops' },
        { text: 'Organisatie ontwikkeling' },
        { text: 'Maatwerk oplossingen' },
        { text: 'Dedicated account manager' },
      ],
      isPopular: false,
      callToAction: {
        label: 'Neem Contact Op',
        href: '/contact',
        variant: 'teal' as const,
        isExternal: false,
      },
    },
  ],
  background: 'white',
  border: true,
};

export const mockBlogSection = {
  _type: 'sectionBlog',
  title: 'Interne Blog Titel',
  displayTitle: 'Laatste Inzichten',
  description:
    'Lees onze nieuwste artikelen over coaching en persoonlijke ontwikkeling',
  posts: [
    {
      title: '5 Tips voor Effectieve Doelstellingen',
      description:
        'Ontdek hoe je realistische en haalbare doelen stelt die je motiveren om te groeien.',
      slug: '5-tips-voor-effectieve-doelstellingen',
      date: '2024-01-15',
      categories: ['Persoonlijke Ontwikkeling'],
      image: 'https://picsum.photos/id/1024/800/500',
      featured: true,
      variant: 'blue' as const,
    },
    {
      title: 'De Kracht van Positief Denken',
      description:
        'Leer hoe een positieve mindset je kan helpen om uitdagingen te overwinnen en kansen te grijpen.',
      slug: 'de-kracht-van-positief-denken',
      date: '2024-01-10',
      categories: ['Mindset'],
      image: 'https://picsum.photos/id/64/800/500',
      featured: false,
      variant: 'purple' as const,
    },
    {
      title: 'Balans Tussen Werk en Privé',
      description:
        'Praktische tips voor het vinden van de juiste balans tussen je carrière en persoonlijke leven.',
      slug: 'balans-tussen-werk-en-prive',
      date: '2024-01-05',
      categories: ['Work-Life Balance'],
      image: 'https://picsum.photos/id/1028/800/500',
      featured: false,
      variant: 'teal' as const,
    },
    {
      title: 'Leiderschap in de 21e Eeuw',
      description:
        'Moderne leiderschapsvaardigheden die essentieel zijn voor succes in de huidige werkomgeving.',
      slug: 'leiderschap-in-de-21e-eeuw',
      date: '2024-01-20',
      categories: ['Leiderschap'],
      image: 'https://picsum.photos/id/237/800/500',
      featured: false,
      variant: 'green' as const,
    },
    {
      title: 'Omgaan met Stress en Burnout',
      description:
        'Effectieve strategieën om stress te beheersen en burn-out te voorkomen in je dagelijks leven.',
      slug: 'omgaan-met-stress-en-burnout',
      date: '2024-01-18',
      categories: ['Stress Management'],
      image: 'https://picsum.photos/id/871/800/500',
      featured: false,
      variant: 'pink' as const,
    },
    {
      title: 'Communicatie in Teams',
      description:
        'Verbeter je teamcommunicatie met deze praktische tips en technieken voor betere samenwerking.',
      slug: 'communicatie-in-teams',
      date: '2024-01-12',
      categories: ['Teamwerk'],
      image: 'https://picsum.photos/id/1021/800/500',
      featured: false,
      variant: 'yellow' as const,
    },
    {
      title: 'Persoonlijke Groei door Zelfreflectie',
      description:
        'Ontdek de kracht van zelfreflectie als instrument voor continue persoonlijke ontwikkeling.',
      slug: 'persoonlijke-groei-door-zelfreflectie',
      date: '2024-01-08',
      categories: ['Persoonlijke Groei'],
      image: 'https://picsum.photos/id/62/800/500',
      featured: false,
      variant: 'blue' as const,
    },
    {
      title: 'Professionele Netwerkopbouw',
      description:
        'Strategieën voor het opbouwen en onderhouden van een sterk professioneel netwerk.',
      slug: 'professionele-netwerkopbouw',
      date: '2024-01-03',
      categories: ['Netwerken'],
      image: 'https://picsum.photos/id/238/800/500',
      featured: false,
      variant: 'purple' as const,
    },
  ],
  background: 'gray',
  border: false,
};

export const mockTimelineSection = {
  _type: 'sectionTimeline',
  title: 'Interne Timeline Titel',
  displayTitle: 'Jouw Coaching Reis',
  description: 'Een gestructureerde aanpak om je doelen te bereiken',
  steps: [
    {
      _key: 'step-1',
      title: 'Kennismakingsgesprek',
      description: 'We leren elkaar kennen en bespreken je doelen',
      date: 'Week 1',
      variant: 'blue',
    },
    {
      _key: 'step-2',
      title: 'Doelstellingen Bepalen',
      description: 'We definiëren duidelijke, haalbare doelstellingen',
      date: 'Week 2-3',
      variant: 'purple',
    },
    {
      _key: 'step-3',
      title: 'Actieplan Opstellen',
      description: 'We maken een persoonlijk actieplan voor succes',
      date: 'Week 4',
      variant: 'green',
    },
    {
      _key: 'step-4',
      title: 'Implementatie',
      description: 'We voeren je plan uit met continue ondersteuning',
      date: 'Maand 1-3',
      variant: 'pink',
    },
    {
      _key: 'step-5',
      title: 'Voortgangsbeoordeling',
      description:
        'Regelmatige evaluaties om voortgang te meten en strategie aan te passen',
      date: 'Maandelijks',
      variant: 'teal',
    },
    {
      _key: 'step-6',
      title: 'Doelbereiking',
      description: 'We vieren je succes en stellen nieuwe uitdagingen',
      date: 'Doorlopend',
      variant: 'yellow',
    },
  ],
  background: 'purple',
  border: true,
};

export const mockFeaturedSection = {
  _type: 'sectionFeatured',
  title: 'Interne Featured Titel',
  displayTitle: 'Ontdek Je Potentieel',
  description:
    'Met onze professionele coaching help je jezelf te ontwikkelen en je doelen te bereiken. We bieden persoonlijke begeleiding die aansluit bij jouw unieke situatie en ambities.',
  image: 'https://picsum.photos/id/231/1200/800',
  background: 'white',
  border: false,
  reverse: false,
  cta: {
    href: '/coaching',
    label: 'Start Je Reis',
    variant: 'blue' as const,
  },
};

export const mockCalendarSection = {
  _type: 'sectionCalendar',
  title: 'Interne Calendar Titel',
  displayTitle: 'Plan Je Afspraak',
  description:
    'Kies een datum en tijd die voor jou het beste uitkomt. We bieden flexibele planning voor zowel online als face-to-face coaching sessies.',
  background: 'white',
  border: false,
  initialDate: new Date('2024-03-15'),
};

export const mockFormSection = {
  _type: 'sectionForm',
  title: 'Interne Form Titel',
  displayTitle: 'Neem Contact Op',
  description:
    'Vul het formulier in en we nemen zo snel mogelijk contact met je op. We beantwoorden graag al je vragen over coaching en onze diensten.',
  background: 'white',
  border: false,
  submitLabel: 'Verstuur Bericht',
};
