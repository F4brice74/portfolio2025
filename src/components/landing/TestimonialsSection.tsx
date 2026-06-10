import { Container, SimpleGrid, Card, Text, Title, Box, Stack, Paper, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const testimonials = [
  {
    quote: 'À compléter avec les retours des premiers clients fondateurs.',
    author: 'Client 1',
    company: 'Entreprise',
    sector: 'Secteur',
  },
  {
    quote: 'Structure prête — en attente de témoignages réels.',
    author: 'Client 2',
    company: 'Entreprise',
    sector: 'Secteur',
  },
  {
    quote: 'Remplacer ce contenu dès les premiers retours clients.',
    author: 'Client 3',
    company: 'Entreprise',
    sector: 'Secteur',
  },
];

export default function TestimonialsSection() {
  return (
    <Box py={80} bg="gray.0">
      <Container size="lg">

        <Box ta="center" mb={48}>
          <Title order={2} mb="sm">Ce que disent nos clients</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Ils ont automatisé leur activité avec Ossawayas
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {testimonials.map((t, i) => (
            <Card key={i} shadow="sm" padding="xl" radius="md" withBorder>
              <Text size="2rem" c="blue.5" lh={1} mb="xs">&ldquo;</Text>
              <Text c="dimmed" fs="italic" style={{ flexGrow: 1 }} mb="md">
                {t.quote}
              </Text>
              <Box pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                <Text fw={600}>{t.author}</Text>
                <Text size="sm" c="dimmed">{t.company} · {t.sector}</Text>
              </Box>
            </Card>
          ))}
        </SimpleGrid>

        <Alert
          icon={<IconInfoCircle size={16} />}
          mt="xl"
          color="blue"
          variant="light"
          radius="md"
        >
          Section à mettre à jour avec les témoignages des premiers clients
        </Alert>

      </Container>
    </Box>
  );
}
