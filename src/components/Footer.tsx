import { Box, Container, Text, Button, Group, Flex } from "@mantine/core"
import { IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react"

export default function Footer() {
    return (
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
                            href="mailto:fabrice&#46;miquetsage&#46;pro&#64;gmail&#46;com"
                        >
                            mail
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            leftSection={<IconBrandLinkedin size={16} />}
                            component="a"
                            href="https://www.linkedin.com/in/fabricemiquetsage"
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
    )
}
