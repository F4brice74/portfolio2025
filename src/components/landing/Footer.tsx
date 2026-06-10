import { Box, Container, SimpleGrid, Text, Anchor, Group, Stack, Divider } from '@mantine/core';
import { IconRobot } from '@tabler/icons-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box bg="dark.8" c="gray.4" py={48}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb={40}>

          {/* Brand */}
          <Stack gap="xs">
            <Group gap="xs">
              <IconRobot size={24} color="var(--mantine-color-blue-4)" />
              <Text fw={700} size="lg" c="white">Ossawayas</Text>
            </Group>
            <Text size="sm">Automatisation IA pour TPE et PME</Text>
          </Stack>

          {/* Navigation */}
          <Stack gap="xs">
            <Text fw={600} c="white" size="sm">Navigation</Text>
            {[
              { href: '#offres', label: 'Offres' },
              { href: '#processus', label: 'Processus' },
              { href: '#cas-usage', label: "Cas d'usage" },
              { href: '#contact', label: 'Contact' },
            ].map(link => (
              <Anchor key={link.href} component={Link} href={link.href} c="gray.5" size="sm" underline="never">
                {link.label}
              </Anchor>
            ))}
          </Stack>

          {/* Contact */}
          <Stack gap="xs">
            <Text fw={600} c="white" size="sm">Contact</Text>
            <Anchor href="mailto:contact@ossawayas.com" c="gray.5" size="sm">
              contact@ossawayas.com
            </Anchor>
          </Stack>

        </SimpleGrid>

        <Divider color="dark.6" mb="md" />

        <Text ta="center" size="xs">
          © {new Date().getFullYear()} Ossawayas. Tous droits réservés.
        </Text>
      </Container>
    </Box>
  );
}
