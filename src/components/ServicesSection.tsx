import { Box, Container, Stack, Card, Text, Title, Group, Flex, Box as MantineBox } from "@mantine/core"
import { IconCode, IconDatabase } from "@tabler/icons-react"

export default function ServicesSection() {
    return (
        <Box py={60} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
            <Container size="md">
                <Stack align="center" gap={48}>
                    <Card
                        shadow="lg"
                        padding="md"
                        radius="md"
                        style={{
                            width: "100%",
                            maxWidth: 1000,
                            backgroundColor: "var(--mantine-color-white)",
                            border: "1px solid var(--mantine-color-gray-3)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Icônes décoratives */}
                        <MantineBox style={{ position: "absolute", top: 16, right: 16, opacity: 0.1 }}>
                            <IconCode size={64} color="var(--mantine-color-gray-6)" />
                        </MantineBox>
                        <MantineBox style={{ position: "absolute", bottom: 16, left: 16, opacity: 0.05 }}>
                            <IconDatabase size={48} color="var(--mantine-color-gray-6)" />
                        </MantineBox>

                        <Stack gap={32} style={{ position: "relative", zIndex: 10 }}>
                            <Group gap={12}>
                                <MantineBox
                                    style={{
                                        padding: 8,
                                        backgroundColor: "var(--mantine-color-blue-6)",
                                        borderRadius: 8,
                                        opacity: 0.1,
                                    }}
                                >
                                    <IconCode size={24} color="var(--mantine-color-blue-6)" />
                                </MantineBox>
                                <Stack gap={4}>
                                    <Title order={3} size={28} c="var(--mantine-color-gray-9)" ta="center">
                                        Mes atouts différenciants
                                    </Title>
                                </Stack>
                            </Group>

                            <Flex direction={{ base: "column", md: "row" }} gap="xl" wrap="wrap">
                                <MantineBox style={{ flex: 1, minWidth: 300 }}>
                                    <Stack gap={20} style={{ lineHeight: 1.6 }}>
                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                🎯 Vision stratégique & opérationnelle
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Fort de plusieurs années en gestion de projet, j'analyse vos enjeux métier pour proposer des solutions alignées sur vos objectifs business et contraintes techniques.
                                            </Text>
                                        </MantineBox>

                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                🤝 Facilitateur de collaboration
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Interface naturelle entre les équipes techniques, les Product Owners et les clients finaux, je traduis les besoins métier en spécifications techniques et vice versa.
                                            </Text>
                                        </MantineBox>

                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                🔄 Agilité & amélioration continue
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Adepte des méthodologies agiles, je cultive un état d'esprit d'amélioration continue qui permet d'ajuster le cap en temps réel et d'optimiser constamment la valeur livrée.
                                            </Text>
                                        </MantineBox>
                                    </Stack>
                                </MantineBox>

                                <MantineBox style={{ flex: 1, minWidth: 300 }}>
                                    <Stack gap={20} style={{ lineHeight: 1.6 }}>
                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                🎨 Approche design-driven & marketing-aware
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Ma sensibilité UX/UI couplée à ma connaissance des enjeux communication et marketing me permet de concevoir des solutions qui répondent autant aux besoins utilisateurs qu'aux objectifs business et de positionnement.
                                            </Text>
                                        </MantineBox>

                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                ⚡ Excellence technique au service du projet
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Maîtrise de TypeScript, React, Node.js et des outils d'IA modernes pour accélérer le développement sans compromettre la qualité.
                                            </Text>
                                        </MantineBox>

                                        <MantineBox>
                                            <Text fw={600} size="lg" mb={8}>
                                                🧠 Curiosité & adaptabilité
                                            </Text>
                                            <Text fw={400} c="var(--mantine-color-gray-6)">
                                                Dans un écosystème tech en constante évolution, ma curiosité naturelle et ma capacité d'adaptation me permettent d'intégrer rapidement les nouvelles technologies au service de vos projets.
                                            </Text>
                                        </MantineBox>
                                    </Stack>
                                </MantineBox>
                            </Flex>

                            {/* Section curiosité en pleine largeur */}
                            <MantineBox mt={16} p={24} style={{ backgroundColor: "var(--mantine-color-gray-0)", borderRadius: 8, border: "1px solid var(--mantine-color-gray-2)" }}>
                                <Text fw={600} size="lg" mb={12} c="var(--mantine-color-gray-9)">
                                    🧠 Ma plus-value dans l'ère de l'IA
                                </Text>
                                <Text fw={400} c="var(--mantine-color-gray-6)" style={{ lineHeight: 1.6 }}>
                                    Alors que l'IA révolutionne la génération de code, ma différenciation réside dans ma capacité à :
                                    <li>
                                        Comprendre et analyser les véritables enjeux métier
                                    </li>
                                    <li>
                                        Orchestrer les projets de bout en bout avec une vision 360°
                                    </li>
                                    <li>
                                        Communiquer efficacement avec tous les stakeholders
                                    </li>
                                    <li>
                                        Anticiper les risques et proposer des solutions proactives
                                    </li>
                                    <li>
                                        Garantir la cohérence entre besoins business et réalisation technique
                                    </li>
                                </Text>
                            </MantineBox>
                        </Stack>
                    </Card>
                </Stack>
            </Container>
        </Box>
    )
}
