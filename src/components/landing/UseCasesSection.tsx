import {
  Container, Card, Text, Title, Box, Stack, Group, ThemeIcon, Badge, Paper, Grid, Center,
} from '@mantine/core';
import {
  IconHammer, IconBuildingStore, IconBriefcase,
  IconX, IconCheck, IconBolt, IconArrowRight, IconArrowDown,
} from '@tabler/icons-react';
import SectionHeader from '@/components/landing/SectionHeader';

const useCases = [
  {
    icon: IconHammer,
    sector: 'Artisan BTP',
    task: 'Relance des devis',
    before: {
      hours: 5,
      actions: [
        { label: 'Repérer les devis restés sans réponse', time: '20 min' },
        { label: 'Rédiger et envoyer chaque relance', time: '2 h 30' },
        { label: 'Rappeler les clients un par un', time: '1 h 30' },
        { label: 'Tenir le tableur de suivi à jour', time: '40 min' },
      ],
    },
    after: {
      hours: 1,
      solution: 'Séquence de relance automatique à J+3 et J+7',
      benefits: [
        'Chaque devis relancé au bon moment, sans oubli',
        'Statut de chaque devis à jour en temps réel',
        'Plus de chantiers signés, meilleure expérience client',
      ],
      residual: 'Il ne vous reste que les cas particuliers à traiter.',
    },
  },
  {
    icon: IconBuildingStore,
    sector: 'PME Commerce',
    task: 'Qualification des leads',
    before: {
      hours: 10,
      actions: [
        { label: 'Appeler chaque nouveau contact', time: '5 h' },
        { label: 'Écarter les demandes hors cible', time: '2 h' },
        { label: 'Reporter les infos dans le CRM', time: '1 h 30' },
        { label: 'Caler les rendez-vous par téléphone', time: '1 h 30' },
      ],
    },
    after: {
      hours: 2,
      solution: 'Formulaire qualifiant + agent IA + prise de rendez-vous en ligne',
      benefits: [
        'Seuls les leads qualifiés arrivent dans votre agenda',
        'Fiche CRM remplie automatiquement',
        'Réponse au prospect en moins de 2 minutes',
      ],
      residual: 'Vous ne passez plus que les appels déjà qualifiés.',
    },
  },
  {
    icon: IconBriefcase,
    sector: 'Profession libérale',
    task: 'Relance des impayés',
    before: {
      hours: 4,
      actions: [
        { label: 'Pointer les factures échues', time: '1 h' },
        { label: 'Écrire chaque relance à la main', time: '1 h 30' },
        { label: 'Relancer par téléphone', time: '1 h' },
        { label: 'Mettre à jour le suivi de trésorerie', time: '30 min' },
      ],
    },
    after: {
      hours: 1,
      solution: 'Séquence email automatique à J+7, J+15 et J+30',
      benefits: [
        'Relance déclenchée dès la date d\'échéance dépassée',
        'Tableau de bord des impayés en temps réel',
        'Taux de recouvrement +40 %',
      ],
      residual: 'Vous n\'intervenez plus que sur les litiges.',
    },
  },
];

const RED = 'var(--mantine-color-red-6)';
const GREEN = 'var(--ossawayas-success)';

function Panel({
  tone, label, hours, ratio, children,
}: {
  tone: 'before' | 'after';
  label: string;
  hours: number;
  ratio: number;
  children: React.ReactNode;
}) {
  const isBefore = tone === 'before';
  const accent = isBefore ? RED : GREEN;

  return (
    <Paper
      p="lg"
      radius="md"
      h="100%"
      style={{
        backgroundColor: `color-mix(in srgb, ${accent} 4%, var(--ossawayas-card))`,
        border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
      }}
    >
      <Group justify="space-between" mb={8} wrap="nowrap">
        <Badge
          variant="light"
          color={isBefore ? 'red' : 'green'}
          size="sm"
          leftSection={isBefore ? <IconX size={12} /> : <IconCheck size={12} />}
        >
          {label}
        </Badge>
        <Text size="sm" fw={700} style={{ color: accent }}>
          {hours} h / semaine
        </Text>
      </Group>

      <Box
        mb="md"
        style={{ height: 6, borderRadius: 999, backgroundColor: 'var(--ossawayas-secondary)' }}
      >
        <Box
          style={{
            width: `${ratio * 100}%`,
            height: '100%',
            borderRadius: 999,
            backgroundColor: accent,
          }}
        />
      </Box>

      {children}
    </Paper>
  );
}

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
          description="Le détail d'une tâche chronophage, l'automatisation mise en place et le temps récupéré."
        />

        <Stack gap="lg">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            const saved = uc.before.hours - uc.after.hours;
            return (
              <Card
                key={uc.sector}
                className="uc-card"
                shadow="sm"
                padding="xl"
                radius="lg"
                withBorder
              >
                <Group justify="space-between" align="center" mb="lg" gap="md">
                  <Group gap="md" wrap="nowrap">
                    <ThemeIcon size={44} radius="md" variant="light" color="navy">
                      <Icon size={22} />
                    </ThemeIcon>
                    <Box>
                      <Text
                        size="xs"
                        fw={700}
                        c="dimmed"
                        tt="uppercase"
                        style={{ letterSpacing: '0.08em' }}
                      >
                        {uc.sector}
                      </Text>
                      <Title order={3} size="h4">{uc.task}</Title>
                    </Box>
                  </Group>

                  <Box ta={{ base: 'left', sm: 'right' }}>
                    <Group gap={8} align="baseline" wrap="nowrap">
                      <Text className="uc-figure">−{saved} h</Text>
                      <Text size="sm" c="dimmed">/ semaine</Text>
                    </Group>
                    <Text size="xs" c="dimmed">≈ {saved * 4} h récupérées par mois</Text>
                  </Box>
                </Group>

                <Grid gutter="lg" align="stretch">
                  <Grid.Col span={{ base: 12, md: 5 }}>
                    <Panel tone="before" label="Aujourd'hui" hours={uc.before.hours} ratio={1}>
                      <Stack gap={8}>
                        {uc.before.actions.map((action) => (
                          <Group key={action.label} justify="space-between" gap="sm" wrap="nowrap" align="flex-start">
                            <Group gap={10} wrap="nowrap" align="flex-start">
                              <Box
                                mt={7}
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: '50%',
                                  backgroundColor: `color-mix(in srgb, ${RED} 55%, transparent)`,
                                  flexShrink: 0,
                                }}
                              />
                              <Text size="sm" lh={1.5}>{action.label}</Text>
                            </Group>
                            <Text
                              size="xs"
                              c="dimmed"
                              fw={600}
                              ta="right"
                              style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}
                            >
                              {action.time}
                            </Text>
                          </Group>
                        ))}
                      </Stack>
                    </Panel>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 2 }}>
                    <Center h="100%" py={{ base: 4, md: 0 }}>
                      <ThemeIcon size={34} radius="xl" variant="light" color="navy">
                        <Box visibleFrom="md" style={{ display: 'flex' }}>
                          <IconArrowRight size={18} />
                        </Box>
                        <Box hiddenFrom="md" style={{ display: 'flex' }}>
                          <IconArrowDown size={18} />
                        </Box>
                      </ThemeIcon>
                    </Center>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 5 }}>
                    <Panel
                      tone="after"
                      label="Automatisé"
                      hours={uc.after.hours}
                      ratio={uc.after.hours / uc.before.hours}
                    >
                      <Group gap={10} wrap="nowrap" align="flex-start" mb="sm">
                        <IconBolt
                          size={16}
                          color="var(--ossawayas-brand)"
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        <Text size="sm" fw={600} lh={1.5}>{uc.after.solution}</Text>
                      </Group>

                      <Stack gap={8}>
                        {uc.after.benefits.map((benefit) => (
                          <Group key={benefit} gap={10} wrap="nowrap" align="flex-start">
                            <IconCheck
                              size={14}
                              color={GREEN}
                              style={{ flexShrink: 0, marginTop: 4 }}
                            />
                            <Text size="sm" lh={1.5}>{benefit}</Text>
                          </Group>
                        ))}
                      </Stack>

                      <Text size="xs" c="dimmed" fs="italic" mt="sm">
                        {uc.after.residual}
                      </Text>
                    </Panel>
                  </Grid.Col>
                </Grid>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
