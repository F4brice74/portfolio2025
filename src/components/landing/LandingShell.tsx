'use client';

import { AppShell } from '@mantine/core';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

interface LandingShellProps {
  children: React.ReactNode;
}

export default function LandingShell({ children }: LandingShellProps) {
  return (
    <AppShell header={{ height: 64 }} padding={0}>
      <Header />
      <AppShell.Main>
        {children}
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
