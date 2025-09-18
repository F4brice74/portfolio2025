import { Card, Image, Text, Badge, Group, Stack, CardSection } from '@mantine/core';
import Link from 'next/link';
import { Article } from '@/types/article';

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
                        {article.category}
                    </Badge>
                    <Text size="xs" c="dimmed">
                        {formatDate(article.publishedAt)}
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
                        <Text size="xs" c="dimmed">📅 {formatDate(article.publishedAt)}</Text>
                    </Group>
                    <Group gap="xs">
                        <Text size="xs" c="dimmed">⏱️ {article.readingTime} min de lecture</Text>
                    </Group>
                </Group>
            </Stack>
        </Card>
    );
}