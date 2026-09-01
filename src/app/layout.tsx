import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// ‼️ styles du carousel à importer après ceux du package core
import '@mantine/carousel/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import { createOssawayasTheme } from '@/theme/ossawayas';
import { JsonLd } from '@/components/seo/JsonLd';
import { defaultMetadata } from '@/lib/seo/config';
import { buildGraphSchema, organizationSchema, webSiteSchema } from '@/lib/seo/schema';

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

export const metadata: Metadata = defaultMetadata;

const siteSchema = buildGraphSchema(organizationSchema(), webSiteSchema());

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-mantine-color-scheme="light">
      <head>
        <JsonLd data={siteSchema} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} ${inter.className}`} suppressHydrationWarning>
        <ClerkProvider>
          <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
