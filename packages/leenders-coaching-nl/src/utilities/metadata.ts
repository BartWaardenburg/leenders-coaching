import { type Metadata } from "next";
import { defaultMetadata } from "@/config/metadata.config";

type GenerateMetadataOptions = {
  title?: string;
  description?: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  structuredData?: object;
};

type WebsiteStructuredData = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description?: string;
  url: string;
};

type ArticleStructuredData = {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
};

type OrganizationStructuredData = {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  description?: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

/**
 * Generates website structured data
 */
export const generateWebsiteStructuredData = (
  title: string,
  description?: string,
  url?: string,
): WebsiteStructuredData => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: title,
  description,
  url: url || defaultMetadata.openGraph.url || "",
});

/**
 * Generates article structured data
 */
export const generateArticleStructuredData = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): ArticleStructuredData => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image,
  datePublished,
  dateModified,
  author: author
    ? {
        "@type": "Person",
        name: author,
      }
    : undefined,
  publisher: {
    "@type": "Organization",
    name: defaultMetadata.title,
    logo: defaultMetadata.openGraph.image
      ? {
          "@type": "ImageObject",
          url: defaultMetadata.openGraph.image.url,
        }
      : undefined,
  },
});

/**
 * Generates organization structured data
 */
export const generateOrganizationStructuredData = ({
  name,
  description,
  url,
  logo,
  socialLinks,
}: {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  socialLinks?: string[];
}): OrganizationStructuredData => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  description,
  url: url || defaultMetadata.openGraph.url || "",
  logo,
  sameAs: socialLinks,
});

/**
 * Generates metadata for a page, merging with default metadata
 */
export const generateMetadata = ({
  title,
  description,
  images,
  type = "website",
  noindex = false,
  structuredData,
}: GenerateMetadataOptions): Metadata => {
  const pageTitle = title
    ? `${title} | ${defaultMetadata.title}`
    : defaultMetadata.title;

  // Generate default structured data if none provided
  const defaultStructuredData = !structuredData
    ? type === "article"
      ? generateArticleStructuredData({
          title: pageTitle,
          description: description || defaultMetadata.description,
          image: images?.[0]?.url,
        })
      : generateWebsiteStructuredData(
          pageTitle,
          description || defaultMetadata.description,
        )
    : structuredData;

  return {
    title: pageTitle,
    description: description || defaultMetadata.description,
    openGraph: {
      title: pageTitle,
      description: description || defaultMetadata.description,
      type,
      images:
        images ||
        (defaultMetadata.openGraph.image
          ? [defaultMetadata.openGraph.image]
          : undefined),
      siteName: defaultMetadata.openGraph.siteName,
    },
    twitter: {
      card: "summary_large_image",
      site: defaultMetadata.twitter?.site,
      creator: defaultMetadata.twitter?.creator,
      images:
        images ||
        (defaultMetadata.twitter?.image
          ? [defaultMetadata.twitter.image]
          : undefined),
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "script:ld+json": JSON.stringify(defaultStructuredData),
    },
  };
};
