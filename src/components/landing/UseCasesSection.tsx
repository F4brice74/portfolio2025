import Image from 'next/image';
import { Container, SimpleGrid, Card, Text, Title, Box, Stack, Group } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

const useCases = [
  {
    // Photo : charpentier/artisan sur chantier — Unsplash @greysonjoralemon
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=280&fit=crop&auto=format',
    alt: 'Artisan BTP sur un chantier',
    title: 'Artisan BTP',
    before: '20 devis envoyés, 8 sans réponse, aucune relance',
    after: 'Relances automatiques J+3 et J+7, +3 chantiers signés par mois',
  },
  {
    // Photo : responsable boutique au comptoir — Unsplash @christianw
    photo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&auto=format',
    alt: 'Responsable de PME commerce',
    title: 'PME Commerce',
    before: 'Qualification manuelle des leads, 2h/jour sur le téléphone',
    after: 'Formulaire qualifié + agent IA + agenda automatique, 0 appel non qualifié',
  },
  {
    // Photo : professionnel libéral en réunion — Unsplash @austindistel
    photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=280&fit=crop&auto=format',
    alt: 'Professionnel libéral en consultation',
    title: 'Professionnel libéral',
    before: 'Relances de paiement oubliées, retards de trésorerie',
    after: 'Séquence email automatique, taux de recouvrement +40%',
  },
];

export default function UseCasesSection() {
  return (
    <Box id="cas-usage" py={80}>
      <Container size="lg">

        <Box ta="center" mb={48}>
          <Title order={2} mb="sm">Ce que ça change concrètement</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Des résultats mesurables pour nos clients
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {useCases.map((uc, i) => (
            <Card key={i} shadow="sm" padding={0} radius="md" withBorder style={{ overflow: 'hidden' }}>
              <Box style={{ position: 'relative', height: 180 }}>
                <Image
                  src={uc.photo}
                  alt={uc.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Box>
              <Box p="xl">
              <Title order={3} mb="md">{uc.title}</Title>

              <Stack gap="md">
                {/* Before */}
                <Box>
                  <Group gap="xs" mb={6}>
                    <IconX size={16} color="var(--mantine-color-red-6)" />
                    <Text fw={600} c="red.6" size="sm">Avant</Text>
                  </Group>
                  <Text size="sm" c="dimmed">{uc.before}</Text>
                </Box>

                <Box
                  style={{ height: 1, backgroundColor: 'var(--mantine-color-gray-2)' }}
                />

                {/* After */}
                <Box>
                  <Group gap="xs" mb={6}>
                    <IconCheck size={16} color="var(--mantine-color-green-6)" />
                    <Text fw={600} c="green.6" size="sm">Après</Text>
                  </Group>
                  <Text size="sm" fw={600}>{uc.after}</Text>
                </Box>
              </Stack>
              </Box>
            </Card>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}
