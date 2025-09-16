/**
 * Mock data for UI components and stories
 * Contains Dutch content for realistic testing scenarios
 */

export const mockButtonVariants = {
  primary: {
    label: 'Boek een Sessie',
    href: '/contact',
    variant: 'blue' as const,
  },
  secondary: {
    label: 'Meer Informatie',
    href: '/over-mij',
    variant: 'transparent' as const,
  },
  success: {
    label: 'Versturen',
    href: '#',
    variant: 'green' as const,
  },
  warning: {
    label: 'Waarschuwing',
    href: '#',
    variant: 'yellow' as const,
  },
  danger: {
    label: 'Verwijderen',
    href: '#',
    variant: 'red' as const,
  },
};

export const mockFormData = {
  contact: {
    name: 'Jan van der Berg',
    email: 'jan.vandenberg@example.nl',
    phone: '+31 6 12345678',
    subject: 'Vraag over coaching sessies',
    message:
      'Hallo, ik ben geïnteresseerd in jullie coaching diensten. Kunnen we een afspraak maken voor een kennismakingsgesprek?',
  },
  newsletter: {
    email: 'jan.vandenberg@example.nl',
    name: 'Jan van der Berg',
    interests: ['loopbaancoaching', 'persoonlijke-ontwikkeling'],
  },
  feedback: {
    rating: 5,
    comment: 'Uitstekende coaching sessie! Zeer professioneel en behulpzaam.',
    name: 'Marieke van Dijk',
    email: 'marieke@example.nl',
  },
};

export const mockNavigationData = {
  main: [
    {
      label: 'Home',
      href: '/',
      current: true,
    },
    {
      label: 'Over Mij',
      href: '/over-mij',
      current: false,
    },
    {
      label: 'Coaching',
      href: '/coaching',
      current: false,
    },
    {
      label: 'Aanpak',
      href: '/aanpak',
      current: false,
    },
    {
      label: 'Blog',
      href: '/blog',
      current: false,
    },
    {
      label: 'Contact',
      href: '/contact',
      current: false,
    },
  ],
  footer: [
    {
      label: 'Privacy Beleid',
      href: '/privacy',
    },
    {
      label: 'Algemene Voorwaarden',
      href: '/voorwaarden',
    },
    {
      label: 'Cookie Beleid',
      href: '/cookies',
    },
    {
      label: 'Sitemap',
      href: '/sitemap',
    },
  ],
  social: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/janleenders',
      icon: 'linkedin',
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/janleenders',
      icon: 'twitter',
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/leenderscoaching',
      icon: 'facebook',
    },
  ],
};

export const mockAlertData = {
  success: {
    type: 'success' as const,
    title: 'Succesvol Verzonden',
    message:
      'Je bericht is succesvol verzonden. We nemen zo snel mogelijk contact met je op.',
    dismissible: true,
  },
  error: {
    type: 'error' as const,
    title: 'Er is een Fout Opgetreden',
    message:
      'Er is een fout opgetreden bij het versturen van je bericht. Probeer het opnieuw.',
    dismissible: true,
  },
  warning: {
    type: 'warning' as const,
    title: 'Let Op',
    message: 'Controleer je gegevens voordat je het formulier verzendt.',
    dismissible: true,
  },
  info: {
    type: 'info' as const,
    title: 'Informatie',
    message:
      'We zijn momenteel bezig met het verbeteren van onze website. Excuses voor eventuele ongemakken.',
    dismissible: false,
  },
};

export const mockCardData = {
  service: {
    title: 'Loopbaancoaching',
    description:
      'Ontdek nieuwe carrièremogelijkheden en ontwikkel je professionele vaardigheden met onze ervaren coaches.',
    image: 'https://picsum.photos/id/1027/800/500',
    featured: true,
    variant: 'default' as const,
    border: true,
    reverse: false,
  },
  personalCoaching: {
    title: 'Persoonlijke Coaching',
    description:
      'Bereik persoonlijke groei en vervulling door zelfkennis en ontwikkeling.',
    image: 'https://picsum.photos/id/64/800/500',
    featured: false,
    variant: 'purple' as const,
    border: true,
    reverse: false,
  },
  businessCoaching: {
    title: 'Ondernemerscoaching',
    description:
      'Ontwikkel leiderschapsvaardigheden en zakelijk inzicht voor succes.',
    image: 'https://picsum.photos/id/237/800/500',
    featured: false,
    variant: 'teal' as const,
    border: true,
    reverse: false,
  },
  teamCoaching: {
    title: 'Teamcoaching',
    description:
      'Versterk je team en verbeter samenwerking voor betere resultaten.',
    image: 'https://picsum.photos/id/870/800/500',
    featured: false,
    variant: 'green' as const,
    border: true,
    reverse: false,
  },
  testimonial: {
    quote:
      'De coaching sessies hebben mijn carrière getransformeerd. Ik heb duidelijkheid en zelfvertrouwen gekregen.',
    name: 'Marieke van Dijk',
    role: 'Marketing Manager',
    image: 'https://picsum.photos/id/1027/300/300',
  },
  blog: {
    title: '5 Tips voor Effectieve Doelstellingen',
    excerpt:
      'Ontdek hoe je realistische en haalbare doelen stelt die je motiveren om te groeien.',
    slug: '5-tips-voor-effectieve-doelstellingen',
    publishedAt: '2024-01-15',
    author: {
      name: 'Jan Leenders',
      image: 'https://picsum.photos/id/237/80/80',
    },
    image: 'https://picsum.photos/id/1027/800/500',
    category: 'Persoonlijke Ontwikkeling',
  },
};

export const mockModalData = {
  contact: {
    title: 'Neem Contact Op',
    description:
      'Vul het formulier in en we nemen zo snel mogelijk contact met je op.',
    content: 'Contact formulier content hier...',
  },
  confirmation: {
    title: 'Bevestiging',
    description: 'Weet je zeker dat je deze actie wilt uitvoeren?',
    content: 'Deze actie kan niet ongedaan worden gemaakt.',
  },
  success: {
    title: 'Succesvol',
    description: 'Je actie is succesvol uitgevoerd.',
    content:
      'Bedankt voor je inzending. We nemen zo snel mogelijk contact met je op.',
  },
};

export const mockTableData = {
  pricing: [
    {
      package: 'Starter Pakket',
      sessions: '1 sessie',
      duration: '60 minuten',
      price: '€150',
      features: ['Persoonlijke aanpak', 'Follow-up'],
    },
    {
      package: 'Professional Pakket',
      sessions: '4 sessies',
      duration: '60 minuten per sessie',
      price: '€400',
      features: [
        'Persoonlijke coach',
        '24/7 ondersteuning',
        'Progressie rapporten',
      ],
    },
    {
      package: 'Enterprise Pakket',
      sessions: 'Onbeperkt',
      duration: 'Flexibel',
      price: 'Op aanvraag',
      features: ['Team coaching', 'Workshops', 'Maatwerk oplossingen'],
    },
  ],
  testimonials: [
    {
      name: 'Marieke van Dijk',
      role: 'Marketing Manager',
      rating: 5,
      comment: 'Uitstekende coaching sessie!',
      date: '2024-01-15',
    },
    {
      name: 'Pieter de Vries',
      role: 'Ondernemer',
      rating: 5,
      comment: 'Zeer professioneel en behulpzaam.',
      date: '2024-01-10',
    },
    {
      name: 'Sophie Janssen',
      role: 'CEO',
      rating: 5,
      comment: 'Aanrader voor iedereen die wil groeien.',
      date: '2024-01-05',
    },
  ],
};

export const mockFormValidation = {
  required: 'Dit veld is verplicht',
  email: 'Voer een geldig e-mailadres in',
  phone: 'Voer een geldig telefoonnummer in',
  minLength: 'Dit veld moet minimaal {min} karakters bevatten',
  maxLength: 'Dit veld mag maximaal {max} karakters bevatten',
  pattern: 'Dit veld heeft een ongeldig formaat',
};

export const mockLoadingStates = {
  button: {
    loading: true,
    disabled: true,
    label: 'Bezig met versturen...',
  },
  form: {
    loading: true,
    disabled: true,
    message: 'Je gegevens worden verwerkt...',
  },
  page: {
    loading: true,
    message: 'Pagina wordt geladen...',
  },
};
