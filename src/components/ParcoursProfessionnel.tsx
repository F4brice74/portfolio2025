import { Box, Container, Stack, Title, Text, Flex, Badge } from "@mantine/core"
import { IconCalendar } from "@tabler/icons-react"

export default function ParcoursProfessionnel() {
    const timelineData = [
        { year: "2006", title: "CEO - réalisateur", entreprise: "MT FILMS", desc: "Création d'un studio de production audiovisuelle, gestion d'entreprise et réalisation de projets" },
        { year: "2015", title: "Chef de projet", entreprise: "L'ATELIER", desc: "Evénémentiel & scénographie" },
        { year: "2018", title: "Chef de projet", entreprise: "SIGNATURE COMMUNICAITON", desc: "Agence de communication globale " },
        { year: "2020", title: "Chef de projet 360", entreprise: "FREELANCE", desc: "Projets de communication globaux (print, web, photos, vidéos" },
        { year: "2021", title: "Software developer", entreprise: "AD SOFTWARE", desc: "Développement de solutions SAAS pour l'aéronautique" },
    ]

    return (
        <Box id="blog" py={60} style={{ backgroundColor: "var(--mantine-color-gray-1)" }}>
            <Container size="xl">
                <Stack align="center" gap={48}>
                    <Stack align="center" gap={16}>
                        <Title order={2} size={36} c="var(--mantine-color-gray-9)">
                            Parcours Professionnel
                        </Title>
                        <Text c="var(--mantine-color-gray-6)">Une évolution constante vers l'excellence technique</Text>
                    </Stack>

                    <Box style={{ width: "100%", maxWidth: 1000 }}>
                        <Flex direction="column" gap={32}>
                            {/* Ligne principale */}
                            <Box style={{ position: "relative" }}>
                                {/* Ligne horizontale */}
                                <Box
                                    style={{
                                        height: 2,
                                        backgroundColor: "var(--mantine-color-blue-6)",
                                        width: "100%",
                                        position: "relative",
                                    }}
                                />

                                {/* Points et contenus */}
                                <Flex justify="space-between" style={{ position: "absolute", top: -12, width: "100%" }}>
                                    {timelineData.map((item, index) => (
                                        <Box key={index} style={{ position: "relative", textAlign: "left" }}>
                                            {/* Point */}
                                            <Box
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: "50%",
                                                    backgroundColor: "var(--mantine-color-blue-6)",
                                                    border: "3px solid var(--mantine-color-gray-0)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: "relative",
                                                    zIndex: 2,
                                                }}
                                            >
                                                <IconCalendar size={12} color="white" />
                                            </Box>

                                            {/* Contenu */}
                                            <Stack gap={8} mt={24} style={{ minWidth: 160 }}>
                                                <Badge variant="filled" color="blue" size="lg">
                                                    {item.year}
                                                </Badge>
                                                <Text fw={600} c="var(--mantine-color-gray-9)" size="sm">
                                                    {item.title}
                                                </Text>
                                                <Text fw={800} c="var(--mantine-color-gray-9)" size="sm">
                                                    {item.entreprise.toUpperCase()}
                                                </Text>
                                                <Text size="xs" c="var(--mantine-color-gray-6)" style={{ lineHeight: 1.4 }}>
                                                    {item.desc}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}
