'use client';

import { useState, useEffect, useCallback } from 'react';
import { Title, Text, Card, Stack, LoadingOverlay, Alert, Button, Group } from "@mantine/core";
import { ArticleForm } from "./ArticleForm";
import { IconInfoCircle, IconRefresh } from '@tabler/icons-react';
import type { ArticleWithCategory } from '@/lib/db/schema';

interface EditArticleClientPageProps {
    articleId: string;
}

export function EditArticleClientPage({ articleId }: EditArticleClientPageProps) {
    const [article, setArticle] = useState<ArticleWithCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticle = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/articles/${articleId}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Article non trouvé');
                } else if (response.status === 401) {
                    setError('Vous devez être connecté pour accéder à cette page');
                } else {
                    setError('Erreur lors du chargement de l\'article');
                }
                return;
            }

            const articleData = await response.json();
            setArticle(articleData);
        } catch (error) {
            console.error('Error fetching article:', error);
            setError('Erreur lors du chargement de l\'article');
        } finally {
            setLoading(false);
        }
    }, [articleId]);

    useEffect(() => {
        fetchArticle();
    }, [articleId, fetchArticle]);

    if (loading) {
        return (
            <div style={{ position: 'relative', minHeight: '400px' }}>
                <LoadingOverlay visible={true} overlayProps={{ radius: 'sm', blur: 2 }} />
                <Stack gap="xl">
                    <div>
                        <Title order={1} size="h1" mb="sm">
                            Modifier l'Article
                        </Title>
                        <Text c="dimmed" size="lg">
                            Chargement...
                        </Text>
                    </div>
                </Stack>
            </div>
        );
    }

    if (error) {
        return (
            <Stack gap="xl">
                <div>
                    <Title order={1} size="h1" mb="sm">
                        Modifier l'Article
                    </Title>
                    <Text c="dimmed" size="lg">
                        Une erreur s'est produite
                    </Text>
                </div>
                <Alert
                    icon={<IconInfoCircle size={16} />}
                    color="red"
                    title="Erreur"
                >
                    {error}
                </Alert>
            </Stack>
        );
    }

    if (!article) {
        return (
            <Stack gap="xl">
                <div>
                    <Title order={1} size="h1" mb="sm">
                        Modifier l'Article
                    </Title>
                    <Text c="dimmed" size="lg">
                        Article non trouvé
                    </Text>
                </div>
                <Alert
                    icon={<IconInfoCircle size={16} />}
                    color="orange"
                    title="Article introuvable"
                >
                    L'article demandé n'existe pas ou a été supprimé.
                </Alert>
            </Stack>
        );
    }

    return (
        <Stack gap="xl">
            {/* Page Header */}
            <div>
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={1} size="h1" mb="sm">
                            Modifier l'Article
                        </Title>
                        <Text c="dimmed" size="lg">
                            Éditez votre article "{article.title}"
                        </Text>
                    </div>
                    <Button
                        variant="outline"
                        leftSection={<IconRefresh size={16} />}
                        onClick={fetchArticle}
                        loading={loading}
                    >
                        Actualiser
                    </Button>
                </Group>
            </div>

            {/* Article Form */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ArticleForm
                    initialData={{
                        ...article,
                        category: article.category?.name || '',
                        featuredImage: article.featuredImage || '',
                    }}
                    isEditing={true}
                    articleId={articleId}
                    onArticleUpdated={fetchArticle}
                />
            </Card>
        </Stack>
    );
}
