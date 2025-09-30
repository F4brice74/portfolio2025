import { Title, Text, Card, Stack } from "@mantine/core";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
    return (
        <Stack gap="xl">
            {/* Page Header */}
            <div>
                <Title order={1} size="h1" mb="sm">
                    Nouvel Article
                </Title>
                <Text c="dimmed" size="lg">
                    Créez un nouvel article pour votre blog
                </Text>
            </div>

            {/* Article Form */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <ArticleForm />
            </Card>
        </Stack>
    );
}
