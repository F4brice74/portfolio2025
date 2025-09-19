import { Box, Container, Title, Text, Button, Group } from "@mantine/core"
import { IconHome } from "@tabler/icons-react"
import Link from "next/link"

export default function BlogNotFound() {
    return (
        <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
            <Container size="md" py="xl">
                <Box ta="center">
                    <Title order={1} size="h1" mb="md" c="blue">
                        404
                    </Title>
                    <Title order={2} size="h2" mb="md">
                        Page blog non trouvée
                    </Title>
                    <Text size="lg" c="dimmed" mb="xl">
                        La page du blog que vous recherchez n'existe pas.
                    </Text>

                    <Group justify="center" gap="md">
                        <Button
                            component={Link}
                            href="/"
                            leftSection={<IconHome size={16} />}
                        >
                            Retour à l'accueil
                        </Button>
                    </Group>
                </Box>
            </Container>
        </Box>
    )
}
