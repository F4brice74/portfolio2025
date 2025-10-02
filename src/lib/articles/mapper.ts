/**
 * Mapper - Transforme les données DB vers les types unifiés
 * 
 * Responsabilités :
 * - Conversion Date → string ISO
 * - Normalisation null/undefined
 * - Transformation des structures de données
 */

import type { Article, Category, CategoryWithCount } from './types';
import type { 
  Article as DbArticle, 
  Category as DbCategory,
  ArticleWithCategory as DbArticleWithCategory 
} from '@/lib/db/schema';

/**
 * Convertit une catégorie DB en catégorie unifiée
 */
export function toCategory(dbCategory: DbCategory): Category {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    slug: dbCategory.slug,
    description: dbCategory.description ?? null,
    createdAt: dbCategory.createdAt.toISOString(),
    updatedAt: dbCategory.updatedAt.toISOString(),
  };
}

/**
 * Convertit une catégorie avec compteur
 */
export function toCategoryWithCount(
  dbCategory: DbCategory,
  articleCount: number
): CategoryWithCount {
  return {
    ...toCategory(dbCategory),
    articleCount,
  };
}

/**
 * Convertit un article DB (avec catégorie) en article unifié
 */
export function toArticle(dbArticle: DbArticleWithCategory): Article {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    slug: dbArticle.slug,
    content: dbArticle.content,
    excerpt: dbArticle.excerpt,
    featuredImage: dbArticle.featuredImage ?? null,
    published: dbArticle.published,
    publishedAt: dbArticle.publishedAt ? dbArticle.publishedAt.toISOString() : null,
    authorName: dbArticle.authorName,
    authorEmail: dbArticle.authorEmail,
    readingTime: dbArticle.readingTime,
    createdAt: dbArticle.createdAt.toISOString(),
    updatedAt: dbArticle.updatedAt.toISOString(),
    
    // Relations
    category: dbArticle.category ? toCategory(dbArticle.category) : null,
    categoryId: dbArticle.categoryId ?? null,
    tags: dbArticle.tags || [],
  };
}

/**
 * Convertit plusieurs articles DB en articles unifiés
 */
export function toArticles(dbArticles: DbArticleWithCategory[]): Article[] {
  return dbArticles.map(toArticle);
}

/**
 * Convertit plusieurs catégories DB en catégories unifiées
 */
export function toCategories(dbCategories: DbCategory[]): Category[] {
  return dbCategories.map(toCategory);
}

