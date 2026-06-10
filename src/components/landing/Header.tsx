'use client';

import { AppShell, Group, Button, Text, Burger, Drawer, Stack, Anchor } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconRobot } from '@tabler/icons-react';
import Link from 'next/link';

const navLinks = [
  { href: '#offres', label: 'Offres' },
  { href: '#processus', label: 'Processus' },
  { href: '#cas-usage', label: "Cas d'usage" },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [drawerOpened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const scrolled = scroll.y > 20;

  return (
    <>
      <AppShell.Header
        style={{
          boxShadow: scrolled ? 'var(--mantine-shadow-sm)' : '0 1px 0 var(--mantine-color-gray-2)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <Group h="100%" px="xl" justify="space-between">
          {/* Logo */}
          <Anchor component={Link} href="/" underline="never">
            <Group gap="xs">
              <IconRobot size={28} color="var(--mantine-color-blue-6)" />
              <Text fw={700} size="xl" c="dark">Ossawayas</Text>
            </Group>
          </Anchor>

          {/* Nav desktop */}
          <Group gap="xl" visibleFrom="md">
            {navLinks.map(link => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                underline="never"
                c="dimmed"
                fw={500}
                style={{ transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mantine-color-blue-6)')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          {/* CTA desktop */}
          <Button component={Link} href="#contact" visibleFrom="md">
            Réserver un appel
          </Button>

          {/* Burger mobile */}
          <Burger opened={drawerOpened} onClick={toggle} hiddenFrom="md" />
        </Group>
      </AppShell.Header>

      {/* Drawer mobile */}
      <Drawer opened={drawerOpened} onClose={close} title="Menu" size="sm">
        <Stack>
          {navLinks.map(link => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              size="lg"
              fw={500}
              c="dark"
              underline="never"
              onClick={close}
            >
              {link.label}
            </Anchor>
          ))}
          <Button component={Link} href="#contact" mt="md" onClick={close} fullWidth>
            Réserver un appel
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
