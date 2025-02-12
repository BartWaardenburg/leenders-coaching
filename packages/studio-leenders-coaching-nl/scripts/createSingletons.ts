const { createClient } = require('@sanity/client');
const { config } = require('dotenv');

// Load environment variables
config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false,
  apiVersion: '2023-12-01',
  token: process.env.SANITY_AUTH_TOKEN,
});

type SanityDocument = {
  _id: string;
  _type: string;
  [key: string]: any;
};

const documents: SanityDocument[] = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Leenders Coaching',
    description:
      'Transformeer je leven door persoonlijke coaching en professionele begeleiding.',
  },
  {
    _id: 'navigation',
    _type: 'navigation',
    items: [
      {
        _key: 'home',
        _type: 'navigationItem',
        label: 'Home',
        href: '/',
      },
      {
        _key: 'about',
        _type: 'navigationItem',
        label: 'Over mij',
        href: '/over-mij',
      },
      {
        _key: 'coaching',
        _type: 'navigationItem',
        label: 'Coaching',
        href: '/coaching',
      },
      {
        _key: 'approach',
        _type: 'navigationItem',
        label: 'Aanpak',
        href: '/aanpak',
      },
      {
        _key: 'blog',
        _type: 'navigationItem',
        label: 'Blog',
        href: '/blog',
      },
      {
        _key: 'contact',
        _type: 'navigationItem',
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
  {
    _id: 'footer',
    _type: 'footer',
    copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    contact: {
      _type: 'footerContact',
      email: 'info@leenderscoaching.nl',
      phone: '+31 6 12345678',
    },
    socialLinks: [
      {
        _key: 'instagram',
        _type: 'socialLink',
        platform: 'instagram',
        url: 'https://instagram.com/leenderscoaching',
      },
      {
        _key: 'linkedin',
        _type: 'socialLink',
        platform: 'linkedin',
        url: 'https://linkedin.com/in/simoneleenders',
      },
    ],
  },
  {
    _id: 'menuFooter',
    _type: 'menuFooter',
    about: {
      _type: 'menuFooterAbout',
      title: 'Over Leenders Coaching',
      description: 'Persoonlijke coaching voor duurzame gedragsverandering.',
    },
    contact: {
      _type: 'menuFooterContact',
      title: 'Contact',
      projectEnquiry: {
        _type: 'menuFooterEnquiry',
        label: 'Project aanvraag',
        href: '/contact',
        linkText: 'Formulier',
      },
      generalEnquiry: {
        _type: 'menuFooterEnquiry',
        label: 'Algemene vraag',
        href: 'mailto:info@leenderscoaching.nl',
        linkText: 'Stuur een bericht',
      },
    },
  },
  {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home',
    slug: {
      _type: 'slug',
      current: '/',
    },
  },
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'Over Mij',
    slug: {
      _type: 'slug',
      current: 'over-mij',
    },
  },
  {
    _id: 'coachingPage',
    _type: 'coachingPage',
    title: 'Coaching',
    slug: {
      _type: 'slug',
      current: 'coaching',
    },
  },
  {
    _id: 'approachPage',
    _type: 'approachPage',
    title: 'Aanpak',
    slug: {
      _type: 'slug',
      current: 'aanpak',
    },
  },
  {
    _id: 'blogPage',
    _type: 'blogPage',
    title: 'Blog',
    slug: {
      _type: 'slug',
      current: 'blog',
    },
  },
  {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact',
    slug: {
      _type: 'slug',
      current: 'contact',
    },
  },
];

async function createSingletons() {
  console.log('🚀 Creating singleton documents...');

  try {
    for (const doc of documents) {
      const { _id, _type } = doc;
      const exists = await client.fetch('*[_id == $id][0]', { id: _id });

      if (!exists) {
        console.log(`Creating ${_type} document...`);
        await client.create(doc);
        console.log(`Created ${_type} successfully!`);
      } else {
        console.log(`${_type} document already exists.`);
      }
    }
    console.log('✨ All singleton documents created successfully!');
  } catch (error) {
    console.error('Error creating singleton documents:', error);
    process.exit(1);
  }
}

createSingletons();
