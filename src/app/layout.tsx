import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { createOssawayasTheme } from '@/theme/ossawayas';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const theme = createOssawayasTheme({
  body: inter.style.fontFamily,
  heading: fraunces.style.fontFamily,
});

export const metadata: Metadata = {
  title: "Ossawayas — Automatisation IA pour TPE et PME",
  description: "Ossawayas conçoit des systèmes d'IA et d'automatisation sur mesure pour les TPE, artisans, indépendants et PME. Gagnez plusieurs heures par semaine.",
  keywords: ["automatisation", "IA", "intelligence artificielle", "TPE", "PME", "Artisans", "Indépendants", "Make", "n8n", "agent IA"],
  openGraph: {
    title: "Ossawayas — Automatisation IA pour TPE et PME",
    description: "Automatisez plusieurs heures de travail répétitif par semaine avec des solutions sur mesure.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-mantine-color-scheme="light">
      <head />
      <body className={`${inter.variable} ${fraunces.variable} ${inter.className}`} suppressHydrationWarning>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
