import { Container, SimpleGrid, Box, Text, Title, ThemeIcon, Stack } from '@mantine/core';
import {
  IconPhone, IconFileText, IconSettings, IconRocket,
} from '@tabler/icons-react';

const steps = [
  {
    icon: <IconPhone size={24} />,
    number: '1',
    title: 'Appel découverte',
    desc: '30 min gratuits. On identifie votre besoin.',
  },
  {
    icon: <IconFileText size={24} />,
    number: '2',
    title: 'Proposition',
    desc: 'Devis clair sous 48h. Prix fixe, zéro surprise.',
  },
  {
    icon: <IconSettings size={24} />,
    number: '3',
    title: 'Développement',
    desc: 'Je construis la solution avec des points réguliers.',
  },
  {
    icon: <IconRocket size={24} />,
    number: '4',
    title: 'Livraison',
    desc: 'Formation incluse. Support 1 mois inclus.',
  },
];

export default function ProcessSection() {
  return (
    <Box id="processus" py={80} bg="gray.0">
      <Container size="lg">

        <Box ta="center" mb={48}>
          <Title order={2} mb="sm">Comment ça se passe ?</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Un processus simple et transparent, du premier contact à la livraison
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {steps.map((step, i) => (
            <Stack key={i} align="flex-start" gap="sm">
              <ThemeIcon size={48} radius="xl" variant="filled" color="blue">
                {step.icon}
              </ThemeIcon>
              <Title order={3} size="h4">{step.title}</Title>
              <Text c="dimmed" size="sm">{step.desc}</Text>
            </Stack>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}
