import { Title, Text, Grid, Card, Group, Badge, Stack, Button } from "@mantine/core";
import { GridCol } from "@mantine/core";
import { IconArticle, IconEye, IconEdit, IconPlus, IconTrendingUp, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { ArticleService, type Article } from "@/lib/articles";

export default async function AdminDashboard() {
    // Fetch articles via service layer
    const articles = await ArticleService.getAll();

    const stats = {
        totalArticles: articles.length,
        publishedArticles: articles.filter((article: Article) => article.publishedAt).length,
        draftArticles: articles.filter((article: Article) => !article.publishedAt).length,
        totalViews: 0, // À implémenter plus tard
    };

    const recentArticles = articles.slice(0, 5);

    return (
        <Stack gap="xl">
            {/* Page Header */}
            <div>
                <Title order={1} size="h1" mb="sm">
                    Dashboard Administration
                </Title>
                <Text c="dimmed" size="lg">
                    Gérez votre contenu et surveillez les performances de votre site
                </Text>
            </div>

            {/* Stats Cards */}
            <Grid>
                <GridCol span={{ base: 12, sm: 6, md: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text size="sm" fw={500} c="dimmed">
                                Total Articles
                            </Text>
                            <IconArticle size={20} color="var(--mantine-color-blue-6)" />
                        </Group>
                        <Text size="xl" fw={700} c="blue">
                            {stats.totalArticles}
                        </Text>
                    </Card>
                </GridCol>

                <GridCol span={{ base: 12, sm: 6, md: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text size="sm" fw={500} c="dimmed">
                                Publiés
                            </Text>
                            <IconEye size={20} color="var(--mantine-color-green-6)" />
                        </Group>
                        <Text size="xl" fw={700} c="green">
                            {stats.publishedArticles}
                        </Text>
                    </Card>
                </GridCol>

                <GridCol span={{ base: 12, sm: 6, md: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text size="sm" fw={500} c="dimmed">
                                Brouillons
                            </Text>
                            <IconEdit size={20} color="var(--mantine-color-orange-6)" />
                        </Group>
                        <Text size="xl" fw={700} c="orange">
                            {stats.draftArticles}
                        </Text>
                    </Card>
                </GridCol>
                <GridCol span={{ base: 12, sm: 6, md: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text size="sm" fw={500} c="dimmed">
                                Vues Total
                            </Text>
                            <IconTrendingUp size={20} color="var(--mantine-color-purple-6)" />
                        </Group>
                        <Text size="xl" fw={700} c="purple">
                            {stats.totalViews}
                        </Text>
                    </Card>
                </GridCol>
            </Grid>

            {/* Recent Articles */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Title order={3}>Articles Récents</Title>
                    <Button
                        component={Link}
                        href="/admin/articles/new"
                        leftSection={<IconPlus size={16} />}
                        size="sm"
                    >
                        Nouvel Article
                    </Button>
                </Group>

                <Stack gap="sm">
                    {recentArticles.map((article: Article) => (
                        <Card key={article.id} padding="md" radius="md" withBorder>
                            <Group justify="space-between">
                                <div style={{ flex: 1 }}>
                                    <Text fw={500} size="sm" mb="xs">
                                        {article.title}
                                    </Text>
                                    <Group gap="xs" mb="xs">
                                        <Badge size="xs" color="blue">
                                            {article.category?.name || 'Sans catégorie'}
                                        </Badge>
                                        <Badge
                                            size="xs"
                                            color={article.publishedAt ? "green" : "orange"}
                                        >
                                            {article.publishedAt ? "Publié" : "Brouillon"}
                                        </Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed">
                                        {new Date(article.publishedAt || article.updatedAt).toLocaleDateString('fr-FR')}
                                    </Text>
                                </div>
                                <Group gap="xs">
                                    <Button
                                        component={Link}
                                        href={`/admin/articles/${article.id}`}
                                        variant="outline"
                                        size="xs"
                                        leftSection={<IconEdit size={14} />}
                                    >
                                        Éditer
                                    </Button>
                                </Group>
                            </Group>
                        </Card>
                    ))}
                </Stack>
            </Card>

            {/* Quick Actions */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3} mb="md">Actions Rapides</Title>
                <Group gap="md">
                    <Button
                        component={Link}
                        href="/admin/articles/new"
                        leftSection={<IconPlus size={16} />}
                    >
                        Créer un Article
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/articles"
                        variant="outline"
                        leftSection={<IconArticle size={16} />}
                    >
                        Gérer les Articles
                    </Button>
                    <Button
                        component={Link}
                        href="/admin/settings"
                        variant="outline"
                        leftSection={<IconSettings size={16} />}
                    >
                        Paramètres
                    </Button>
                </Group>
            </Card>
        </Stack>
    );
}
