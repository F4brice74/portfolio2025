import { eq, desc, and, ilike, sql } from 'drizzle-orm';
import { db } from './index';
import { articles, categories, articleTags, type ArticleWithCategory, type CategoryWithCount } from './schema';

// Article queries
export class ArticleQueries {
  // Get all articles with categories and tags
  static async getAll(): Promise<ArticleWithCategory[]> {
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
      ? await db.select().from(articleTags).where(sql`${articleTags.articleId} = ANY(${articleIds})`)
      : [];

    // Combine data
    return result.map(({ article, category }) => ({
      ...article,
      category,
      tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
    }));
  }

  // Get published articles only
  static async getPublished(): Promise<ArticleWithCategory[]> {
    const result = await db
      .select({
        article: articles,
        category: categories,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(eq(articles.published, true))
      .orderBy(desc(articles.publishedAt));

    const articleIds = result.map(r => r.article.id);
    const tags = articleIds.length > 0 
      ? await db.select().from(articleTags).where(sql`${articleTags.articleId} = ANY(${articleIds})`)
      : [];

    return result.map(({ article, category }) => ({
      ...article,
      category,
      tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
    }));
  }

  // Get article by ID
  static async getById(id: number): Promise<ArticleWithCategory | null> {
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

  // Get article by slug
  static async getBySlug(slug: string): Promise<ArticleWithCategory | null> {
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

  // Create new article
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
    const readingTime = Math.ceil(data.content.length / 200);

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
    return this.getById(newArticle.id) as Promise<ArticleWithCategory>;
  }

  // Update article
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
      updateData.readingTime = Math.ceil(data.content.length / 200);
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

    return this.getById(id);
  }

  // Delete article
  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(articles).where(eq(articles.id, id)).returning();
    return result.length > 0;
  }

  // Check if slug exists
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

// Category queries
export class CategoryQueries {
  // Get all categories with article counts
  static async getAll(): Promise<CategoryWithCount[]> {
    const result = await db
      .select({
        category: categories,
        articleCount: sql<number>`count(${articles.id})::int`,
      })
      .from(categories)
      .leftJoin(articles, and(eq(categories.id, articles.categoryId), eq(articles.published, true)))
      .groupBy(categories.id)
      .orderBy(categories.name);

    return result.map(({ category, articleCount }) => ({
      ...category,
      articleCount: articleCount || 0,
    }));
  }

  // Get category by slug
  static async getBySlug(slug: string): Promise<CategoryWithCount | null> {
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

    const { category, articleCount } = result[0];
    return {
      ...category,
      articleCount: articleCount || 0,
    };
  }

  // Get category by ID
  static async getById(id: number): Promise<CategoryWithCount | null> {
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

    const { category, articleCount } = result[0];
    return {
      ...category,
      articleCount: articleCount || 0,
    };
  }
}
