import {
  Box, Container, SimpleGrid, Text, Center, Stack,
} from '@mantine/core';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import BlogPagination from '@/components/BlogPagination';
import SectionHeader from '@/components/landing/SectionHeader';
import type { Article, CategoryWithCount } from '@/lib/articles/types';

interface BlogSectionProps {
  articles: Article[];
  categories: CategoryWithCount[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  selectedCategory?: string;
}

export default function BlogSection({
  articles,
  categories,
  currentPage,
  totalPages,
  totalArticles,
  selectedCategory,
}: BlogSectionProps) {
  return (
    <Box id="blog" py={{ base: 72, md: 96 }} className="section-bg" style={{ borderTop: '1px solid var(--ossawayas-border)' }}>
      <Container size="lg">
        <SectionHeader
          label="Blog"
          title="Automatisation, IA et productivité"
          description="Conseils et retours d'expérience pour faire gagner du temps à votre activité."
        />

        <CategoryFilter categories={categories} selectedCategory={selectedCategory} />

        <Text size="sm" c="dimmed" mb="lg">
          {totalArticles} article{totalArticles > 1 ? 's' : ''} au total
          {totalPages > 1 && ` · Page ${currentPage} sur ${totalPages}`}
        </Text>

        {articles.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
        ) : (
          <Center py={60}>
            <Text c="dimmed">Aucun article publié pour le moment.</Text>
          </Center>
        )}

        {totalPages > 1 && (
          <Stack gap="sm" mt="xl">
            <BlogPagination totalPages={totalPages} currentPage={currentPage} />
            <Text ta="center" size="sm" c="dimmed">
              Page {currentPage} sur {totalPages}
            </Text>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
