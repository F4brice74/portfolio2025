import { Box, Container, SimpleGrid, Text, Anchor, Stack, Divider } from '@mantine/core';
import Link from 'next/link';
import { OssawayasLogo } from '@/components/brand/OssawayasLogo';

const navLinks = [
  { href: '/#offres', label: 'Offres' },
  { href: '/#processus', label: 'Processus' },
  { href: '/#cas-usage', label: "Cas d'usage" },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <Box bg="navy.7" c="gray.4" py={56}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb={48}>
          <Stack gap="md">
            <Anchor component={Link} href="/" underline="never" aria-label="Ossawayas — Accueil">
              <OssawayasLogo variant="vertical" height={130} light />
            </Anchor>
            <Text size="sm" c="gray.5" maw={280} lh={1.6}>
              Systèmes d&apos;IA et d&apos;automatisation sur mesure pour TPE, artisans,
              indépendants et PME.
            </Text>
          </Stack>

          <Stack gap="sm">
            <Text fw={600} c="white" size="sm">Navigation</Text>
            {navLinks.map(link => (
              <Anchor key={link.href} component={Link} href={link.href} c="gray.5" size="sm" underline="never">
                {link.label}
              </Anchor>
            ))}
          </Stack>

          <Stack gap="sm">
            <Text fw={600} c="white" size="sm">Contact</Text>
            <Anchor href="mailto:contact@ossawayas.com" c="gray.5" size="sm">
              contact@ossawayas.com
            </Anchor>
          </Stack>
        </SimpleGrid>

        <Divider color="rgba(255,255,255,0.1)" mb="md" />

        <Text ta="center" size="xs" c="gray.6">
          © {new Date().getFullYear()} Ossawayas. Tous droits réservés.
        </Text>
      </Container>
    </Box>
  );
}
