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
      style: 'normal',
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
      style: 'normal',
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
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Bezoek onze ',
        },
        {
          _type: 'span',
          text: 'website',
          marks: ['link-1'],
        },
        {
          _type: 'span',
          text: ' voor meer informatie.',
        },
      ],
      markDefs: [
        {
          _key: 'link-1',
          _type: 'link',
          href: 'https://leenders-coaching.nl',
        },
      ],
    },
  ],
  multiple: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Dit is de eerste paragraaf van de tekst.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Dit is de tweede paragraaf met meer informatie.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'En dit is de derde paragraaf die de tekst afsluit.',
        },
      ],
    },
  ],
  allFeatures: [
    {
      _type: 'block',
      style: 'h1',
      children: [{ _type: 'span', text: 'Alle PortableText Functies' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Dit verhaal toont alle beschikbare functies van de PortableText component. ',
        },
        { _type: 'span', marks: ['strong'], text: 'Vetgedrukte tekst, ' },
        { _type: 'span', marks: ['em'], text: 'cursieve tekst, ' },
        { _type: 'span', marks: ['underline'], text: 'onderstreepte tekst, ' },
        { _type: 'span', marks: ['strike'], text: 'doorgestreepte tekst, ' },
        { _type: 'span', marks: ['highlight'], text: 'gemarkeerde tekst, ' },
        { _type: 'span', marks: ['code'], text: 'inline code' },
        { _type: 'span', text: '.' },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Links' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'We ondersteunen ' },
        {
          _type: 'span',
          marks: ['link-1'],
          text: 'interne links',
        },
        { _type: 'span', text: ' en ' },
        {
          _type: 'span',
          marks: ['link-2'],
          text: 'externe links',
        },
        { _type: 'span', text: '.' },
      ],
      markDefs: [
        {
          _key: 'link-1',
          _type: 'link',
          href: '#',
        },
        {
          _key: 'link-2',
          _type: 'link',
          href: 'https://example.com',
          blank: true,
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Lijsten' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Ongeordende lijst item 1' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Ongeordende lijst item 2' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [{ _type: 'span', text: 'Geordende lijst item 1' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [{ _type: 'span', text: 'Geordende lijst item 2' }],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Citaat' }],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: 'Dit is een citaat met opgemaakte inhoud. ' },
        {
          _type: 'span',
          marks: ['em'],
          text: 'Het kan ook opgemaakte tekst bevatten.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Code Blok' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'code',
          code: `function hallo() {
  console.log('Hallo, wereld!');
}`,
          language: 'javascript',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Call to Action' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'callToAction',
          text: 'Klik hier!',
          url: '#',
          isExternal: false,
        },
      ],
    },
  ],
  headings: [
    {
      _type: 'block',
      style: 'h1',
      children: [{ _type: 'span', text: 'Kop 1' }],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Kop 2' }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Kop 3' }],
    },
    {
      _type: 'block',
      style: 'h4',
      children: [{ _type: 'span', text: 'Kop 4' }],
    },
    {
      _type: 'block',
      style: 'h5',
      children: [{ _type: 'span', text: 'Kop 5' }],
    },
    {
      _type: 'block',
      style: 'h6',
      children: [{ _type: 'span', text: 'Kop 6' }],
    },
  ],
  richText: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Deze tekst bevat ' },
        { _type: 'span', marks: ['strong'], text: 'vetgedrukte tekst' },
        { _type: 'span', text: ', ' },
        { _type: 'span', marks: ['em'], text: 'cursieve tekst' },
        { _type: 'span', text: ', ' },
        { _type: 'span', marks: ['underline'], text: 'onderstreepte tekst' },
        { _type: 'span', text: ', ' },
        { _type: 'span', marks: ['strike'], text: 'doorgestreepte tekst' },
        { _type: 'span', text: ', en ' },
        { _type: 'span', marks: ['highlight'], text: 'gemarkeerde tekst' },
        { _type: 'span', text: '.' },
      ],
    },
  ],
  lists: [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Ongeordende Lijst' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Eerste item' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Tweede item' }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Geordende Lijst' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [{ _type: 'span', text: 'Eerste item' }],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [{ _type: 'span', text: 'Tweede item' }],
    },
  ],
  complexNested: [
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Complexe Geneste Inhoud' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Deze paragraaf heeft ' },
        {
          _type: 'span',
          marks: ['strong', 'em'],
          text: 'vetgedrukte en cursieve tekst',
        },
        { _type: 'span', text: ' en ' },
        {
          _type: 'span',
          marks: ['underline', 'highlight'],
          text: 'onderstreepte en gemarkeerde tekst',
        },
        { _type: 'span', text: '.' },
      ],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        { _type: 'span', text: 'Een citaat met ' },
        { _type: 'span', marks: ['strong'], text: 'vetgedrukte tekst' },
        { _type: 'span', text: ' en ' },
        { _type: 'span', marks: ['em'], text: 'cursieve tekst' },
        { _type: 'span', text: '.' },
      ],
    },
  ],
  longForm: [
    {
      _type: 'block',
      style: 'h1',
      children: [{ _type: 'span', text: 'Uitgebreid Inhoud Voorbeeld' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Dit is de eerste paragraaf van ons uitgebreide inhoud voorbeeld. Het demonstreert hoe de PortableText component langere inhoud behandelt met verschillende opmaak opties. Hier kunnen we ',
        },
        { _type: 'span', marks: ['strong'], text: 'vetgedrukte tekst' },
        { _type: 'span', text: ', ' },
        { _type: 'span', marks: ['em'], text: 'cursieve tekst' },
        { _type: 'span', text: ', en zelfs ' },
        { _type: 'span', marks: ['underline'], text: 'onderstreepte tekst' },
        {
          _type: 'span',
          text: ' allemaal binnen dezelfde paragraaf zien. We ondersteunen ook ',
        },
        { _type: 'span', marks: ['highlight'], text: 'gemarkeerde inhoud' },
        { _type: 'span', text: ' en ' },
        { _type: 'span', marks: ['code'], text: 'inline code fragmenten' },
        {
          _type: 'span',
          text: ' om de inhoud boeiender en informatief te maken.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      children: [{ _type: 'span', text: 'Geavanceerde Opmaak en Links' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'De tweede paragraaf verkent meer geavanceerde opmaak mogelijkheden. We kunnen ',
        },
        {
          _type: 'span',
          marks: ['link-1'],
          text: 'interne links',
        },
        {
          _type: 'span',
          text: ' maken die binnen de site navigeren, evenals ',
        },
        {
          _type: 'span',
          marks: ['link-2'],
          text: 'externe links',
        },
        {
          _type: 'span',
          text: ' die in nieuwe tabs openen. De component ondersteunt ook ',
        },
        { _type: 'span', marks: ['strike'], text: 'doorgestreepte tekst' },
        {
          _type: 'span',
          text: ' voor correcties en updates. Wanneer we meerdere opmaak stijlen willen benadrukken, kunnen we ze combineren zoals ',
        },
        {
          _type: 'span',
          marks: ['strong', 'em'],
          text: 'vetgedrukt en cursief samen',
        },
        { _type: 'span', text: ' of zelfs ' },
        {
          _type: 'span',
          marks: ['underline', 'highlight'],
          text: 'onderstreepte en gemarkeerde tekst',
        },
        { _type: 'span', text: ' voor maximale nadruk.' },
      ],
      markDefs: [
        {
          _key: 'link-1',
          _type: 'link',
          href: '#',
        },
        {
          _key: 'link-2',
          _type: 'link',
          href: 'https://example.com',
          blank: true,
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Lijsten en Gestructureerde Inhoud' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Onze derde paragraaf introduceert gestructureerde inhoud door lijsten en andere elementen. De PortableText component blinkt uit in het renderen van zowel ongeordende als geordende lijsten, waardoor het perfect is voor het maken van uitgebreide documentatie, tutorials, of elke inhoud die duidelijke organisatie vereist.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Eerste ongeordende lijst item met gedetailleerde informatie',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [
        { _type: 'span', text: 'Tweede item met ' },
        { _type: 'span', marks: ['strong'], text: 'opgemaakte tekst' },
        { _type: 'span', text: ' binnen de lijst' },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          text: 'Eerste geordende lijst item voor stap-voor-stap inhoud',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      listItem: 'number',
      children: [
        { _type: 'span', text: 'Tweede geordende item met ' },
        { _type: 'span', marks: ['em'], text: 'nadruk' },
        { _type: 'span', text: ' en ' },
        { _type: 'span', marks: ['code'], text: 'code' },
      ],
    },
    {
      _type: 'block',
      style: 'h4',
      children: [{ _type: 'span', text: 'Citaten en Speciale Elementen' }],
    },
    {
      _type: 'block',
      style: 'blockquote',
      children: [
        {
          _type: 'span',
          text: 'Dit is een citaat dat demonstreert hoe de component geciteerde inhoud behandelt. Het kan ',
        },
        { _type: 'span', marks: ['strong'], text: 'opgemaakte tekst' },
        { _type: 'span', text: ' en ' },
        { _type: 'span', marks: ['em'], text: 'nadruk' },
        {
          _type: 'span',
          text: ' bevatten, net als gewone paragraven, waardoor het perfect is voor testimonials, citaties, of benadrukte inhoud.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'De vierde paragraaf vervolgt onze verkenning van inhoudstypen. Hier kunnen we zien hoe de component langere tekstblokken behandelt terwijl leesbaarheid en juiste spatiëring behouden blijven. Het typografie systeem zorgt ervoor dat inhoud leesbaar blijft op verschillende schermformaten en apparaten, waardoor het perfect is voor responsief webdesign.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h5',
      children: [{ _type: 'span', text: 'Code Blokken en Technische Inhoud' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'code',
          code: `// Voorbeeld code blok
function verwerkInhoud(inhoud) {
  return inhoud
    .filter(item => item._type === 'block')
    .map(blok => ({
      ...blok,
      verwerkt: true
    }));
}

const resultaat = verwerkInhoud(portableTextInhoud);
console.log('Verwerkte inhoud:', resultaat);`,
          language: 'javascript',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'De vijfde en laatste paragraaf rondt ons uitgebreide voorbeeld af. Dit demonstreert hoe de PortableText component uitgebreide inhoud kan behandelen terwijl consistente styling en juiste semantische structuur behouden blijven. Of je nu blog posts, documentatie, of elke andere lange inhoud maakt, de component biedt de flexibiliteit en betrouwbaarheid die nodig is voor professionele webapplicaties.',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'callToAction',
          text: 'Verken Meer Functies',
          url: '#',
          isExternal: false,
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
      sections[]-> {
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
        email: 'simone@leenders-coaching.nl',
        phone: '+31 6 12345678',
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
