import { Title, Text, Card, Group, Badge, Button, Table, Stack, ActionIcon } from "@mantine/core";
import { IconPlus, IconEdit, IconEye, IconCalendar, IconArticle } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";
import { ArticleService, type Article } from "@/lib/articles";

export default async function AdminArticlesPage() {
    // Fetch articles via service layer
    const articles = await ArticleService.getAll();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Stack gap="xl">
            {/* Page Header */}
            <Group justify="space-between">
                <div>
                    <Title order={1} size="h1" mb="sm">
                        Gestion des Articles
                    </Title>
                    <Text c="dimmed" size="lg">
                        Créez, modifiez et gérez vos articles de blog
                    </Text>
                </div>
                <Button
                    component={Link}
                    href="/admin/articles/new"
                    leftSection={<IconPlus size={16} />}
                    size="md"
                >
                    Nouvel Article
                </Button>
            </Group>

            {/* Articles Table */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Titre</Table.Th>
                            <Table.Th>Catégorie</Table.Th>
                            <Table.Th>Statut</Table.Th>
                            <Table.Th>Date de publication</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {articles.map((article: Article) => (
                            <Table.Tr key={article.id}>
                                <Table.Td>
                                    <div>
                                        <Text fw={500} size="sm" mb="xs">
                                            {article.title}
                                        </Text>
                                        <Text size="xs" c="dimmed" lineClamp={2}>
                                            {article.excerpt}
                                        </Text>
                                    </div>
                                </Table.Td>
                                <Table.Td>
                                    <Badge size="sm" color="blue">
                                        {article.category?.name || 'Sans catégorie'}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        size="sm"
                                        color={article.publishedAt ? "green" : "orange"}
                                    >
                                        {article.publishedAt ? "Publié" : "Brouillon"}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <IconCalendar size={14} color="var(--mantine-color-gray-6)" />
                                        <Text size="sm">
                                            {article.publishedAt
                                                ? formatDate(article.publishedAt)
                                                : formatDate(article.updatedAt)
                                            }
                                        </Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <ActionIcon
                                            component={Link}
                                            href={`/blog/${article.slug}`}
                                            variant="subtle"
                                            color="blue"
                                            size="sm"
                                            title="Voir l'article"
                                        >
                                            <IconEye size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            component={Link}
                                            href={`/admin/articles/${article.id}`}
                                            variant="subtle"
                                            color="orange"
                                            size="sm"
                                            title="Éditer l'article"
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <DeleteArticleButton
                                            articleId={article.id.toString()}
                                            articleTitle={article.title}
                                        />
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>

            {/* Empty State */}
            {articles.length === 0 && (
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                    <Stack align="center" gap="md">
                        <IconArticle size={48} color="var(--mantine-color-gray-4)" />
                        <Title order={3} c="dimmed">
                            Aucun article trouvé
                        </Title>
                        <Text c="dimmed" ta="center">
                            Commencez par créer votre premier article de blog
                        </Text>
                        <Button
                            component={Link}
                            href="/admin/articles/new"
                            leftSection={<IconPlus size={16} />}
                            mt="md"
                        >
                            Créer un Article
                        </Button>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
}
