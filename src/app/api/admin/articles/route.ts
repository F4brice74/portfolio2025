import { NextRequest, NextResponse } from 'next/server';
import { ArticleService, CategoryService } from '@/lib/articles';
import { requireAdmin } from '@/lib/auth/api-auth';

// GET /api/admin/articles - List all articles for admin
export async function GET() {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

        // Get all articles via service
        const articles = await ArticleService.getAll();
        console.log('Admin getAll articles:', articles.length, 'articles');
        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/admin/articles - Create new article
export async function POST(request: NextRequest) {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

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

        // Get category ID by name
        const categories = await CategoryService.getAll();
        const categoryObj = categories.find(cat => cat.name === category);
        if (!categoryObj) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 400 }
            );
        }

        // Create new article via service
        const newArticle = await ArticleService.create({
            title,
            slug,
            excerpt,
            content,
            featuredImage: featuredImage || undefined,
            published: published || false,
            categoryId: categoryObj.id,
            authorName: 'Fabrice MIQUET-SAGE',
            authorEmail: 'fabrice@example.com',
            tags: tags || [],
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        
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
