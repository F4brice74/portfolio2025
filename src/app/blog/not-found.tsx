import { Box, Container, Title, Text, Button, Group } from "@mantine/core"
import { IconHome } from "@tabler/icons-react"
import Link from "next/link"
import LandingShell from "@/components/landing/LandingShell"

export default function BlogNotFound() {
    return (
        <LandingShell>
            <Box py={80} style={{ backgroundColor: 'var(--ossawayas-bg)', minHeight: '60vh' }}>
                <Container size="md">
                    <Box ta="center">
                        <Title order={1} size="h1" mb="md" c="navy.7">
                            404
                        </Title>
                        <Title order={2} size="h2" mb="md">
                            Page blog non trouvée
                        </Title>
                        <Text size="lg" c="dimmed" mb="xl">
                            La page du blog que vous recherchez n&apos;existe pas.
                        </Text>

                        <Group justify="center" gap="md">
                            <Button
                                component={Link}
                                href="/blog"
                                variant="outline"
                                color="gray"
                            >
                                Retour au blog
                            </Button>
                            <Button
                                component={Link}
                                href="/"
                                leftSection={<IconHome size={16} />}
                                color="navy"
                            >
                                Accueil
                            </Button>
                        </Group>
                    </Box>
                </Container>
            </Box>
        </LandingShell>
    )
}
