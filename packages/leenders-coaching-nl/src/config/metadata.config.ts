export type MetadataConfig = {
  title: string;
  description: string;
  keywords?: string[];
  openGraph: {
    title: string;
    description: string;
    type?: "website" | "article" | "profile";
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
    card?: "summary" | "summary_large_image" | "app" | "player";
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
      "max-video-preview"?: number;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
};

export const defaultMetadata: MetadataConfig = {
  title: "Leenders Coaching",
  description:
    "Professional coaching services to help you achieve your goals and unlock your full potential.",
  keywords: [
    "coaching",
    "personal development",
    "professional coaching",
    "life coach",
  ],
  openGraph: {
    title: "Leenders Coaching",
    description:
      "Professional coaching services to help you achieve your goals and unlock your full potential.",
    type: "website",
    siteName: "Leenders Coaching",
    image: {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Leenders Coaching",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@leenderscoaching",
    creator: "@leenderscoaching",
    image: {
      url: "/twitter-image.jpg",
      alt: "Leenders Coaching",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
