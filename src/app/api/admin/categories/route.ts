import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/articles/service';
import { requireAdmin } from '@/lib/auth/api-auth';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/admin/categories - Get all categories
export async function GET() {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

        const categoriesList = await CategoryService.getAll();
        return NextResponse.json({ categories: categoriesList });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/admin/categories - Create new category
export async function POST(request: NextRequest) {
    try {
        // Check admin authorization
        const authError = await requireAdmin();
        if (authError) return authError;

        const body = await request.json();
        const { name, description } = body;

        // Basic validation
        if (!name) {
            return NextResponse.json(
                { error: 'Le nom de la catégorie est requis' },
                { status: 400 }
            );
        }

        // Generate slug from name
        const slug = name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim();

        // Check if slug already exists
        const existingCategory = await db
            .select()
            .from(categories)
            .where(eq(categories.slug, slug))
            .limit(1);

        if (existingCategory.length > 0) {
            return NextResponse.json(
                { error: 'Une catégorie avec ce nom existe déjà' },
                { status: 409 }
            );
        }

        // Create new category
        const [newCategory] = await db.insert(categories).values({
            name,
            slug,
            description: description || null,
        }).returning();

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}