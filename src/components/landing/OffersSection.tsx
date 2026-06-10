import {
  Container, SimpleGrid, Card, Text, Title, Badge, Button, Group, Stack, Box,
} from '@mantine/core';
import { IconSearch, IconBolt, IconRobot } from '@tabler/icons-react';
import Link from 'next/link';

const offers = [
  {
    icon: <IconSearch size={40} color="var(--mantine-color-blue-6)" />,
    title: 'Diagnostic Automatisation',
    price: 'à partir de 490 €',
    description: 'Identifiez les 3 processus qui vous font perdre le plus de temps. Rapport avec scénarios chiffrés + restitution.',
    duration: '5 jours',
    cta: 'En savoir plus',
    highlighted: false,
  },
  {
    icon: <IconBolt size={40} color="var(--mantine-color-yellow-6)" />,
    title: 'Automatisation Clé en Main',
    price: 'à partir de 1 500 €',
    description: 'Un processus douloureux transformé en flux automatisé. Make / n8n, livré documenté et formé.',
    duration: '3 à 5 semaines',
    cta: 'Réserver un appel',
    highlighted: true,
  },
  {
    icon: <IconRobot size={40} color="var(--mantine-color-violet-6)" />,
    title: 'Agent IA Sur Mesure',
    price: 'à partir de 2 500 €',
    description: 'Un assistant IA connecté à vos outils métier. Qualification de leads, traitement de demandes, génération de contenus.',
    duration: '6 à 10 semaines',
    cta: 'En savoir plus',
    highlighted: false,
  },
];

export default function OffersSection() {
  return (
    <Box id="offres" py={80}>
      <Container size="lg">

        <Box ta="center" mb={48}>
          <Title order={2} mb="sm">Ce que je construis pour vous</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Des solutions concrètes pour automatiser votre activité
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {offers.map((offer, i) => (
            <Card
              key={i}
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderColor: offer.highlighted ? 'var(--mantine-color-blue-5)' : undefined,
                borderWidth: offer.highlighted ? 2 : 1,
                position: 'relative',
              }}
            >
              {offer.highlighted && (
                <Badge
                  color="blue"
                  variant="filled"
                  style={{ position: 'absolute', top: -12, right: 16 }}
                >
                  Recommandé
                </Badge>
              )}

              <Box mb="md">{offer.icon}</Box>

              <Title order={3} mb="xs">{offer.title}</Title>

              <Text fw={700} size="xl" c="blue.6" mb="sm">{offer.price}</Text>

              <Text c="dimmed" style={{ flexGrow: 1 }} mb="md">{offer.description}</Text>

              <Text size="sm" c="dimmed" pb="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)', paddingTop: 12 }}>
                <strong>Durée :</strong> {offer.duration}
              </Text>

              <Button
                component={Link}
                href="#contact"
                variant={offer.highlighted ? 'filled' : 'outline'}
                fullWidth
                radius="md"
              >
                {offer.cta}
              </Button>
            </Card>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}
