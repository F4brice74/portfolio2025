import type { MetadataRoute } from 'next';
import { ArticleService } from '@/lib/articles';
import { getAllFactoryProjectSlugs } from '@/data/factory-projects';
import { absoluteUrl } from '@/lib/seo/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/blog'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await ArticleService.getPublished();
    articlePages = articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // Base de données indisponible au build — le sitemap reste fonctionnel
  }

  const factoryPages: MetadataRoute.Sitemap = getAllFactoryProjectSlugs().map((slug) => ({
    url: absoluteUrl(`/factory/${slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...factoryPages];
}
