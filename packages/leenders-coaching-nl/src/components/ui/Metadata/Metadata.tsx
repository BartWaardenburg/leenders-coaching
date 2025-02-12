import { type FC } from 'react';
import Head from 'next/head';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    siteName?: string;
    image?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: string;
      'max-snippet'?: number;
    };
  };
  baseUrl?: string;
  pathname?: string;
}

/**
 * Component for managing SEO metadata and social sharing tags
 */
export const Metadata: FC<MetadataProps> = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
  robots,
  baseUrl = 'https://www.leenderscoaching.nl',
  pathname = '/',
}) => {
  const url = `${baseUrl}${pathname}`;

  // Merge with OpenGraph defaults
  const og = {
    ...openGraph,
    url: openGraph?.url || url,
    type: openGraph?.type || 'website',
  };

  // Ensure image URLs are absolute
  if (og.image?.url && !og.image.url.startsWith('http')) {
    og.image.url = `${baseUrl}${og.image.url}`;
  }
  if (twitter?.image?.url && !twitter.image.url.startsWith('http')) {
    twitter.image.url = `${baseUrl}${twitter.image.url}`;
  }

  return (
    <Head>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={url} />

      {/* OpenGraph metadata */}
      <meta property="og:title" content={og.title} />
      <meta property="og:description" content={og.description} />
      <meta property="og:type" content={og.type} />
      <meta property="og:url" content={og.url} />
      {og.siteName && <meta property="og:site_name" content={og.siteName} />}
      {og.image && (
        <>
          <meta property="og:image" content={og.image.url} />
          {og.image.width && (
            <meta
              property="og:image:width"
              content={og.image.width.toString()}
            />
          )}
          {og.image.height && (
            <meta
              property="og:image:height"
              content={og.image.height.toString()}
            />
          )}
          {og.image.alt && (
            <meta property="og:image:alt" content={og.image.alt} />
          )}
        </>
      )}

      {/* Twitter metadata */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card} />
          {twitter.site && <meta name="twitter:site" content={twitter.site} />}
          {twitter.creator && (
            <meta name="twitter:creator" content={twitter.creator} />
          )}
          {twitter.image && (
            <>
              <meta name="twitter:image" content={twitter.image.url} />
              {twitter.image.alt && (
                <meta name="twitter:image:alt" content={twitter.image.alt} />
              )}
            </>
          )}
        </>
      )}

      {/* Robots metadata */}
      {robots && (
        <>
          <meta
            name="robots"
            content={`${robots.index ? 'index' : 'noindex'}, ${
              robots.follow ? 'follow' : 'nofollow'
            }`}
          />
          {robots.googleBot && (
            <>
              <meta
                name="googlebot"
                content={`${robots.googleBot.index ? 'index' : 'noindex'}, ${
                  robots.googleBot.follow ? 'follow' : 'nofollow'
                }`}
              />
              {robots.googleBot['max-video-preview'] !== undefined && (
                <meta
                  name="googlebot-video"
                  content={`max-video-preview:${robots.googleBot['max-video-preview']}`}
                />
              )}
              {robots.googleBot['max-image-preview'] && (
                <meta
                  name="googlebot-image"
                  content={`max-image-preview:${robots.googleBot['max-image-preview']}`}
                />
              )}
              {robots.googleBot['max-snippet'] !== undefined && (
                <meta
                  name="googlebot-news"
                  content={`max-snippet:${robots.googleBot['max-snippet']}`}
                />
              )}
            </>
          )}
        </>
      )}
    </Head>
  );
};
