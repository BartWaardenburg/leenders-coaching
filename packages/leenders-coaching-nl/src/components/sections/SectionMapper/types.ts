import type { PastelColor } from '@/components/ui/Section';
import type { Maybe } from '@/graphql/generated/graphql';

export type CallToAction = {
  label: string;
  href: string;
};

export type ImageAsset = {
  asset: {
    url: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
};

export type SectionBase = {
  _key: string;
  _type: string;
  title: string;
  displayTitle?: Maybe<string>;
  subtitle?: Maybe<string>;
  background?: Maybe<PastelColor>;
  maxWidth?: Maybe<
    'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  >;
  showBorder?: Maybe<boolean>;
  description?: Maybe<string>;
};

export type HeaderSection = Omit<SectionBase, '_type'> & {
  _type: 'sectionHeader';
  image?: Maybe<ImageAsset>;
  cta?: Maybe<CallToAction>;
};

export type ContentSection = Omit<SectionBase, '_type'> & {
  _type: 'sectionContent';
  contentRaw?: Maybe<string>;
};

export type CardSection = Omit<SectionBase, '_type'> & {
  _type: 'sectionCards';
  cards?: Maybe<
    Array<
      Maybe<{
        _key: string;
        title: string;
        description?: Maybe<string>;
        image?: Maybe<ImageAsset>;
        cta?: Maybe<CallToAction>;
      }>
    >
  >;
};

export type ReferenceSection = {
  _type: 'reference';
  _key: string;
  _ref: string;
};

export type Section =
  | HeaderSection
  | ContentSection
  | CardSection
  | ReferenceSection;

export type SectionMapperProps = {
  sections?: Maybe<Array<Maybe<Section>>> | null;
};
