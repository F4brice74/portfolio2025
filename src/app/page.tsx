'use client';

import { AppShell } from '@mantine/core';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ImpactMetrics from '@/components/landing/ImpactMetrics';
import OffersSection from '@/components/landing/OffersSection';
import ProcessSection from '@/components/landing/ProcessSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <AppShell header={{ height: 72 }} padding={0}>
      <Header />
      <AppShell.Main>
        <Hero />
        <ImpactMetrics />
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
