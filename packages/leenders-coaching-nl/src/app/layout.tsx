import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/RootLayout';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://leenders-coaching.nl'
  ),
  title: {
    template: '%s | Leenders Coaching',
    default: 'Leenders Coaching',
  },
  description:
    'Professional life coaching services to help you achieve your goals and transform your life.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Leenders Coaching',
  },
  twitter: {
    card: 'summary_large_image',
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
