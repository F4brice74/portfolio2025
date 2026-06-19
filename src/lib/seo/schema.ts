import type { Article } from '@/lib/articles/types';
import { absoluteUrl, SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, getSiteUrl } from './config';

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${getSiteUrl()}/#organization`,
    name: SITE_NAME,
    url: getSiteUrl(),
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon'),
    },
  };
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${getSiteUrl()}/#organization` },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt ?? article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: { '@id': `${getSiteUrl()}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${article.slug}`),
    },
    ...(article.featuredImage
      ? { image: [absoluteUrl(article.featuredImage)] }
      : {}),
    ...(article.tags.length > 0
      ? { keywords: article.tags.join(', ') }
      : {}),
  };
}

export function buildGraphSchema(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
