import { Container, SimpleGrid, Box, Text, Title, ThemeIcon, Card } from '@mantine/core';
import {
  IconPhone, IconFileText, IconCode, IconPackage,
} from '@tabler/icons-react';
import SectionHeader from '@/components/landing/SectionHeader';

const steps = [
  {
    icon: IconPhone,
    title: 'Appel découverte',
    desc: '30 min gratuits. On identifie votre besoin réel ensemble.',
  },
  {
    icon: IconFileText,
    title: 'Proposition',
    desc: 'Devis clair sous 48h. Prix fixe, zéro surprise.',
  },
  {
    icon: IconCode,
    title: 'Développement',
    desc: 'Je construis la solution avec des points réguliers.',
  },
  {
    icon: IconPackage,
    title: 'Livraison',
    desc: 'Formation incluse. Support pendant 1 mois.',
  },
];

export default function ProcessSection() {
  return (
    <Box
      id="processus"
      py={{ base: 72, md: 96 }}
      className="section-bg-alt"
      style={{ borderTop: '1px solid var(--ossawayas-border)' }}
    >
      <Container size="lg">
        <SectionHeader
          label="Méthode"
          title="Comment ça se passe ?"
          description="Un processus simple et transparent, du premier contact à la livraison."
        />

        <Box pos="relative">
          <Box
            visibleFrom="md"
            pos="absolute"
            top={36}
            left="12%"
            right="12%"
            h={2}
            style={{ zIndex: 0, backgroundColor: 'var(--ossawayas-border)' }}
          />

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" pos="relative" style={{ zIndex: 1 }}>
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} padding="lg" radius="lg" withBorder shadow="sm" style={{ backgroundColor: 'var(--ossawayas-card)' }}>
                  <ThemeIcon size={48} radius="xl" variant="filled" color="navy" mb="md">
                    <Icon size={22} />
                  </ThemeIcon>
                  <Title order={3} size="h4" mb="xs">{step.title}</Title>
                  <Text c="dimmed" size="sm" lh={1.6}>{step.desc}</Text>
                </Card>
              );
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
