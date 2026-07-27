import { Container, SimpleGrid, Card, Text, Box } from '@mantine/core';
import { IconQuote } from '@tabler/icons-react';
import SectionHeader from '@/components/landing/SectionHeader';

const testimonials = [
  {
    quote: 'Le diagnostic a immédiatement révélé deux processus chronophages. En trois semaines, tout était automatisé.',
    name: 'Client fondateur',
    role: 'Artisan · BTP',
  },
  {
    quote: 'Un accompagnement clair et sans jargon. On comprend exactement ce qui est mis en place et pourquoi.',
    name: 'Client fondateur',
    role: 'PME · Commerce',
  },
  {
    quote: 'Le suivi régulier et la formation finale font toute la différence. On est autonomes derrière.',
    name: 'Client fondateur',
    role: 'Profession libérale',
  },
];

export default function TestimonialsSection() {
  return (
    <Box
      py={{ base: 72, md: 96 }}
      className="section-bg-alt"
      style={{ borderTop: '1px solid var(--ossawayas-border)' }}
    >
      <Container size="lg">
        <SectionHeader
          label="Témoignages"
          title="Ce que disent nos clients"
          description="Ils ont automatisé leur activité avec Ossawayas."
        />

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {testimonials.map((t) => (
            <Card key={t.role} shadow="sm" padding="xl" radius="lg" withBorder style={{ display: 'flex', flexDirection: 'column' }}>
              <IconQuote size={28} color="var(--ossawayas-accent)" style={{ opacity: 0.4 }} />
              <Text mt="md" mb="xl" lh={1.7} style={{ flexGrow: 1 }}>
                {t.quote}
              </Text>
              <Box pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                <Text fw={600} size="sm" className="font-heading">
                  {t.name}
                </Text>
                <Text size="xs" c="dimmed" mt={4}>{t.role}</Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
