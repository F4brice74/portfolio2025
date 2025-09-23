import { Container, Text, Title, Stack, Box, Image, Flex } from "@mantine/core"

export default function HeroSection() {
    return (
        <Container id="home" size="xl" pt={80} pb={40}>
            <Flex direction={{ base: "column", md: "row" }} gap={48} align="center">
                {/* Photo */}
                <Box style={{ flexShrink: 0 }}>
                    <Box
                        style={{
                            width: 320,
                            height: 380,
                            borderRadius: 8,
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            border: "1px solid var(--mantine-color-gray-3)",
                        }}
                    >
                        <Image
                            src="/MIQUET-SAGE-001-min.png"
                            alt="Fabrice MIQUET-SAGE - Catalyseur de projets"
                            width={320}
                            height={380}
                            fit="cover"
                        />
                    </Box>
                </Box>

                {/* Introduction */}
                <Stack gap={24} style={{ flex: 1 }}>
                    <Stack gap={8}>
                        <Title order={1} size={45} c="var(--mantine-color-gray-9)">
                            Fabrice MIQUET-SAGE
                        </Title>
                        <Title order={2} size={24} c="var(--mantine-color-blue-6)" fw={500}>
                            Développeur Fullstack - Catalyseur de projets digitaux 
                        </Title>
                    </Stack>

                    <Stack gap={16} style={{ lineHeight: 1.6 }}>
                        <Title order={3} size={24}>
                            Transformer vos défis métier en solutions digitales sur mesure
                        </Title>
                        <Text>
                            Passionné par la résolution de problématiques, je me positionne comme un catalyseur de solutions sur l'ensemble de la chaîne de valeur projet : de l'analyse des besoins à la mise en production, en passant par la conception UX/UI et le développement technique.
                            Développeur Fullstack, je maîtrise les technologies modernes pour créer des solutions robustes, évolutives et parfaitement adaptées à vos utilisateurs.
                        </Text>
                        <Title order={3} size={24}>
                            Mon ADN : La vision globale au service de vos projets
                        </Title>
                        <Text>
                            Ce qui me motive, c'est l'effervescence créative des échanges inter-équipes, les sessions de brainstorming avec les clients, et cette alchimie particulière qui naît de la collaboration pour élaborer des solutions innovantes. J'adore ces moments où une idée germe, se nourrit des expertises de chacun, puis prend vie pour devenir une solution concrète. Je peux orchestrer ces dynamiques collaboratives en appréhendant chaque projet sous tous ses angles : technique, fonctionnel, humain et business.
                        </Text>
                        <Title order={3} size={24}>
                            Mon engagement
                        </Title>
                        <Text>
                            Chaque projet est unique. Mon objectif est de vous accompagner dans la concrétisation de vos ambitions digitales en créant des solutions robustes, évolutives et parfaitement adaptées à vos utilisateurs. Que vous soyez une startup en croissance ou une entreprise établie, j'apprécie particulièrement les structures à taille humaine où l'agilité et la proximité permettent d'exceller.
                        </Text>
                    </Stack>
                </Stack>
            </Flex>
        </Container>
    )
}
