'use client';

import { AppShell, Group, Button, Burger, Drawer, Stack, Anchor } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { OssawayasLogo } from '@/components/brand/OssawayasLogo';

const navLinks = [
  { href: '/#offres', label: 'Offres' },
  { href: '/#processus', label: 'Processus' },
  { href: '/#cas-usage', label: "Cas d'usage" },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [drawerOpened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const scrolled = scroll.y > 20;

  return (
    <>
      <AppShell.Header
        style={{
          backgroundColor: scrolled ? 'rgba(250, 249, 247, 0.85)' : 'var(--ossawayas-bg)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--ossawayas-border)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: scrolled ? 'var(--mantine-shadow-xs)' : 'none',
        }}
      >
        <Group h="100%" px="xl" justify="space-between" maw={1152} mx="auto" w="100%">
          <Anchor component={Link} href="/" underline="never" aria-label="Ossawayas — Accueil">
            <OssawayasLogo variant="horizontal" height={36} priority />
          </Anchor>

          <Group gap="xl" visibleFrom="md">
            {navLinks.map(link => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                underline="never"
                c="dimmed"
                fw={500}
                size="sm"
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mantine-color-dark-7)')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          <Button component={Link} href="/#contact" color="navy" visibleFrom="md">
            Réserver un appel
          </Button>

          <Burger opened={drawerOpened} onClick={toggle} hiddenFrom="md" aria-label="Ouvrir le menu" />
        </Group>
      </AppShell.Header>

      <Drawer opened={drawerOpened} onClose={close} title="Menu" size="sm">
        <Stack>
          {navLinks.map(link => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              size="md"
              fw={500}
              c="dark"
              underline="never"
              onClick={close}
            >
              {link.label}
            </Anchor>
          ))}
          <Button component={Link} href="/#contact" color="navy" mt="md" onClick={close} fullWidth>
            Réserver un appel
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
