import { NextRequest, NextResponse } from 'next/server';
import { ArticleQueries } from '@/lib/db/queries';

// GET /api/articles/[slug] - Get published article by slug for public pages
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        
        // Get published article by slug
        const article = await ArticleQueries.getBySlug(slug);
        
        // Log article for debugging
        console.log('=== API GET /api/articles/[slug] (PUBLIC) ===');
        console.log('Article slug:', slug);
        console.log('Article found:', !!article);
        if (article) {
            console.log('Article published:', article.published);
            console.log('Article data:', JSON.stringify(article, null, 2));
        }
        console.log('============================================');
        
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        if (!article.published) {
            return NextResponse.json({ error: 'Article not published' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error fetching article by slug:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
