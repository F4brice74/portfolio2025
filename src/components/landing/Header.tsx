'use client';

import { AppShell, Group, Button, Burger, Drawer, Stack, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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

  return (
    <>
      <AppShell.Header
        style={{
          backgroundColor: 'var(--ossawayas-bg)',
          borderBottom: '1px solid var(--ossawayas-border)',
        }}
      >
        <Group h="100%" px={{ base: 'md', sm: 'xl' }} justify="space-between" maw={1152} mx="auto" w="100%">
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
