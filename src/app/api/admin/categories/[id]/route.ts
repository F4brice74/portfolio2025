import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/api-auth';
import { db } from '@/lib/db';
import { categories, articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// DELETE /api/admin/categories/[id] - Delete category
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

        const resolvedParams = await params;
        const categoryId = parseInt(resolvedParams.id);
        if (isNaN(categoryId)) {
            return NextResponse.json(
                { error: 'ID de catégorie invalide' },
                { status: 400 }
            );
        }

        // Check if category exists
        const existingCategory = await db
            .select()
            .from(categories)
            .where(eq(categories.id, categoryId))
            .limit(1);

        if (existingCategory.length === 0) {
            return NextResponse.json(
                { error: 'Catégorie non trouvée' },
                { status: 404 }
            );
        }

        // Check if category has articles
        const articlesWithCategory = await db
            .select()
            .from(articles)
            .where(eq(articles.categoryId, categoryId))
            .limit(1);

        if (articlesWithCategory.length > 0) {
            return NextResponse.json(
                { error: 'Impossible de supprimer une catégorie qui contient des articles' },
                { status: 409 }
            );
        }

        // Delete category
        await db.delete(categories).where(eq(categories.id, categoryId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
