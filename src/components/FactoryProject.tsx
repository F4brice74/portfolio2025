import { Box, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TechnologyBadge } from '@/components/TechnologyBadge';
import { ProjectLinks } from '@/components/ProjectLinks';
import type { FactoryProject as FactoryProjectType } from '@/data/factory-projects';

interface FactoryProjectProps {
    project: FactoryProjectType;
    slug?: string;
}

/**
 * Composant principal pour afficher un projet factory
 */
export function FactoryProject({ project }: FactoryProjectProps) {
    return (
        <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-gray-0)' }}>
            <Container size="lg" py="xl" px="md">
                <Stack gap="xl">
                    {/* En-tête du projet */}
                    <Box>
                        <Title order={1} mb="md" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                            {project.title}
                        </Title>
                        <Text size="xl" c="dimmed" mb="xl" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                            {project.description}
                        </Text>

                        {/* Technologies */}
                        {project.technologies.length > 0 && (
                            <Group gap="xs" mb="xl">
                                {project.technologies.map((tech) => (
                                    <TechnologyBadge key={tech} technology={tech} />
                                ))}
                            </Group>
                        )}

                        {/* Liens du projet */}
                        <ProjectLinks links={project.links} />
                    </Box>

                    {/* Image principale */}
                    {project.featuredImage && (
                        <Paper shadow="sm" radius="md" withBorder style={{ overflow: 'hidden', position: 'relative', width: '100%', height: 'auto', aspectRatio: '2/1' }}>
                            <Image
                                src={project.featuredImage}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                priority
                            />
                        </Paper>
                    )}

                    {/* Galerie d'images */}
                    {project.images.length > 0 && (
                        <Box>
                            <Title order={2} size="h3" mb="md">
                                Captures d&apos;écran
                            </Title>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                                {project.images.map((image, index) => (
                                    <Paper key={index} shadow="sm" radius="md" withBorder style={{ overflow: 'hidden', position: 'relative', width: '100%', aspectRatio: '3/2' }}>
                                        <Image
                                            src={image}
                                            alt={`${project.title} - Screenshot ${index + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                            loading="lazy"
                                        />
                                    </Paper>
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Contenu Markdown */}
                    <Box>
                        <MarkdownRenderer content={project.content} />
                    </Box>

                    {/* Liens en bas de page */}
                    <Box pt="xl" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
                        <ProjectLinks links={project.links} />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

