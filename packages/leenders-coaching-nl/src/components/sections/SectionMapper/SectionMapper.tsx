import { SectionHeader } from '@/components/sections/SectionHeader';
import { SectionContent } from '@/components/sections/SectionContent';
import { SectionCards } from '@/components/sections/SectionCards';
import { Card } from '@/components/ui/Card';
import type { Section, SectionMapperProps } from './types';

const isHeaderSection = (section: unknown): section is Extract<Section, { _type: 'sectionHeader' }> =>
  typeof section === 'object' &&
  section !== null &&
  '_type' in section &&
  section._type === 'sectionHeader';

const isContentSection = (section: unknown): section is Extract<Section, { _type: 'sectionContent' }> =>
  typeof section === 'object' &&
  section !== null &&
  '_type' in section &&
  section._type === 'sectionContent';

const isCardSection = (section: unknown): section is Extract<Section, { _type: 'sectionCards' }> =>
  typeof section === 'object' &&
  section !== null &&
  '_type' in section &&
  section._type === 'sectionCards';

/**
 * Maps Sanity sections to their corresponding React components
 */
export const SectionMapper = ({ sections }: SectionMapperProps) => {
  if (!sections) return null;

  return (
    <>
      {sections.map((section, index) => {
        if (!section) return null;

        const sectionKey = section._key || ('title' in section ? section.title : `section-${index}`);

        if (isHeaderSection(section)) {
          return (
            <SectionHeader
              key={sectionKey}
              title={section.displayTitle || section.title}
              description={section.description ?? undefined}
              background={section.background ?? undefined}
              primaryCta={section.cta ?? undefined}
              showBorder={section.showBorder ?? undefined}
              border={section.showBorder ?? undefined}
            />
          );
        }

        if (isContentSection(section)) {
          return (
            <SectionContent
              key={sectionKey}
              title={section.displayTitle || section.title}
              background={section.background ?? undefined}
              border={section.showBorder ?? undefined}
              maxWidth={section.maxWidth ?? undefined}
              showBorder={section.showBorder ?? undefined}
              contentRaw={typeof section.contentRaw === 'string' ? JSON.parse(section.contentRaw) : section.contentRaw}
            />
          );
        }

        if (isCardSection(section)) {
          return (
            <SectionCards
              key={sectionKey}
              title={section.displayTitle || section.title}
              background={section.background ?? undefined}
              border={section.showBorder ?? undefined}
            >
              {section.cards?.map((card) => {
                if (!card) return null;
                return (
                  <Card
                    key={card._key}
                    title={card.title}
                    slug={card.cta?.href ?? undefined}
                    image={card.image?.asset?.url ?? undefined}
                    variant={section.background ?? undefined}
                  />
                );
              })}
            </SectionCards>
          );
        }

        return null;
      })}
    </>
  );
}; 