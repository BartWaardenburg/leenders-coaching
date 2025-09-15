/**
 * Mock data for Sanity CMS components and stories
 * Contains Dutch content for realistic testing scenarios
 */

export const mockSanityImage = {
  withMetadata: {
    _type: 'image',
    asset: {
      _ref: 'image-abc123-1920x1080-jpg',
      _type: 'reference',
      metadata: {
        lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        dimensions: {
          width: 1920,
          height: 1080,
          aspectRatio: 1.7777777777777777,
        },
        palette: {
          dominant: {
            background: '#3b82f6',
          },
        },
      },
    },
    hotspot: {
      x: 0.5,
      y: 0.3,
    },
    alt: 'Prachtig landschap met bergen en meer',
  },
  withoutMetadata: {
    _type: 'image',
    asset: {
      _ref: 'image-def456-800x600-jpg',
      _type: 'reference',
    },
    alt: 'Eenvoudige afbeelding zonder metadata',
  },
  withPartialMetadata: {
    _type: 'image',
    asset: {
      _ref: 'image-ghi789-1200x800-jpg',
      _type: 'reference',
      metadata: {
        dimensions: {
          width: 1200,
          height: 800,
          aspectRatio: 1.5,
        },
      },
    },
    alt: 'Afbeelding met gedeeltelijke metadata',
  },
  logo: {
    _type: 'image',
    asset: {
      _ref: 'image-logo-200x50-png',
      _type: 'reference',
      metadata: {
        dimensions: {
          width: 200,
          height: 50,
          aspectRatio: 4,
        },
      },
    },
    alt: 'Leenders Coaching Logo',
  },
  profile: {
    _type: 'image',
    asset: {
      _ref: 'image-jan-400x400-jpg',
      _type: 'reference',
      metadata: {
        dimensions: {
          width: 400,
          height: 400,
          aspectRatio: 1,
        },
      },
    },
    alt: 'Jan Leenders - Coach',
  },
};

export const mockSanityBlock = {
  simple: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Dit is een eenvoudige tekstblok voor testing doeleinden.',
        },
      ],
    },
  ],
  withFormatting: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Dit is een ',
        },
        {
          _type: 'span',
          text: 'vetgedrukte tekst',
          marks: ['strong'],
        },
        {
          _type: 'span',
          text: ' en dit is ',
        },
        {
          _type: 'span',
          text: 'cursieve tekst',
          marks: ['em'],
        },
        {
          _type: 'span',
          text: '.',
        },
      ],
    },
  ],
  withLinks: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Bezoek onze ',
        },
        {
          _type: 'span',
          text: 'website',
          marks: ['link'],
          markDefs: [
            {
              _key: 'link-1',
              _type: 'link',
              href: 'https://leenders-coaching.nl',
            },
          ],
        },
        {
          _type: 'span',
          text: ' voor meer informatie.',
        },
      ],
    },
  ],
  multiple: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Dit is de eerste paragraaf van de tekst.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Dit is de tweede paragraaf met meer informatie.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'En dit is de derde paragraaf die de tekst afsluit.',
        },
      ],
    },
  ],
};

export const mockSanityDocument = {
  page: {
    _id: 'page-home',
    _type: 'page',
    _rev: 'rev-123',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    title: 'Home',
    slug: {
      current: 'home',
    },
    seo: {
      title:
        'Leenders Coaching - Professionele Coaching voor Persoonlijke Groei',
      description:
        'Ontdek je potentieel met professionele coaching. Loopbaancoaching, persoonlijke ontwikkeling en teamcoaching in Amsterdam.',
      keywords: [
        'coaching',
        'loopbaancoaching',
        'persoonlijke ontwikkeling',
        'Amsterdam',
      ],
    },
    content: mockSanityBlock.simple,
    sections: [
      {
        _type: 'sectionHeader',
        title: 'Welkom bij Leenders Coaching',
        displayTitle: 'Ontdek Je Potentieel',
        description:
          'Professionele coaching voor persoonlijke en professionele groei',
        background: 'white',
        border: false,
      },
    ],
  },
  blogPost: {
    _id: 'blog-post-1',
    _type: 'blogPost',
    _rev: 'rev-456',
    _createdAt: '2024-01-15T00:00:00Z',
    _updatedAt: '2024-01-15T00:00:00Z',
    title: '5 Tips voor Effectieve Doelstellingen',
    slug: {
      current: '5-tips-voor-effectieve-doelstellingen',
    },
    excerpt:
      'Ontdek hoe je realistische en haalbare doelen stelt die je motiveren om te groeien.',
    content: mockSanityBlock.multiple,
    author: {
      _ref: 'author-jan',
      _type: 'reference',
    },
    image: mockSanityImage.withMetadata,
    category: 'Persoonlijke Ontwikkeling',
    publishedAt: '2024-01-15T00:00:00Z',
    seo: {
      title: '5 Tips voor Effectieve Doelstellingen - Leenders Coaching',
      description:
        'Leer hoe je realistische en haalbare doelen stelt die je motiveren om te groeien.',
      keywords: ['doelstellingen', 'persoonlijke ontwikkeling', 'coaching'],
    },
  },
  author: {
    _id: 'author-jan',
    _type: 'author',
    _rev: 'rev-789',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    name: 'Jan Leenders',
    bio: 'Ervaren coach met meer dan 10 jaar ervaring in het begeleiden van mensen bij hun persoonlijke en professionele ontwikkeling.',
    image: mockSanityImage.profile,
    social: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/janleenders',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/janleenders',
      },
    ],
  },
};

export const mockSanityQuery = {
  globalData: `
    *[_type == "globalData"][0] {
      header {
        logo,
        navigation[] {
          label,
          href,
          current
        },
        cta {
          label,
          href,
          variant
        }
      },
      footer {
        logo,
        description,
        navigation[] {
          label,
          href
        },
        social[] {
          label,
          href,
          icon
        },
        contact {
          email,
          phone,
          address
        },
        copyright
      },
      seo {
        title,
        description,
        keywords,
        ogImage
      }
    }
  `,
  page: `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      seo,
      content,
      sections[] {
        _type,
        title,
        displayTitle,
        description,
        background,
        border,
        content,
        cards[] {
          _key,
          title,
          description,
          featured,
          variant,
          border,
          reverse
        },
        faqs[] {
          _key,
          question,
          answer
        },
        testimonials[] {
          _key,
          quote,
          name,
          role,
          image
        }
      }
    }
  `,
  blogPosts: `
    *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      content,
      author-> {
        name,
        image
      },
      image,
      category,
      publishedAt,
      seo
    }
  `,
};

export const mockSanityResponse = {
  globalData: {
    header: {
      logo: mockSanityImage.logo,
      navigation: [
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
      cta: {
        label: 'Boek een Sessie',
        href: '/contact',
        variant: 'blue',
      },
    },
    footer: {
      logo: mockSanityImage.logo,
      description:
        'Professionele coaching voor persoonlijke en professionele groei. Ontdek je potentieel en bereik je doelen.',
      navigation: [
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
      contact: {
        email: 'info@leenders-coaching.nl',
        phone: '+31 6 12345678',
        address: 'Coachingstraat 123, 1234 AB Amsterdam',
      },
      copyright: '© 2024 Leenders Coaching. Alle rechten voorbehouden.',
    },
    seo: {
      title:
        'Leenders Coaching - Professionele Coaching voor Persoonlijke Groei',
      description:
        'Ontdek je potentieel met professionele coaching. Loopbaancoaching, persoonlijke ontwikkeling en teamcoaching in Amsterdam.',
      keywords: [
        'coaching',
        'loopbaancoaching',
        'persoonlijke ontwikkeling',
        'Amsterdam',
        'teamcoaching',
      ],
      ogImage: mockSanityImage.withMetadata,
    },
  },
  page: mockSanityDocument.page,
  blogPosts: [
    mockSanityDocument.blogPost,
    {
      ...mockSanityDocument.blogPost,
      _id: 'blog-post-2',
      title: 'De Kracht van Positief Denken',
      slug: {
        current: 'de-kracht-van-positief-denken',
      },
      excerpt:
        'Leer hoe een positieve mindset je kan helpen om uitdagingen te overwinnen en kansen te grijpen.',
      category: 'Mindset',
      publishedAt: '2024-01-10T00:00:00Z',
    },
    {
      ...mockSanityDocument.blogPost,
      _id: 'blog-post-3',
      title: 'Balans Tussen Werk en Privé',
      slug: {
        current: 'balans-tussen-werk-en-prive',
      },
      excerpt:
        'Praktische tips voor het vinden van de juiste balans tussen je carrière en persoonlijke leven.',
      category: 'Work-Life Balance',
      publishedAt: '2024-01-05T00:00:00Z',
    },
  ],
};
