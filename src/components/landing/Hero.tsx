import { Container, Title, Text, Button, Group, Badge, Box, Paper } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box pt={120} pb={80}>
      <Container size="lg">
        <Box maw={800} mx="auto" style={{ textAlign: 'center' }}>

          {/* Social proof badge */}
          <Group justify="center" mb="lg">
            <Badge size="lg" variant="light" color="green" radius="xl">
              ✓ 3 clients accompagnés · 100% satisfaction
            </Badge>
          </Group>

          {/* H1 */}
          <Title order={1} mb="lg" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            Automatisez <strong>plusieurs heures</strong> de travail par semaine.
          </Title>

          {/* Subtitle */}
          <Text size="xl" c="dimmed" maw={620} mx="auto" mb={40} lh={1.7}>
            Ossawayas crée des systèmes IA et d'automatisation sur mesure pour les TPE, Artisans, Indépendants, PME.

          </Text>
          <Text size="xl" c="dimmed" maw={620} mx="auto" mb={40} lh={1.7}>
            Vous <strong>gagnez du temps</strong>, vos équipes se concentrent sur ce qui compte vraiment.
          </Text>

          {/* CTAs */}
          <Group justify="center" align="center" gap="lg" wrap="wrap">
            <Button
              component={Link}
              href="#contact"
              size="xl"
              radius="md"
            >
              Réserver un appel gratuit
            </Button>
            <Button
              component={Link}
              href="#offres"
              variant="subtle"
              size="xl"
              radius="md"
              rightSection={<IconArrowRight size={18} />}
            >
              Voir les offres
            </Button>
          </Group>

          {/* Visual placeholder */}
          {/* <Paper
            withBorder
            radius="lg"
            p="xl"
            mt={60}
            maw={560}
            mx="auto"
            style={{
              border: '2px dashed var(--mantine-color-gray-3)',
              backgroundColor: 'var(--mantine-color-gray-0)',
              textAlign: 'center',
            }}
          >
            <Text size="3rem" mb="xs">⚙️ → 🤖 → ✅</Text>
            <Text size="sm" c="dimmed">Illustration : flux automatisé — à intégrer</Text>
          </Paper> */}

        </Box>
      </Container>
    </Box>
  );
}
