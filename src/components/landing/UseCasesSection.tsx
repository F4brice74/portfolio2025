import {
  Container, SimpleGrid, Card, Text, Title, Box, Stack, Badge, Center, Paper, Group,
} from '@mantine/core';
import { IconX, IconCheck, IconArrowDown, IconClock } from '@tabler/icons-react';
import SectionHeader from '@/components/landing/SectionHeader';

const useCases = [
  {
    title: 'Artisan BTP',
    before: '20 devis envoyés, 8 sans réponse, aucune relance.',
    after: 'Relances automatiques J+3 et J+7, +3 chantiers signés par mois.',
    timeBefore: '15 min × 20 devis = 5 h/semaine en relances manuelles',
    timeSaved: '~4 h/semaine',
    timeDetail: 'Relances et suivis entièrement automatisés',
  },
  {
    title: 'PME Commerce',
    before: 'Qualification manuelle des leads, 2h/jour au téléphone.',
    after: 'Formulaire qualifié + agent IA + agenda automatique, 0 appel non qualifié.',
    timeBefore: '2 h/jour × 5 jours = 10 h/semaine au téléphone',
    timeSaved: '~8 h/semaine',
    timeDetail: 'Seuls les leads qualifiés arrivent dans l\'agenda',
  },
  {
    title: 'Professionnel libéral',
    before: 'Relances de paiement oubliées, retards de trésorerie.',
    after: 'Séquence email automatique, taux de recouvrement +40%.',
    timeBefore: '45 min/jour × 5 jours = ~4 h/semaine en relances',
    timeSaved: '~3 h/semaine',
    timeDetail: 'Suivi des impayés sans intervention manuelle',
  },
];

export default function UseCasesSection() {
  return (
    <Box
      id="cas-usage"
      py={{ base: 72, md: 96 }}
      className="section-bg"
      style={{ borderTop: '1px solid var(--ossawayas-border)' }}
    >
      <Container size="lg">
        <SectionHeader
          label="Résultats"
          title="Ce que ça change concrètement"
          description="Des résultats mesurables, avant et après l'automatisation."
        />

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {useCases.map((uc) => (
            <Card key={uc.title} shadow="sm" padding={0} radius="lg" withBorder style={{ display: 'flex', flexDirection: 'column' }}>
              <Box px="xl" py="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Title order={3} size="h4">{uc.title}</Title>
              </Box>

              <Stack gap="lg" p="xl" style={{ flex: 1 }}>
                <Box>
                  <Badge variant="light" color="red" size="sm" leftSection={<IconX size={12} />} mb="xs">
                    Avant
                  </Badge>
                  <Text size="sm" c="dimmed" lh={1.6} mb="xs">{uc.before}</Text>
                  <Text size="xs" c="red.7" fw={500}>{uc.timeBefore}</Text>
                </Box>

                <Center c="dimmed">
                  <IconArrowDown size={16} />
                </Center>

                <Box>
                  <Badge variant="light" color="green" size="sm" leftSection={<IconCheck size={12} />} mb="xs">
                    Après
                  </Badge>
                  <Text size="sm" fw={500} lh={1.6} mb="xs">{uc.after}</Text>
                </Box>

                <Paper
                  p="md"
                  radius="md"
                  mt="auto"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--ossawayas-success) 10%, white)',
                    border: '1px solid color-mix(in srgb, var(--ossawayas-success) 25%, transparent)',
                  }}
                >
                  <Group gap="xs" mb={4} wrap="nowrap">
                    <IconClock size={16} color="var(--ossawayas-success)" />
                    <Text size="sm" fw={700} c="green.8">
                      Gain estimé : {uc.timeSaved}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed" lh={1.5}>{uc.timeDetail}</Text>
                </Paper>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
