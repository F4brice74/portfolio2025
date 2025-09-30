'use client';

import { useState } from 'react';
import {
    TextInput,
    Textarea,
    Select,
    Button,
    Group,
    Stack,
    Switch,
    TagsInput,
    Text,
    Grid,
    GridCol,
    Alert,
    LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    featuredImage: string;
    published: boolean;
}

interface ArticleFormProps {
    initialData?: Partial<ArticleFormData>;
    isEditing?: boolean;
    articleId?: string;
}

export function ArticleForm({ initialData, isEditing = false, articleId }: ArticleFormProps) {
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const router = useRouter();

    const form = useForm<ArticleFormData>({
        initialValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            excerpt: initialData?.excerpt || '',
            content: initialData?.content || '',
            category: initialData?.category || '',
            tags: initialData?.tags || [],
            featuredImage: initialData?.featuredImage || '',
            published: initialData?.published || false,
        },
        validate: {
            title: (value) => (!value ? 'Le titre est requis' : null),
            slug: (value) => (!value ? 'Le slug est requis' : null),
            excerpt: (value) => (!value ? 'L\'extrait est requis' : null),
            content: (value) => (!value ? 'Le contenu est requis' : null),
            category: (value) => (!value ? 'La catégorie est requise' : null),
        },
    });

    // Auto-generate slug from title
    const handleTitleChange = (value: string) => {
        form.setFieldValue('title', value);
        if (!isEditing || !form.values.slug) {
            const slug = value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single
                .trim();
            form.setFieldValue('slug', slug);
        }
    };

    const handleSubmit = async (values: ArticleFormData) => {
        setLoading(true);
        try {
            const url = isEditing
                ? `/api/admin/articles/${articleId}`
                : '/api/admin/articles';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde');
            }

            const result = await response.json();

            notifications.show({
                title: 'Succès',
                message: isEditing ? 'Article mis à jour avec succès' : 'Article créé avec succès',
                color: 'green',
                icon: <IconCheck size={16} />,
            });

            // Redirect to the article or back to the list
            if (values.published) {
                router.push(`/blog/${result.slug}`);
            } else {
                router.push('/admin/articles');
            }
        } catch (error) {
            notifications.show({
                title: 'Erreur',
                message: 'Une erreur est survenue lors de la sauvegarde',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAsDraft = () => {
        form.setFieldValue('published', false);
        form.onSubmit(handleSubmit)();
    };

    const handlePublish = () => {
        form.setFieldValue('published', true);
        form.onSubmit(handleSubmit)();
    };

    const categories = [
        { value: 'Développement', label: 'Développement' },
        { value: 'Architecture', label: 'Architecture' },
        { value: 'Performance', label: 'Performance' },
        { value: 'Sécurité', label: 'Sécurité' },
        { value: 'DevOps', label: 'DevOps' },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <LoadingOverlay visible={loading} overlayProps={{ radius: 'sm', blur: 2 }} />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    {/* Basic Information */}
                    <div>
                        <Text size="lg" fw={600} mb="md">Informations générales</Text>
                        <Grid>
                            <GridCol span={12}>
                                <TextInput
                                    label="Titre de l'article"
                                    placeholder="Entrez le titre de votre article"
                                    required
                                    {...form.getInputProps('title')}
                                    onChange={(event) => handleTitleChange(event.currentTarget.value)}
                                />
                            </GridCol>
                            <GridCol span={12}>
                                <TextInput
                                    label="Slug (URL)"
                                    placeholder="url-de-larticle"
                                    description="L'URL de votre article. Généré automatiquement à partir du titre."
                                    required
                                    {...form.getInputProps('slug')}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 8 }}>
                                <Select
                                    label="Catégorie"
                                    placeholder="Sélectionnez une catégorie"
                                    data={categories}
                                    required
                                    {...form.getInputProps('category')}
                                />
                            </GridCol>
                            <GridCol span={{ base: 12, md: 4 }}>
                                <TextInput
                                    label="Image à la une (URL)"
                                    placeholder="https://example.com/image.jpg"
                                    {...form.getInputProps('featuredImage')}
                                />
                            </GridCol>
                        </Grid>
                    </div>

                    {/* Content */}
                    <div>
                        <Text size="lg" fw={600} mb="md">Contenu</Text>
                        <Stack gap="md">
                            <Textarea
                                label="Extrait"
                                placeholder="Un court résumé de votre article (2-3 phrases)"
                                description="Cet extrait apparaîtra dans la liste des articles et dans les résultats de recherche."
                                minRows={3}
                                maxRows={5}
                                required
                                {...form.getInputProps('excerpt')}
                            />

                            <div>
                                <Text size="sm" fw={500} mb="xs">Contenu de l'article</Text>
                                <RichTextEditor
                                    value={form.values.content}
                                    onChange={(value) => form.setFieldValue('content', value)}
                                    error={form.errors.content as string}
                                />
                            </div>
                        </Stack>
                    </div>

                    {/* Metadata */}
                    <div>
                        <Text size="lg" fw={600} mb="md">Métadonnées</Text>
                        <Stack gap="md">
                            <TagsInput
                                label="Tags"
                                placeholder="Appuyez sur Entrée pour ajouter un tag"
                                description="Tags pour améliorer la découverte de votre article"
                                {...form.getInputProps('tags')}
                            />
                        </Stack>
                    </div>

                    {/* Publication Options */}
                    <div>
                        <Text size="lg" fw={600} mb="md">Options de publication</Text>
                        <Alert
                            icon={<IconInfoCircle size={16} />}
                            color="blue"
                            mb="md"
                        >
                            Vous pouvez sauvegarder votre article en brouillon ou le publier immédiatement.
                        </Alert>
                        <Switch
                            label="Publier immédiatement"
                            description="L'article sera visible sur le blog"
                            {...form.getInputProps('published', { type: 'checkbox' })}
                        />
                    </div>

                    {/* Action Buttons */}
                    <Group justify="space-between">
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Annuler
                        </Button>

                        <Group>
                            <Button
                                variant="outline"
                                onClick={handleSaveAsDraft}
                                disabled={loading}
                            >
                                Sauvegarder en brouillon
                            </Button>
                            <Button
                                type="submit"
                                onClick={handlePublish}
                                disabled={loading}
                            >
                                {isEditing ? 'Mettre à jour' : 'Publier'}
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </form>
        </div>
    );
}
