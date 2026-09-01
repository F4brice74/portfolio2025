'use client';

import { AppShell } from '@mantine/core';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import LatestArticlesSection from '@/components/landing/LatestArticlesSection';
import OffersSection from '@/components/landing/OffersSection';
import ProcessSection from '@/components/landing/ProcessSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';
import type { Article } from '@/lib/articles/types';

interface HomePageProps {
  latestArticles: Article[];
}

export default function HomePage({ latestArticles }: HomePageProps) {
  return (
    <AppShell header={{ height: 64 }} padding={0}>
      <Header />
      <AppShell.Main>
        <Hero />
        <LatestArticlesSection articles={latestArticles} />
        <OffersSection />
        <ProcessSection />
        <UseCasesSection />
        <TestimonialsSection />
        <FinalCTA />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
