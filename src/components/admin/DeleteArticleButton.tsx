'use client';

import { useState } from 'react';
import { ActionIcon, Modal, Text, Button, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface DeleteArticleButtonProps {
    articleId: string;
    articleTitle: string;
}

export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/articles/${articleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            notifications.show({
                title: 'Succès',
                message: 'Article supprimé avec succès',
                color: 'green',
            });

            setOpened(false);
            router.refresh(); // Refresh the page to update the article list
        } catch (error) {
            notifications.show({
                title: 'Erreur',
                message: 'Une erreur est survenue lors de la suppression',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                title="Supprimer l'article"
                onClick={() => setOpened(true)}
            >
                <IconTrash size={16} />
            </ActionIcon>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Confirmer la suppression"
                centered
            >
                <Text mb="md">
                    Êtes-vous sûr de vouloir supprimer l'article "{articleTitle}" ?
                    Cette action est irréversible.
                </Text>

                <Group justify="flex-end">
                    <Button
                        variant="outline"
                        onClick={() => setOpened(false)}
                        disabled={loading}
                    >
                        Annuler
                    </Button>
                    <Button
                        color="red"
                        onClick={handleDelete}
                        loading={loading}
                    >
                        Supprimer
                    </Button>
                </Group>
            </Modal>
        </>
    );
}
