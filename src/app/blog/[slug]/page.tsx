import { Box, Container, Title, Text, Group, Badge, Divider, Stack, Breadcrumbs, Anchor, Button } from "@mantine/core"
import { IconCalendar, IconClock, IconUser, IconArrowLeft, IconHome } from "@tabler/icons-react"
import Link from "next/link"
// Removed mock data imports - now using API calls
import type { ApiArticle } from "@/types/article"

type BlogPostPageProps = {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params

    // Fetch article from API
    const articleResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/articles/${resolvedParams.slug}`, {
        cache: 'no-store'
    })

    if (!articleResponse.ok) {
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
                            <Button component={Link} href="/" leftSection={<IconHome size={16} />}>
                                Retour à l'accueil
                            </Button>
                        </Group>
                    </Box>
                </Container>
            </Box>
        )
    }

    const article = await articleResponse.json()

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
                                href="/"
                                leftSection={<IconArrowLeft size={16} />}
                                variant="outline"
                            >
                                Retour à l'accueil
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


    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
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
                        href="/"
                        c="blue"
                        size="sm"
                        style={{ textDecoration: "none" }}
                    >
                        <Group gap={4}>
                            <IconArrowLeft size={16} />
                            Retour à l'accueil
                        </Group>
                    </Anchor>
                </Group>

                {/* Article Header */}
                <Stack gap="md" mb="xl">
                    <Group>
                        <Badge color="blue" variant="light" size="lg">
                            {article.category?.name || 'Non catégorisé'}
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
                            <Text size="sm">{article.readingTime} min de lecture</Text>
                        </Group>
                        <Group gap={4}>
                            <IconUser size={16} />
                            <Text size="sm">{article.authorName}</Text>
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
                            {article.tags.map((tag: string) => (
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
    const resolvedParams = await params

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/articles/${resolvedParams.slug}`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            return {
                title: 'Article non trouvé',
            }
        }

        const article = await response.json()

        return {
            title: `${article.title} | Fabrice MIQUET-SAGE`,
            description: article.excerpt,
            openGraph: {
                title: article.title,
                description: article.excerpt,
                type: 'article',
                publishedTime: article.publishedAt,
                authors: [article.authorName],
                tags: article.tags,
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'Article non trouvé',
        }
    }
}

// Génération des pages statiques pour tous les articles
export async function generateStaticParams() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/articles`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            return []
        }

        const { articles } = await response.json()

        return articles.map((article: ApiArticle) => ({
            slug: article.slug,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}
