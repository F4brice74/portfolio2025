import {
  Container, Title, Text, Button, Group, Badge, Box,
} from '@mantine/core';
import { IconArrowRight, IconShieldCheck } from '@tabler/icons-react';
import Link from 'next/link';

const stats = [
  { value: '10h', label: 'économisées par semaine' },
  { value: '100%', label: 'satisfaction client' },
  { value: '3×', label: 'ROI moyen constaté' },
  { value: '< 5 sem.', label: 'délai de livraison' },
];

export default function Hero() {
  return (
    <Box pos="relative" pt={100} pb={64} className="section-bg" style={{ overflow: 'hidden' }}>
      <Box className="hero-grid-bg" aria-hidden />

      <Container size="lg" pos="relative" style={{ zIndex: 1 }}>
        <Box maw={720} mx="auto" ta="center">
          <Group justify="center" mb="lg">
            <Badge
              size="lg"
              variant="outline"
              color="gray"
              radius="xl"
              leftSection={<IconShieldCheck size={14} color="var(--ossawayas-success)" />}
              styles={{ root: { backgroundColor: 'var(--ossawayas-card)', borderColor: 'var(--ossawayas-border)' } }}
            >
              3 clients accompagnés · 100% satisfaction
            </Badge>
          </Group>

          <Title
            order={1}
            mb="lg"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
            }}
          >
            Automatisez plusieurs heures de travail{' '}
            <Text span c="brand.5" inherit>par semaine.</Text>
          </Title>

          <Text size="lg" c="gray.7" maw={580} mx="auto" mb={36} lh={1.7}>
            Ossawayas conçoit des systèmes d&apos;IA et d&apos;automatisation sur mesure
            pour les TPE, artisans, indépendants et PME. Vous gagnez du temps,
            vos équipes se concentrent sur ce qui compte vraiment.
          </Text>

          <Group justify="center" gap="md" wrap="wrap">
            <Button
              component={Link}
              href="/#contact"
              size="lg"
              color="brand"
              rightSection={<IconArrowRight size={16} />}
            >
              Réserver un appel gratuit
            </Button>
            <Button
              component={Link}
              href="/#offres"
              variant="outline"
              size="lg"
              color="gray"
            >
              Voir les offres
            </Button>
          </Group>

          <Text size="xs" c="gray.6" mt="md">
            Sans engagement · Réponse sous 48h
          </Text>
        </Box>

        <Box className="hero-stats-grid" mt={64} maw={900} mx="auto">
          {stats.map((stat) => (
            <Box key={stat.label} className="hero-stats-cell">
              <div className="hero-stats-value">{stat.value}</div>
              <div className="hero-stats-label">{stat.label}</div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
