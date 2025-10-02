import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ArticleService, CategoryService } from '@/lib/articles';

// GET /api/admin/articles/[id] - Get single article for editing
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const articleId = parseInt(id);
        
        if (isNaN(articleId)) {
            return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
        }
        
        const article = await ArticleService.getById(articleId);
        
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/admin/articles/[id] - Update article
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const articleId = parseInt(id);
        
        if (isNaN(articleId)) {
            return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            excerpt,
            content,
            category,
            tags,
            featuredImage,
            published
        } = body;

        // Basic validation
        if (!title || !slug || !excerpt || !content || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if article exists
        const currentArticle = await ArticleService.getById(articleId);
        if (!currentArticle) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // Get category ID by name
        const categories = await CategoryService.getAll();
        const categoryObj = categories.find(cat => cat.name === category);
        if (!categoryObj) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 400 }
            );
        }

        // Update article
        const wasPublished = currentArticle.published;
        const isNowPublished = published;

        const updateData = {
            title,
            slug,
            excerpt,
            content,
            categoryId: categoryObj.id,
            tags: tags || [],
            featuredImage: featuredImage || undefined,
            published: published || false,
            publishedAt: isNowPublished && !wasPublished 
                ? new Date() 
                : (currentArticle.publishedAt ? new Date(currentArticle.publishedAt) : null),
        };

        const updatedArticle = await ArticleService.update(articleId, updateData);

        if (!updatedArticle) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        
        // Handle validation errors from service
        if (error instanceof Error && error.message.includes('slug existe déjà')) {
            return NextResponse.json(
                { error: error.message },
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/articles/[id] - Delete article
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const articleId = parseInt(id);
        
        if (isNaN(articleId)) {
            return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
        }
        
        const success = await ArticleService.delete(articleId);
        if (!success) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
