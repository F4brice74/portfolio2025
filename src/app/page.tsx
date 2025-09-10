import { Container, Card, Button, Text, Title, Group, Stack, Box, Image, Flex, Badge } from "@mantine/core"
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconCode,
  IconUsers,
  IconDatabase,
  IconRocket,
  IconCalendar,
} from "@tabler/icons-react"

export default function Portfolio() {
  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
      {/* Hero Section */}
      <Container id="home" size="xl" py={80} style={{ paddingTop: "120px" }}>
        <Flex direction={{ base: "column", md: "row" }} gap={48} align="center">
          {/* Photo */}
          <Box style={{ flexShrink: 0 }}>
            <Box
              style={{
                width: 320,
                height: 320,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid var(--mantine-color-gray-3)",
              }}
            >
              <Image
                src="/MIQUET-SAGE-001-min.png"
                alt="Fabrice MIQUET-SAGE - Développeur Fullstack"
                width={320}
                height={320}
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
                Développeur Fullstack TypeScript
              </Title>
            </Stack>

            <Stack gap={16} c="var(--mantine-color-gray-6)" style={{ lineHeight: 1.6 }}>
              <Text>
                Passionné par le développement web moderne, je conçois et développe des applications robustes avec entre autres
                TypeScript, React et Node.js. Mon approche combine expertise technique et vision stratégique pour livrer
                des solutions qui répondent aux besoins métier.
              </Text>
              <Text>
                Fort de plusieurs années d'expérience en gestion de projet, je m'attache à comprendre les enjeux, les besoins, et les spécificités métiers.
                J'aime communiquer, exposer des idées, partager en équipe, dans un environnement agile. 
              </Text>
              <Text>
                Mon objectif : Comprendre vos besoins, proposer une solution adaptée et transformer vos idées en applications performantes, maintenables et évolutives, tout en
                respectant les délais et les contraintes techniques. Je suis volontairement curieux, j'aime apprendre mais surtout j'aime comprendre ce que je fais et pour qui je le fais. 
                J'accepte volontiers les responsabilités au sein d'une équipe, j'apprécie le contact client, et les échanges entre collègues et services.
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Container>

      {/* Parcours Professionnel */}
      <Box id="blog" py={80} style={{ backgroundColor: "var(--mantine-color-gray-1)" }}>
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
                    {[
                      {
                        year: "2018",
                        title: "Développement Web",
                        desc: "Début en développement web frontend",
                      },
                      { year: "2020", title: "Full Stack", desc: "Expansion vers le développement full stack" },
                      { year: "2022", title: "TypeScript", desc: "Spécialisation TypeScript et React" },
                      { year: "2023", title: "Freelance", desc: "Développeur freelance et consultant" },
                      { year: "2024", title: "Portfolio", desc: "Création de ce portfolio évolutif" },
                    ].map((item, index) => (
                      <Box key={index} style={{ position: "relative", textAlign: "center" }}>
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

      {/* Services Section */}
      <Box py={80} style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <Container size="xl">
          <Flex direction={{ base: "column", md: "row" }} gap={32}>
            {/* Développement */}
            <Card
              shadow="lg"
              padding="xl"
              radius="md"
              style={{
                flex: 1,
                backgroundColor: "var(--mantine-color-white)",
                border: "1px solid var(--mantine-color-gray-3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icônes décoratives */}
              <Box style={{ position: "absolute", top: 16, right: 16, opacity: 0.1 }}>
                <IconCode size={64} color="var(--mantine-color-gray-6)" />
              </Box>
              <Box style={{ position: "absolute", bottom: 16, left: 16, opacity: 0.05 }}>
                <IconDatabase size={48} color="var(--mantine-color-gray-6)" />
              </Box>

              <Stack gap={24} style={{ position: "relative", zIndex: 10 }}>
                <Group gap={12}>
                  <Box
                    style={{
                      padding: 8,
                      backgroundColor: "var(--mantine-color-blue-6)",
                      borderRadius: 8,
                      opacity: 0.1,
                    }}
                  >
                    <IconCode size={24} color="var(--mantine-color-blue-6)" />
                  </Box>
                  <Stack gap={4}>
                    <Title order={3} size={28} c="var(--mantine-color-gray-9)">
                      Développement
                    </Title>
                    <Title order={4} size={18} c="var(--mantine-color-blue-6)" fw={500}>
                      Stack TypeScript, React & Node.js
                    </Title>
                  </Stack>
                </Group>

                <Stack gap={16} c="var(--mantine-color-gray-6)" style={{ lineHeight: 1.6 }}>
                  <Text>
                    Je développe des applications web modernes avec TypeScript pour garantir la robustesse et la
                    maintenabilité du code. Côté frontend, j'utilise React avec Next.js pour créer des interfaces
                    utilisateur performantes et accessibles. Côté backend, Node.js et Express me permettent de concevoir
                    des APIs scalables.
                  </Text>
                  <Text>
                    Mon expertise couvre l'intégration de bases de données (PostgreSQL, MongoDB), la mise en place de
                    tests automatisés (Jest, Cypress), et le déploiement d'applications avec Docker et les plateformes
                    cloud (AWS, Vercel). Je maîtrise également les outils de CI/CD pour automatiser les processus de
                    livraison.
                  </Text>
                  <Text>
                    Chaque ligne de code respecte les principes SOLID, les patterns de conception éprouvés et les
                    standards de sécurité pour livrer des applications fiables et évolutives.
                  </Text>
                </Stack>
              </Stack>
            </Card>

            {/* Gestion de Projet */}
            <Card
              shadow="lg"
              padding="xl"
              radius="md"
              style={{
                flex: 1,
                backgroundColor: "var(--mantine-color-white)",
                border: "1px solid var(--mantine-color-gray-3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icônes décoratives */}
              <Box style={{ position: "absolute", top: 16, right: 16, opacity: 0.1 }}>
                <IconUsers size={64} color="var(--mantine-color-gray-6)" />
              </Box>
              <Box style={{ position: "absolute", bottom: 16, left: 16, opacity: 0.05 }}>
                <IconRocket size={48} color="var(--mantine-color-gray-6)" />
              </Box>

              <Stack gap={24} style={{ position: "relative", zIndex: 10 }}>
                <Group gap={12}>
                  <Box
                    style={{
                      padding: 8,
                      backgroundColor: "var(--mantine-color-blue-6)",
                      borderRadius: 8,
                      opacity: 0.1,
                    }}
                  >
                    <IconUsers size={24} color="var(--mantine-color-blue-6)" />
                  </Box>
                  <Stack gap={4}>
                    <Title order={3} size={28} c="var(--mantine-color-gray-9)">
                      Gestion de Projet
                    </Title>
                    <Title order={4} size={18} c="var(--mantine-color-blue-6)" fw={500}>
                      Méthodologies Agiles & Livraison Continue
                    </Title>
                  </Stack>
                </Group>

                <Stack gap={16} c="var(--mantine-color-gray-6)" style={{ lineHeight: 1.6 }}>
                  <Text>
                    J'orchestre le développement de projets complexes en appliquant les méthodologies Scrum et Kanban.
                    Ma démarche s'appuie sur une planification rigoureuse, un suivi constant des indicateurs de
                    performance et une communication transparente avec toutes les parties prenantes.
                  </Text>
                  <Text>
                    De la définition du backlog produit à la mise en production, je veille à ce que chaque sprint
                    apporte une valeur mesurable. J'anime les cérémonies agiles, facilite la collaboration entre les
                    équipes techniques et métier, et m'assure du respect des standards de qualité.
                  </Text>
                  <Text>
                    Mon approche privilégie l'amélioration continue, la gestion proactive des risques et l'adaptation
                    aux changements pour garantir la réussite de vos projets.
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box id="contact" py={48} style={{ backgroundColor: "var(--mantine-color-gray-0)", borderTop: "1px solid var(--mantine-color-gray-3)" }}>
        <Container size="xl">
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={24}>
            <Text c="var(--mantine-color-gray-6)" ta={{ base: "center", md: "left" }}>
              Prêt à collaborer sur votre prochain projet ?
            </Text>

            <Group gap={16}>
              <Button
                variant="outline"
                size="sm"
                leftSection={<IconMail size={16} />}
                component="a"
                href="mailto:fabrice@example.com"
              >
                fabrice@example.com
              </Button>

              <Button
                variant="outline"
                size="sm"
                leftSection={<IconBrandLinkedin size={16} />}
                component="a"
                href="https://linkedin.com/in/fabrice"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>

              <Button
                variant="outline"
                size="sm"
                leftSection={<IconBrandGithub size={16} />}
                component="a"
                href="https://github.com/F4brice74"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </Group>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
