import { Container, SimpleGrid, Box, Text, Title } from '@mantine/core';

const metrics = [
  { value: '10h', label: 'économisées par semaine' },
  { value: '100%', label: 'satisfaction client' },
  { value: '3×', label: 'ROI moyen constaté' },
  { value: '< 5 sem.', label: 'délai de livraison' },
];

export default function ImpactMetrics() {
  return (
    <Box py={48} bg="gray.0">
      <Container size="lg">
        <SimpleGrid cols={{ base: 2, sm: 4 }}>
          {metrics.map((m, i) => (
            <Box key={i} ta="center">
              <Title order={2} c="blue.6" mb={4} style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                {m.value}
              </Title>
              <Text c="dimmed" size="sm">{m.label}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
