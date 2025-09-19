import { Box, Container, Title, Text, SimpleGrid, Pagination, Center, Loader, Group } from "@mantine/core"
import { Suspense } from "react"
import ArticleCard from "@/components/ArticleCard"
import { getArticlesPaginated } from "@/lib/articles"
import BlogPagination from "@/components/BlogPagination"

interface BlogPageProps {
    searchParams: {
        page?: string
    }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
    const currentPage = parseInt(searchParams.page || '1', 10)

    return (
        <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)", paddingTop: 80 }}>
            <Container size="lg" py="xl">
                <Box mb="xl">
                    <Title order={1} ta="center" mb="md">
                        Blog
                    </Title>
                    <Text ta="center" c="dimmed" size="lg">
                        Découvrez mes réflexions sur le développement, les projets et l'innovation
                    </Text>
                </Box>

                <Suspense fallback={
                    <Center py="xl">
                        <Loader size="lg" />
                    </Center>
                }>
                    <BlogContent currentPage={currentPage} />
                </Suspense>
            </Container>
        </Box>
    )
}

async function BlogContent({ currentPage }: { currentPage: number }) {
    const { articles, totalPages, totalArticles } = await getArticlesPaginated(currentPage, 6)

    return (
        <>
            <Group justify="space-between" mb="md">
                <Text size="sm" c="dimmed">
                    {totalArticles} article{totalArticles > 1 ? 's' : ''} au total
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
                    <Text c="dimmed">Aucun article disponible pour le moment.</Text>
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
