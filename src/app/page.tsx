import { Box, Container, Title, Text, SimpleGrid, Center, Loader, Group } from "@mantine/core"
import { Suspense } from "react"
import ArticleCard from "@/components/ArticleCard"
import { getArticlesPaginated, getCategories } from "@/lib/articles"
import BlogPagination from "@/components/BlogPagination"
import CategoryFilter from "@/components/CategoryFilter"

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
            Fabrice MIQUET-SAGE
          </Title>
          <Title order={2} size={20} c="var(--mantine-color-blue-6)" fw={500}>
            Développeur Fullstack - Catalyseur de projets
          </Title>
        </Box>
        <Box mb="xl">
          <Text c="var(--mantine-color-gray-8)" mb="md">
            Fort de 15 ans d'expérience en gestion de projet dans  l'audiovisuel, l'événementiel et la communication, complétés par 5 années de développement fullstack, j'ai développé une approche centrée sur les besoins clients et métiers.
            <br />Ce qui me motive ? Partir d'une feuille blanche, identifier les vrais enjeux, orchestrer les équipes et voir naître des projets qui ont du sens.</Text>
          <Text c="var(--mantine-color-gray-8)" mb="md"> À l'heure où l'IA révolutionne le code, ma valeur ajoutée réside dans ma capacité à comprendre, structurer et piloter des projets, de la conception à la livraison. Actuellement dans le développement logiciel chez un leader mondial de l'aéronautique, je cultive une curiosité insatiable pour tout ce qui nous entoure : nouvelles technologies, enjeux sociétaux, environnement, cuisine, musique, politique... Cette ouverture d'esprit nourrit ma créativité et enrichit mon approche projet.
          </Text>
          <Text c="var(--mantine-color-gray-8)" mb="md">
            Vous trouverez ci-dessous une collection d'articles, des liens vers des projets, issus de mes expériences, réflexions et découvertes.
          </Text>
        </Box>
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
  const [articlesData, categories] = await Promise.all([
    getArticlesPaginated(currentPage, 6, selectedCategory),
    getCategories()
  ])

  const { articles, totalPages, totalArticles, filteredByCategory } = articlesData

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
              {totalArticles} article{totalArticles > 1 ? 's' : ''} dans la catégorie "{categories.find(cat => cat.slug === filteredByCategory)?.name}"
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
              `Aucun article trouvé dans la catégorie "${categories.find(cat => cat.slug === filteredByCategory)?.name}".` :
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