import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ossawayas | Automatisation IA pour TPE et PME",
  description: "Automatisez plusieurs heures de travail répétitif par semaine. Ossawayas crée des systèmes IA et d'automatisation sur mesure pour les TPE, Artisans, Indépendants, PME.",
  keywords: ["automatisation", "IA", "intelligence artificielle", "TPE", "PME", "Artisans", "Indépendants", "Make", "n8n", "agent IA"],
  openGraph: {
    title: "Ossawayas | Automatisation IA pour TPE, Artisans, Indépendants, PME",
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
      <body className={inter.variable} suppressHydrationWarning>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
