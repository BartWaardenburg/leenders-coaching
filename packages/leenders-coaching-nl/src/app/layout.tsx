import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/RootLayout';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://leenders-coaching.nl'
  ),
  title: {
    template: '%s | Leenders Coaching',
    default: 'Leenders Coaching',
  },
  description:
    'Professional life coaching services to help you achieve your goals and transform your life.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Leenders Coaching',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    preconnect: 'https://cdn.sanity.io',
  },
};

type LayoutProps = {
  children: ReactNode;
};

/**
 * App-specific layout that uses the generic RootLayout
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <RootLayout
      fonts={{
        variables: [playfair.variable, montserrat.variable],
      }}
    >
      {children}
    </RootLayout>
  );
}
