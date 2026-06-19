import type { Metadata } from 'next';

export const SITE_NAME = 'Ossawayas';
export const SITE_TAGLINE = 'Automatisation IA pour TPE et PME';
export const SITE_DESCRIPTION =
  "Ossawayas conçoit des systèmes d'IA et d'automatisation sur mesure pour les TPE, artisans, indépendants et PME. Gagnez plusieurs heures par semaine.";
export const SITE_LOCALE = 'fr_FR';
export const SITE_EMAIL = 'contact@ossawayas.com';

const PRODUCTION_URL = 'https://ossawayas.com';

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return url || PRODUCTION_URL;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'automatisation',
    'IA',
    'intelligence artificielle',
    'TPE',
    'PME',
    'artisans',
    'indépendants',
    'Make',
    'agent IA',
    'productivité',
  ],
  authors: [{ name: SITE_NAME, url: getSiteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
