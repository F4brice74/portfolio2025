/**
 * Repository - Accès aux données (couche DB)
 * 
 * Responsabilités :
 * - Exécuter les requêtes Drizzle
 * - Retourner les données BRUTES (format DB)
 * - Pas de transformation métier
 * - Pas de logique applicative
 */

import 'server-only'; // Empêche l'import côté client

import { eq, desc, and, sql, inArray } from 'drizzle-orm';
import { db } from '@/lib/db';
import { articles, categories, articleTags } from '@/lib/db/schema';
import type { ArticleWithCategory } from '@/lib/db/schema';

/**
 * Repository pour les articles
 */
export class ArticleRepository {
  /**
   * Récupère tous les articles avec leurs catégories et tags
   */
  static async findAll(): Promise<ArticleWithCategory[]> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .orderBy(desc(articles.createdAt));

    // Get tags for all articles
    const articleIds = result.map(r => r.article.id);
    const tags = articleIds.length > 0 
      ? await db.select().from(articleTags).where(inArray(articleTags.articleId, articleIds))
      : [];

    // Combine data
    return result.map(({ article, category }) => ({
      ...article,
      category,
      tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
    }));
  }

  /**
   * Récupère uniquement les articles publiés
   */
  static async findPublished(): Promise<ArticleWithCategory[]> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));

    const articleIds = result.map(r => r.article.id);
    const tags = articleIds.length > 0 
      ? await db.select().from(articleTags).where(inArray(articleTags.articleId, articleIds))
      : [];

    return result.map(({ article, category }) => ({
      ...article,
      category,
      tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
    }));
  }

  /**
   * Récupère un article par ID
   */
  static async findById(id: number): Promise<ArticleWithCategory | null> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.id, id))
      .limit(1);

    if (result.length === 0) return null;

    const tags = await db
      .select()
      .from(articleTags)
      .where(eq(articleTags.articleId, id));

    const { article, category } = result[0];
    return {
      ...article,
      category,
      tags: tags.map(tag => tag.tag),
    };
  }

  /**
   * Récupère un article par slug
   */
  static async findBySlug(slug: string): Promise<ArticleWithCategory | null> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.slug, slug))
      .limit(1);

    if (result.length === 0) return null;

    const tags = await db
      .select()
      .from(articleTags)
      .where(eq(articleTags.articleId, result[0].article.id));

    const { article, category } = result[0];
    return {
      ...article,
      category,
      tags: tags.map(tag => tag.tag),
    };
  }

  /**
   * Récupère les articles d'une catégorie
   */
  static async findByCategorySlug(categorySlug: string): Promise<ArticleWithCategory[]> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(and(
        eq(categories.slug, categorySlug),
        eq(articles.published, true)
      ))
      .orderBy(desc(articles.publishedAt));

    const articleIds = result.map(r => r.article.id);
    const tags = articleIds.length > 0 
      ? await db.select().from(articleTags).where(inArray(articleTags.articleId, articleIds))
      : [];

    return result.map(({ article, category }) => ({
      ...article,
      category,
      tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
    }));
  }

  /**
   * Crée un nouvel article
   */
  static async create(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    published: boolean;
    publishedAt?: Date | null;
    categoryId: number;
    authorName: string;
    authorEmail: string;
    tags: string[];
  }): Promise<ArticleWithCategory> {
    const readingTime = Math.ceil(data.content.length / 600);

    // Create article
    const [newArticle] = await db.insert(articles).values({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featuredImage: data.featuredImage,
      published: data.published,
      publishedAt: data.publishedAt,
      categoryId: data.categoryId,
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      readingTime,
    }).returning();

    // Add tags
    if (data.tags.length > 0) {
      await db.insert(articleTags).values(
        data.tags.map(tag => ({
          articleId: newArticle.id,
          tag,
        }))
      );
    }

    // Return with category and tags
    return this.findById(newArticle.id) as Promise<ArticleWithCategory>;
  }

  /**
   * Met à jour un article
   */
  static async update(id: number, data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    published: boolean;
    publishedAt: Date | null;
    categoryId: number;
    tags: string[];
  }>): Promise<ArticleWithCategory | null> {
    const updateData: Record<string, unknown> = { ...data };
    
    if (data.content) {
      updateData.readingTime = Math.ceil(data.content.length / 600);
    }
    updateData.updatedAt = new Date();

    // Update article
    const [updatedArticle] = await db
      .update(articles)
      .set(updateData)
      .where(eq(articles.id, id))
      .returning();

    if (!updatedArticle) return null;

    // Update tags if provided
    if (data.tags !== undefined) {
      // Delete existing tags
      await db.delete(articleTags).where(eq(articleTags.articleId, id));
      
      // Add new tags
      if (data.tags.length > 0) {
        await db.insert(articleTags).values(
          data.tags.map(tag => ({
            articleId: id,
            tag,
          }))
        );
      }
    }

    return this.findById(id);
  }

  /**
   * Supprime un article
   */
  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id)).returning();
    return result.length > 0;
  }

  /**
   * Vérifie si un slug existe
   */
  static async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    const conditions = excludeId 
      ? and(eq(articles.slug, slug), sql`${articles.id} != ${excludeId}`)
      : eq(articles.slug, slug);
    
    const result = await db
      .select({ id: articles.id })
      .from(articles)
      .where(conditions)
      .limit(1);
    
    return result.length > 0;
  }
}

/**
 * Repository pour les catégories
 */
export class CategoryRepository {
  /**
   * Récupère toutes les catégories avec le nombre d'articles
   */
  static async findAll() {
    const result = await db
      .select({
        category: categories,
        articleCount: sql<number>`count(${articles.id})::int`,
      })
      .from(categories)
      .leftJoin(articles, and(eq(categories.id, articles.categoryId), eq(articles.published, true)))
      .groupBy(categories.id)
      .orderBy(categories.name);

    return result;
  }

  /**
   * Récupère une catégorie par slug
   */
  static async findBySlug(slug: string) {
    const result = await db
      .select({
        category: categories,
        articleCount: sql<number>`count(${articles.id})::int`,
      })
      .from(categories)
      .leftJoin(articles, and(eq(categories.id, articles.categoryId), eq(articles.published, true)))
      .where(eq(categories.slug, slug))
      .groupBy(categories.id)
      .limit(1);

    if (result.length === 0) return null;

    return result[0];
  }

  /**
   * Récupère une catégorie par ID
   */
  static async findById(id: number) {
    const result = await db
      .select({
        category: categories,
        articleCount: sql<number>`count(${articles.id})::int`,
      })
      .from(categories)
      .leftJoin(articles, and(eq(categories.id, articles.categoryId), eq(articles.published, true)))
      .where(eq(categories.id, id))
      .groupBy(categories.id)
      .limit(1);

    if (result.length === 0) return null;

    return result[0];
  }
}

