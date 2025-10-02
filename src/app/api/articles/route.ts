import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles, categories, articleTags } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/articles - Get published articles for public pages
export async function GET() {
    try {
        // Get published articles directly with Drizzle
        const result = await db
            .select({
                article: articles,
                category: categories,
            })
            .from(articles)
            .leftJoin(categories, eq(articles.categoryId, categories.id))
            .where(eq(articles.published, true))
            .orderBy(desc(articles.createdAt));

        // Get tags for all articles
        const articleIds = result.map(r => r.article.id);
        const tags = articleIds.length > 0 
            ? await db.select().from(articleTags)
            : [];

        // Combine data
        const articlesWithData = result.map(({ article, category }) => ({
            ...article,
            category,
            tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
        }));
        
        console.log('Public getAll articles:', articlesWithData.length, 'articles');
        return NextResponse.json({ articles: articlesWithData });
    } catch (error) {
        console.error('Error fetching published articles:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
