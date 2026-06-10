import { Container, SimpleGrid, Card, Text, Title, Box, Stack, Group, Badge } from '@mantine/core';
import {
  IconX, IconCheck,
} from '@tabler/icons-react';

const useCases = [
  {
    emoji: '🏗️',
    title: 'Artisan BTP',
    before: '20 devis envoyés, 8 sans réponse, aucune relance',
    after: 'Relances automatiques J+3 et J+7, +3 chantiers signés par mois',
  },
  {
    emoji: '🏪',
    title: 'PME Commerce',
    before: 'Qualification manuelle des leads, 2h/jour sur le téléphone',
    after: 'Formulaire qualifié + agent IA + agenda automatique, 0 appel non qualifié',
  },
  {
    emoji: '💼',
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
            <Card key={i} shadow="sm" padding="xl" radius="md" withBorder>
              <Text size="2.5rem" mb="sm">{uc.emoji}</Text>
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
            </Card>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}
