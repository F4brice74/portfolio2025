import { CategoryManager } from '@/components/admin/CategoryManager';
import { Stack, Title, Text } from '@mantine/core';

export default function CategoriesPage() {
    return (
        <Stack gap="xl">
            {/* Page Header */}
            <div>
                <Title order={1} size="h1" mb="sm">
                    Catégories
                </Title>
                <Text c="dimmed" size="lg">
                    Gérez les catégories de vos articles de blog
                </Text>
            </div>

            {/* Category Manager */}
            <CategoryManager />
        </Stack>
    );
}
