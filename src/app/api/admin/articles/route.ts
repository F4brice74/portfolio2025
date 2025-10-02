import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ArticleQueries, CategoryQueries } from '@/lib/db/queries';

// GET /api/admin/articles - List all articles for admin
export async function GET() {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all articles from database
        const articles = await ArticleQueries.getAll();
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
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

        // Check if slug already exists
        const slugExists = await ArticleQueries.slugExists(slug);
        if (slugExists) {
            return NextResponse.json(
                { error: 'Un article avec ce slug existe déjà' },
                { status: 409 }
            );
        }

        // Get category ID by name
        const categories = await CategoryQueries.getAll();
        const categoryObj = categories.find(cat => cat.name === category);
        if (!categoryObj) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 400 }
            );
        }

        // Create new article
        const newArticle = await ArticleQueries.create({
            title,
            slug,
            excerpt,
            content,
            featuredImage: featuredImage || undefined,
            published: published || false,
            publishedAt: published ? new Date() : null,
            categoryId: categoryObj.id,
            authorName: 'Fabrice MIQUET-SAGE',
            authorEmail: 'fabrice@example.com',
            tags: tags || [],
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
