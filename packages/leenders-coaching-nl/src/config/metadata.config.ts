export const metadataConfig = {
  default: {
    title: 'Simone Leenders Coaching',
    description:
      'Persoonlijke coaching en begeleiding voor een betere versie van jezelf. Ontdek hoe ik je kan helpen om je doelen te bereiken.',
    keywords: [
      'coaching',
      'persoonlijke ontwikkeling',
      'loopbaancoaching',
      'leiderschap',
      'stress management',
      'werk-privé balans',
      'mindfulness',
      'persoonlijke groei',
      'carrière advies',
      'life coaching',
    ],
  },
  pages: {
    home: {
      title: 'Home | Simone Leenders Coaching',
      description:
        'Welkom bij Simone Leenders Coaching. Ontdek hoe persoonlijke coaching je kan helpen om je doelen te bereiken en je leven te verbeteren.',
    },
    about: {
      title: 'Over mij | Simone Leenders Coaching',
      description:
        'Leer meer over mijn achtergrond, ervaring en passie voor coaching. Ontdek hoe ik anderen help om hun volledige potentieel te bereiken.',
    },
    services: {
      title: 'Diensten | Simone Leenders Coaching',
      description:
        "Bekijk mijn coaching diensten en programma's. Van persoonlijke ontwikkeling tot loopbaancoaching, ik help je om je doelen te bereiken.",
    },
    blog: {
      title: 'Blog | Simone Leenders Coaching',
      description:
        'Lees meer over persoonlijke ontwikkeling, coaching tips en inzichten op mijn blog.',
    },
    contact: {
      title: 'Contact | Simone Leenders Coaching',
      description:
        'Neem contact met me op voor een vrijblijvend kennismakingsgesprek of meer informatie over mijn coaching diensten.',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.leenders-coaching.nl',
    siteName: 'Simone Leenders Coaching',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Simone Leenders Coaching',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
} as const;
