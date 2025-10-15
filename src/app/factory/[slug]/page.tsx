import { notFound } from 'next/navigation';
import { Anchor, Box, Breadcrumbs, Container } from '@mantine/core';
import Link from 'next/link';
import { FactoryProject } from '@/components/FactoryProject';
import { getFactoryProject, getAllFactoryProjectSlugs } from '@/data/factory-projects';
import type { Metadata } from 'next';

type FactoryProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

// Générer les métadonnées pour le SEO
export async function generateMetadata({ params }: FactoryProjectPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = getFactoryProject(resolvedParams.slug);

    if (!project) {
        return {
            title: 'Projet non trouvé',
        };
    }

    const keywords = [
        ...project.technologies,
        'projet',
        'portfolio',
        'développement',
        'web',
    ].join(', ');

    return {
        title: `${project.title} | Factory - OSSAWAYAS`,
        description: project.description,
        keywords,
        authors: [{ name: 'OSSAWAYAS' }],
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'article',
            images: project.featuredImage ? [
                {
                    url: project.featuredImage,
                    width: 1200,
                    height: 600,
                    alt: project.title,
                }
            ] : [],
            siteName: 'OSSAWAYAS',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: project.featuredImage ? [project.featuredImage] : [],
        },
        alternates: {
            canonical: `/factory/${resolvedParams.slug}`,
        },
    };
}

// Générer les paramètres statiques pour toutes les pages factory
export async function generateStaticParams() {
    const slugs = getAllFactoryProjectSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function FactoryProjectPage({ params }: FactoryProjectPageProps) {
    const resolvedParams = await params;
    const project = getFactoryProject(resolvedParams.slug);

    // Si le projet n'existe pas, afficher la page 404
    if (!project) {
        notFound();
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { title: 'Accueil', href: '/', isActive: false },
        { title: 'Factory', href: '#', isActive: false },
        { title: project.title, href: '#', isActive: true },
    ].map((item, index) => {
        if (item.isActive || item.href === '#') {
            return (
                <span key={index} style={{ color: 'var(--mantine-color-dimmed)' }}>
                    {item.title}
                </span>
            );
        }
        return (
            <Anchor key={index} component={Link} href={item.href}>
                {item.title}
            </Anchor>
        );
    });

    return (
        <Box style={{ paddingTop: 80 }}>
            {/* Breadcrumb navigation */}
            <Box style={{ backgroundColor: 'var(--mantine-color-gray-1)', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                <Container size="lg" py="sm">
                    <Breadcrumbs separator="›">
                        {breadcrumbItems}
                    </Breadcrumbs>
                </Container>
            </Box>

            {/* Contenu du projet */}
            <FactoryProject project={project} slug={resolvedParams.slug} />
        </Box>
    );
}

