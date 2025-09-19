import { Box, Container, Title, Text, Button, Group } from "@mantine/core"
import { IconArrowLeft, IconHome } from "@tabler/icons-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
            <Container size="md" py="xl">
                <Box ta="center">
                    <Title order={1} size="h1" mb="md" c="blue">
                        404
                    </Title>
                    <Title order={2} size="h2" mb="md">
                        Article non trouvé
                    </Title>
                    <Text size="lg" c="dimmed" mb="xl">
                        L'article que vous recherchez n'existe pas ou a été supprimé.
                    </Text>

                    <Group justify="center" gap="md">
                        <Button
                            component={Link}
                            href="/blog"
                            leftSection={<IconArrowLeft size={16} />}
                            variant="outline"
                        >
                            Retour au blog
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
    )
}
