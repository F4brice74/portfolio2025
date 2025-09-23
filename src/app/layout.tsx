import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fabrice MIQUET-SAGE | Developpeur & Catalyseur de projets digitaux",
  description: "Portfolio et blog de Fabrice MIQUET-SAGE - FullStack Developpeur & Catalyseur de projets digitaux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-mantine-color-scheme="light">
        <head>
        </head>
        <body className={inter.variable} suppressHydrationWarning>
          <MantineProvider defaultColorScheme="light">
            <Navbar />
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
