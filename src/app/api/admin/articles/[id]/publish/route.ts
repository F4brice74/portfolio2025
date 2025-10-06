import { NextRequest, NextResponse } from 'next/server';
import { ArticleService } from '@/lib/articles';
import { requireAdmin } from '@/lib/auth/api-auth';

// PATCH /api/admin/articles/[id]/publish - Toggle publication status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

        const { id } = await params;
        const articleId = parseInt(id);
        
        if (isNaN(articleId)) {
            return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
        }

        const body = await request.json();
        const { published } = body;

        // Get current article
        const currentArticle = await ArticleService.getById(articleId);
        if (!currentArticle) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // Update publication status
        const wasPublished = currentArticle.published;
        const isNowPublished = published;

        const updatedArticle = await ArticleService.update(articleId, {
            published: isNowPublished,
            publishedAt: isNowPublished && !wasPublished 
                ? new Date() 
                : (!isNowPublished ? null : (currentArticle.publishedAt ? new Date(currentArticle.publishedAt) : null)),
        });

        if (!updatedArticle) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...updatedArticle,
            message: isNowPublished ? 'Article publié' : 'Article dépublié'
        });
    } catch (error) {
        console.error('Error toggling article publication:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
