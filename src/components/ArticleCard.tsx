import { Article } from '@/lib/articles/types';
import { ArticleFeaturedImage } from '@/components/ArticleFeaturedImage';
import { Badge, Card, CardSection, Group, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { IconClock } from '@tabler/icons-react';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      data-testid="article-card"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      component={Link}
      href={`/blog/${article.slug}`}
    >
      {article.featuredImage && (
        <CardSection>
          <ArticleFeaturedImage
            src={article.featuredImage}
            alt={article.title}
            variant="card"
          />
        </CardSection>
      )}

      <Stack gap="sm" style={{ flex: 1 }}>
        <Group justify="space-between" mt="md">
          <Badge color="navy" variant="light">
            {typeof article.category === 'string' ? article.category : article.category?.name || 'Sans catégorie'}
          </Badge>
          <Text size="xs" c="dimmed">
            {formatDate(article.publishedAt || article.createdAt)}
          </Text>
        </Group>

        <Text fw={600} size="lg" lineClamp={2} className="font-heading">
          {article.title}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
          {article.excerpt}
        </Text>

        <Group justify="space-between" mt="auto">
          <Text size="xs" c="dimmed">
            📅 {formatDate(article.publishedAt || article.createdAt)}
          </Text>
          <Group gap={4}>
            <IconClock size={14} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">{article.readingTime} min de lecture</Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
