import {
  Container, SimpleGrid, Card, Text, Title, Badge, Button, Box, ThemeIcon, List,
} from '@mantine/core';
import { IconSearch, IconBolt, IconRobot, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import SectionHeader from '@/components/landing/SectionHeader';

const offers = [
  {
    icon: IconSearch,
    title: 'Diagnostic Automatisation',
    price: 'à partir de 490 €',
    description: 'Identifiez les 3 processus qui vous font perdre le plus de temps. Rapport avec scénarios chiffrés et restitution complète.',
    duration: '5 jours',
    cta: 'En savoir plus',
    highlighted: false,
    points: ['Audit de vos processus', 'Scénarios chiffrés', 'Plan d\'action priorisé'],
  },
  {
    icon: IconBolt,
    title: 'Automatisation Clé en Main',
    price: 'à partir de 1 500 €',
    description: 'Un processus douloureux transformé en flux automatisé. Make / n8n, livré documenté et avec formation.',
    duration: '3 à 5 semaines',
    cta: 'Réserver un appel',
    highlighted: true,
    points: ['Solution sur mesure', 'Documentation incluse', 'Formation de vos équipes'],
  },
  {
    icon: IconRobot,
    title: 'Agent IA Sur Mesure',
    price: 'à partir de 2 500 €',
    description: 'Un assistant IA connecté à vos outils métier. Qualification de leads, traitement de demandes, génération de contenus.',
    duration: '6 à 10 semaines',
    cta: 'En savoir plus',
    highlighted: false,
    points: ['IA connectée à vos outils', 'Qualification de leads', 'Support inclus'],
  },
];

export default function OffersSection() {
  return (
    <Box
      id="offres"
      py={{ base: 72, md: 96 }}
      className="section-bg"
      style={{ borderTop: '1px solid var(--ossawayas-border)' }}
    >
      <Container size="lg">
        <SectionHeader
          label="Nos offres"
          title="Ce que je construis pour vous"
          description="Des solutions concrètes pour automatiser votre activité, à votre rythme et selon vos priorités."
        />

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" style={{ overflow: 'visible' }}>
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <Box key={offer.title} pos="relative" pt={offer.highlighted ? 14 : 0}>
                {offer.highlighted && (
                  <Badge
                    color="brand"
                    variant="filled"
                    pos="absolute"
                    top={0}
                    left={28}
                    style={{ zIndex: 2 }}
                  >
                    Recommandé
                  </Badge>
                )}
                <Card
                  shadow={offer.highlighted ? 'md' : 'sm'}
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: offer.highlighted ? 'var(--ossawayas-brand)' : undefined,
                    borderWidth: offer.highlighted ? 2 : 1,
                    overflow: 'visible',
                  }}
                >
                  <ThemeIcon
                    size={44}
                    radius="md"
                    variant={offer.highlighted ? 'filled' : 'light'}
                    color="navy"
                    mb="md"
                  >
                    <Icon size={22} />
                  </ThemeIcon>

                  <Title order={3} mb={4}>{offer.title}</Title>
                  <Text fw={600} size="lg" c="blue.6" mb="sm">{offer.price}</Text>
                  <Text c="dimmed" size="sm" lh={1.6} mb="md">{offer.description}</Text>

                  <List
                    spacing="sm"
                    size="sm"
                    icon={<IconCheck size={16} color="var(--ossawayas-success)" />}
                    mb="md"
                  >
                    {offer.points.map((point) => (
                      <List.Item key={point}>{point}</List.Item>
                    ))}
                  </List>

                  <Text size="xs" c="dimmed" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                    Durée : {offer.duration}
                  </Text>

                  <Button
                    component={Link}
                    href="/#contact"
                    variant={offer.highlighted ? 'filled' : 'outline'}
                    color={offer.highlighted ? 'brand' : 'gray'}
                    fullWidth
                    mt="md"
                  >
                    {offer.cta}
                  </Button>
                </Card>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
