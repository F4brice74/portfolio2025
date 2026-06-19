import { Anchor, Badge, Box, Breadcrumbs, Button, Container, Divider, Group, Stack, Text, Title } from "@mantine/core"
import { IconArrowLeft, IconCalendar, IconClock, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ArticleService } from "@/lib/articles"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import LandingShell from "@/components/landing/LandingShell"
import { JsonLd } from "@/components/seo/JsonLd"
import { absoluteUrl } from "@/lib/seo/config"
import { articleSchema, breadcrumbSchema, buildGraphSchema } from "@/lib/seo/schema"

type BlogPostPageProps = {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params
    const article = await ArticleService.getBySlug(resolvedParams.slug)

    if (!article || !article.published) {
        return (
            <LandingShell>
                <Box py={80} style={{ backgroundColor: 'var(--ossawayas-bg)', minHeight: '60vh' }}>
                    <Container size="md">
                        <Box ta="center">
                            <Title order={1} size="h1" mb="md" c="navy.7">
                                404
                            </Title>
                            <Title order={2} size="h2" mb="md">
                                Article non trouvé
                            </Title>
                            <Text size="lg" c="dimmed" mb="xl">
                                L&apos;article que vous recherchez n&apos;existe pas ou a été supprimé.
                            </Text>
                            <Group justify="center" gap="md">
                                <Button
                                    component={Link}
                                    href="/blog"
                                    leftSection={<IconArrowLeft size={16} />}
                                    variant="outline"
                                    color="gray"
                                >
                                    Retour au blog
                                </Button>
                                <Button
                                    component={Link}
                                    href="/"
                                    color="navy"
                                >
                                    Accueil
                                </Button>
                            </Group>
                        </Box>
                    </Container>
                </Box>
            </LandingShell>
        )
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const breadcrumbs = [
        { title: 'Accueil', href: '/' },
        { title: 'Blog', href: '/blog' },
        { title: article.title, href: '#' },
    ]

    const structuredData = buildGraphSchema(
        breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: article.title, path: `/blog/${article.slug}` },
        ]),
        articleSchema(article),
    )

    return (
        <LandingShell>
            <JsonLd data={structuredData} />
            <Box py={48} style={{ backgroundColor: 'var(--ossawayas-bg)', minHeight: '60vh' }}>
                <Container size="md">
                    <Breadcrumbs mb="lg">
                        {breadcrumbs.map((item, index) => (
                            <Anchor
                                key={index}
                                component={Link}
                                href={item.href}
                                c={index === breadcrumbs.length - 1 ? 'dimmed' : 'navy.7'}
                                size="sm"
                                underline="never"
                            >
                                {item.title}
                            </Anchor>
                        ))}
                    </Breadcrumbs>

                    <Anchor
                        component={Link}
                        href="/blog"
                        c="navy.7"
                        size="sm"
                        underline="never"
                        mb="xl"
                        display="inline-block"
                    >
                        <Group gap={4}>
                            <IconArrowLeft size={16} />
                            Retour au blog
                        </Group>
                    </Anchor>

                    <Stack gap="md" mb="xl">
                        <Badge color="navy" variant="light" size="lg" w="fit-content">
                            {article.category?.name || 'Non catégorisé'}
                        </Badge>

                        <Title order={1} size="h1">
                            {article.title}
                        </Title>

                        <Group gap="xl" c="dimmed" wrap="wrap">
                            <Group gap={4}>
                                <IconCalendar size={16} />
                                <Text size="sm">{formatDate(article.publishedAt || '')}</Text>
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

                    {article.featuredImage && (
                        <Box mb="xl">
                            <Box
                                style={{
                                    height: 400,
                                    backgroundImage: `url(${article.featuredImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 'var(--mantine-radius-lg)',
                                }}
                            />
                        </Box>
                    )}

                    <Box>
                        <Text
                            size="lg"
                            c="dimmed"
                            mb="xl"
                            fs="italic"
                            lh={1.7}
                        >
                            {article.excerpt}
                        </Text>

                        <MarkdownRenderer content={article.content} />
                    </Box>

                    {article.tags.length > 0 && (
                        <Box mt="xl">
                            <Divider mb="md" />
                            <Group gap="xs">
                                <Text size="sm" fw={500}>Tags :</Text>
                                {article.tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline" color="gray" size="sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </Group>
                        </Box>
                    )}
                </Container>
            </Box>
        </LandingShell>
    )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params

    try {
        const article = await ArticleService.getBySlug(resolvedParams.slug)

        if (!article || !article.published) {
            return {
                title: 'Article non trouvé',
                robots: { index: false, follow: false },
            }
        }

        const ogImage = article.featuredImage
            ? absoluteUrl(article.featuredImage)
            : absoluteUrl('/opengraph-image')

        return {
            title: article.title,
            description: article.excerpt,
            alternates: {
                canonical: `/blog/${article.slug}`,
            },
            openGraph: {
                title: article.title,
                description: article.excerpt,
                type: 'article',
                url: `/blog/${article.slug}`,
                publishedTime: article.publishedAt || undefined,
                modifiedTime: article.updatedAt,
                authors: [article.authorName],
                tags: article.tags,
                images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description: article.excerpt,
                images: [ogImage],
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'Article non trouvé',
            robots: { index: false, follow: false },
        }
    }
}

export async function generateStaticParams() {
    if (process.env.NODE_ENV === 'development') {
        return []
    }

    try {
        const articles = await ArticleService.getPublished()
        return articles.map((article) => ({
            slug: article.slug,
        }))
    } catch (error) {
        console.error('Error generating static params:', error)
        return []
    }
}
