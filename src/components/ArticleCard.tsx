import { Article } from '@/lib/articles/types';
import { Badge, Card, CardSection, Group, Image, Stack, Text } from '@mantine/core';
import Link from 'next/link';

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            component={Link}
            href={`/blog/${article.slug}`}
        >
            <CardSection>
                <Image
                    src={article.featuredImage || 'https://picsum.photos/400/200?random=' + article.id}
                    height={200}
                    alt={article.title}
                    fit="cover"
                />
            </CardSection>

            <Stack gap="sm" style={{ flex: 1 }}>
                <Group justify="space-between" mt="md">
                    <Badge color="blue" variant="light">
                        {typeof article.category === 'string' ? article.category : article.category?.name || 'Sans catégorie'}
                    </Badge>
                    <Text size="xs" c="dimmed">
                        {formatDate(article.publishedAt || article.createdAt)}
                    </Text>
                </Group>

                <Text fw={600} size="lg" lineClamp={2}>
                    {article.title}
                </Text>

                <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
                    {article.excerpt}
                </Text>

                <Group justify="space-between" mt="auto">
                    <Group gap="xs">
                        <Text size="xs" c="dimmed">📅 {formatDate(article.publishedAt || article.createdAt)}</Text>
                    </Group>
                    <Group gap="xs">
                        <Text size="xs" c="dimmed">⏱️ {article.readingTime} min de lecture</Text>
                    </Group>
                </Group>
            </Stack>
        </Card>
    );
}