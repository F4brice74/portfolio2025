import ArticleCard from "@/components/ArticleCard"
import { Box, Center, Container, Group, Loader, SimpleGrid, Text, Title } from "@mantine/core"
import { Suspense } from "react"
// Removed mock data imports - now using API calls
import BlogPagination from "@/components/BlogPagination"
import CategoryFilter from "@/components/CategoryFilter"
import { ArticleService } from "@/lib/articles"
import type { Category } from "@/lib/articles/types"

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  const selectedCategory = resolvedSearchParams.category

  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)", paddingTop: 80 }}>
      <Container size="lg" py="xl">
        <Box mb="xl" ta="center">
          <Title order={1} size={35} c="var(--mantine-color-gray-9)">
            OSSAWAYAS
          </Title>
          <Title order={2} size={20} c="var(--mantine-color-blue-6)" fw={500}>
            Développement web mais pas que...
          </Title>
        </Box>
        {/* <Box mb="xl">
          <Text c="var(--mantine-color-gray-8)" mb="md">
            Développement, nouvelles technologies, enjeux sociétaux, environnement, cuisine, musique, politique... Cette ouverture d'esprit nourrit ma créativité et enrichit mon approche projet..
           </Text>
          <Text c="var(--mantine-color-gray-8)" mb="md"> 
          </Text>
          <Text c="var(--mantine-color-gray-8)" mb="md">
            Vous trouverez ci-dessous une collection d'articles, des liens vers des projets, issus de mes expériences, réflexions et découvertes.
          </Text>
        </Box> */}
        <Suspense fallback={
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        }>
          {await BlogContent({ currentPage, selectedCategory })}
        </Suspense>
      </Container>
    </Box>
  )
}

async function BlogContent({ currentPage, selectedCategory }: { currentPage: number, selectedCategory?: string }) {
  // Fetch articles directly from service (no need for API call)
  const allArticles = await ArticleService.getPublished()

  // Simple pagination and filtering
  const filteredArticles = selectedCategory
    ? allArticles.filter((article) => article.category?.slug === selectedCategory)
    : allArticles

  const startIndex = (currentPage - 1) * 6
  const endIndex = startIndex + 6
  const articles = filteredArticles.slice(startIndex, endIndex)
  const totalArticles = filteredArticles.length
  const totalPages = Math.ceil(totalArticles / 6)
  const filteredByCategory = selectedCategory

  // Extract unique categories from articles
  const categories = Array.from(
    new Map(
      allArticles
        .map((article) => article.category)
        .filter((cat): cat is Category => cat !== null)
        .map((cat) => [cat.slug, cat])
    ).values()
  ) as Category[]

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
      />

      <Group justify="space-between" mb="md">
        <Text size="sm" c="dimmed">
          {filteredByCategory ? (
            <>
              {totalArticles} article{totalArticles > 1 ? 's' : ''} dans la catégorie "{categories.find((cat: Category) => cat.slug === filteredByCategory)?.name}"
            </>
          ) : (
            <>
              {totalArticles} article{totalArticles > 1 ? 's' : ''} au total
            </>
          )}
        </Text>
        <Text size="sm" c="dimmed">
          Page {currentPage} sur {totalPages}
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </SimpleGrid>

      {articles.length === 0 && (
        <Center py="xl">
          <Text c="dimmed">
            {filteredByCategory ?
              `Aucun article trouvé dans la catégorie "${categories.find((cat) => cat.slug === filteredByCategory)?.name}".` :
              "Aucun article disponible pour le moment."
            }
          </Text>
        </Center>
      )}

      {totalPages > 1 && (
        <BlogPagination
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </>
  )
}