'use client';

import {
    Button,
    Card,
    Group,
    LoadingOverlay,
    Modal,
    Stack,
    Table,
    Text,
    TextInput,
    Textarea,
    Title,
    Badge,
    ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    articleCount: number;
    createdAt: string;
    updatedAt: string;
}

interface CategoryFormData {
    name: string;
    description: string;
}

export function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm<CategoryFormData>({
        initialValues: {
            name: '',
            description: '',
        },
        validate: {
            name: (value) => (!value ? 'Le nom est requis' : null),
        },
    });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            notifications.show({
                title: 'Erreur',
                message: 'Impossible de charger les catégories',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (values: CategoryFormData) => {
        try {
            setSubmitting(true);
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de la création');
            }

            notifications.show({
                title: 'Succès',
                message: 'Catégorie créée avec succès',
                color: 'green',
                icon: <IconCheck size={16} />,
            });

            form.reset();
            close();
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error);
            notifications.show({
                title: 'Erreur',
                message: error instanceof Error ? error.message : 'Une erreur est survenue',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (categoryId: number, categoryName: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/categories/${categoryId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de la suppression');
            }

            notifications.show({
                title: 'Succès',
                message: 'Catégorie supprimée avec succès',
                color: 'green',
                icon: <IconCheck size={16} />,
            });

            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            notifications.show({
                title: 'Erreur',
                message: error instanceof Error ? error.message : 'Une erreur est survenue',
                color: 'red',
                icon: <IconX size={16} />,
            });
        }
    };

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={loading} overlayProps={{ radius: 'sm', blur: 2 }} />

                    <Group justify="space-between" mb="lg">
                        <div>
                            <Title order={2} size="h3">
                                Gestion des Catégories
                            </Title>
                            <Text c="dimmed" size="sm">
                                Gérez les catégories de vos articles
                            </Text>
                        </div>
                        <Button
                            leftSection={<IconPlus size={16} />}
                            onClick={open}
                        >
                            Nouvelle Catégorie
                        </Button>
                    </Group>

                    {categories.length === 0 && !loading ? (
                        <Text c="dimmed" ta="center" py="xl">
                            Aucune catégorie trouvée
                        </Text>
                    ) : (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nom</Table.Th>
                                    <Table.Th>Slug</Table.Th>
                                    <Table.Th>Description</Table.Th>
                                    <Table.Th>Articles</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {categories.map((category) => (
                                    <Table.Tr key={category.id}>
                                        <Table.Td>
                                            <Text fw={500}>{category.name}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{category.slug}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" lineClamp={2}>
                                                {category.description || 'Aucune description'}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge variant="light" size="sm">
                                                {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <ActionIcon
                                                color="red"
                                                variant="light"
                                                onClick={() => handleDelete(category.id, category.name)}
                                                disabled={category.articleCount > 0}
                                            >
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                </div>
            </Card>

            <Modal
                opened={opened}
                onClose={close}
                title="Nouvelle Catégorie"
                centered
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <TextInput
                            label="Nom de la catégorie"
                            placeholder="Ex: Développement Web"
                            required
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            label="Description"
                            placeholder="Description de la catégorie (optionnel)"
                            minRows={3}
                            {...form.getInputProps('description')}
                        />
                        <Group justify="flex-end">
                            <Button variant="outline" onClick={close} disabled={submitting}>
                                Annuler
                            </Button>
                            <Button type="submit" loading={submitting}>
                                Créer
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>
        </>
    );
}
