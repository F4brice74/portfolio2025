import { NextResponse } from 'next/server';
import { ArticleService } from '@/lib/articles';

// GET /api/articles - Get published articles for public pages
export async function GET() {
    try {
        // Get published articles via service
        const articles = await ArticleService.getPublished();
        
        console.log('Public getAll articles:', articles.length, 'articles');
        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Error fetching published articles:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
