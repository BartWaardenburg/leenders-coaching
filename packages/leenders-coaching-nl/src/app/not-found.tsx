import type { Metadata } from 'next';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { SectionFeatured } from '@/components/sections/SectionFeatured';
import { generateMetadata as generateMetadataUtil } from '@/utilities/metadata/metadata';

/* Import the hummingbird image from assets */
import hummingbirdImage from '@/assets/images/hummingbird-symbol-resilience.png';

/**
 * Generate metadata for the 404 page
 */
export const generateMetadata = async (): Promise<Metadata> =>
  generateMetadataUtil({
    title: 'Pagina niet gevonden',
    description:
      "De pagina die je zoekt bestaat niet. Laat je niet ontmoedigen, er zijn nog veel andere waardevolle pagina's om te ontdekken.",
    noindex: true,
    type: 'website',
  });

/**
 * Custom 404 Not Found page
 * Provides a user-friendly error page with helpful navigation options
 */
export default function NotFound() {
  return (
    <main>
      <SectionHeader
        title="Oeps! Deze pagina bestaat niet"
        description="Het lijkt erop dat je op zoek bent naar iets dat er niet meer is. Geen zorgen, er zijn genoeg andere manieren om je coaching reis voort te zetten."
        ctas={[
          {
            label: 'Terug naar Home',
            href: '/',
            variant: 'black',
          },
        ]}
      />

      <SectionFeatured
        title="Laat je niet ontmoedigen"
        description="Net zoals een kolibrie zich niet laat tegenhouden door obstakels, kun jij ook doorgaan met je persoonlijke groei. Er zijn talloze andere pagina's en hulpmiddelen die je kunnen helpen bij je coaching reis."
        image={hummingbirdImage}
        background="purple"
        reverse
        cta={{
          label: 'Ontdek Meer',
          href: '/aanpak',
          variant: 'black',
        }}
      />
    </main>
  );
}
