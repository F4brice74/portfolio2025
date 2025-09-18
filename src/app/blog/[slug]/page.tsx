import { Box, Container, Title, Text, Group, Badge, Divider, Stack, Breadcrumbs, Anchor, Button } from "@mantine/core"
import { IconCalendar, IconClock, IconUser, IconArrowLeft, IconHome } from "@tabler/icons-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticles } from "@/lib/articles"

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
        return (
            <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
                <Container size="md" py="xl">
                    <Box ta="center">
                        <Title order={1} size="h1" mb="md" c="blue">
                            404
                        </Title>
                        <Title order={2} size="h2" mb="md">
                            Article non trouvé
                        </Title>
                        <Text size="lg" c="dimmed" mb="xl">
                            L'article que vous recherchez n'existe pas ou a été supprimé.
                        </Text>
                        <Group justify="center" gap="md">
                            <Button
                                component={Link}
                                href="/blog"
                                leftSection={<IconArrowLeft size={16} />}
                                variant="outline"
                            >
                                Retour au blog
                            </Button>
                            <Button
                                component={Link}
                                href="/"
                                leftSection={<IconHome size={16} />}
                            >
                                Accueil
                            </Button>
                        </Group>
                    </Box>
                </Container>
            </Box>
        )
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const wordCount = content.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / wordsPerMinute)
        return `${readingTime} min de lecture`
    }

    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: article.title, href: '#' },
    ]

    return (
        <Box style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
            <Container size="md" py="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs mb="lg">
                    {breadcrumbs.map((item, index) => (
                        <Anchor
                            key={index}
                            component={Link}
                            href={item.href}
                            c={index === breadcrumbs.length - 1 ? "dimmed" : "blue"}
                            size="sm"
                        >
                            {item.title}
                        </Anchor>
                    ))}
                </Breadcrumbs>

                {/* Back to blog */}
                <Group mb="xl">
                    <Anchor
                        component={Link}
                        href="/blog"
                        c="blue"
                        size="sm"
                        style={{ textDecoration: "none" }}
                    >
                        <Group gap={4}>
                            <IconArrowLeft size={16} />
                            Retour au blog
                        </Group>
                    </Anchor>
                </Group>

                {/* Article Header */}
                <Stack gap="md" mb="xl">
                    <Group>
                        <Badge color="blue" variant="light" size="lg">
                            {article.category}
                        </Badge>
                    </Group>

                    <Title order={1} size="h1" fw={700}>
                        {article.title}
                    </Title>

                    <Group gap="xl" c="dimmed">
                        <Group gap={4}>
                            <IconCalendar size={16} />
                            <Text size="sm">{formatDate(article.publishedAt)}</Text>
                        </Group>
                        <Group gap={4}>
                            <IconClock size={16} />
                            <Text size="sm">{getReadingTime(article.content)}</Text>
                        </Group>
                        <Group gap={4}>
                            <IconUser size={16} />
                            <Text size="sm">{article.author.name}</Text>
                        </Group>
                    </Group>
                </Stack>

                <Divider mb="xl" />

                {/* Featured Image */}
                {article.featuredImage && (
                    <Box mb="xl">
                        <Box
                            style={{
                                height: 400,
                                backgroundImage: `url(${article.featuredImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                )}

                {/* Article Content */}
                <Box
                    style={{
                        lineHeight: 1.7,
                        fontSize: '18px',
                    }}
                >
                    <Text
                        size="lg"
                        c="dimmed"
                        mb="xl"
                        style={{ fontStyle: 'italic' }}
                    >
                        {article.excerpt}
                    </Text>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: article.content.replace(/\n/g, '<br />')
                        }}
                    />
                </Box>

                {/* Tags */}
                {article.tags.length > 0 && (
                    <Box mt="xl">
                        <Divider mb="md" />
                        <Group gap="xs">
                            <Text size="sm" fw={500}>Tags:</Text>
                            {article.tags.map((tag) => (
                                <Badge key={tag} variant="outline" size="sm">
                                    {tag}
                                </Badge>
                            ))}
                        </Group>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

// Génération des métadonnées pour le SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
        return {
            title: 'Article non trouvé',
        }
    }

    return {
        title: `${article.title} | Fabrice MIQUET-SAGE`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.publishedAt,
            authors: [article.author.name],
            tags: article.tags,
        },
    }
}

// Génération des pages statiques pour tous les articles
export async function generateStaticParams() {
    const articles = await getArticles()

    return articles.map((article) => ({
        slug: article.slug,
    }))
}
