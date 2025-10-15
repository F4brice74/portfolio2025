import { Box, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import Link from 'next/link';

/**
 * Page 404 pour les projets factory inexistants
 */
export default function FactoryProjectNotFound() {
    return (
        <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)', paddingTop: 80 }}>
            <Container size="md" py="xl">
                <Box ta="center">
                    <Title order={1} size="h1" mb="md" c="blue">
                        404
                    </Title>
                    <Title order={2} size="h2" mb="md">
                        Projet non trouvé
                    </Title>
                    <Text size="lg" c="dimmed" mb="xl">
                        Le projet que vous recherchez n&apos;existe pas ou a été supprimé.
                    </Text>
                    <Group justify="center" gap="md">
                        <Button
                            component={Link}
                            href="/"
                            leftSection={<IconArrowLeft size={16} />}
                            variant="outline"
                        >
                            Retour à l&apos;accueil
                        </Button>
                        <Button
                            component={Link}
                            href="/"
                            leftSection={<IconHome size={16} />}
                        >
                            Accueil
                        </Button>
                    </Group>
                </Box>
            </Container>
        </Box>
    );
}

