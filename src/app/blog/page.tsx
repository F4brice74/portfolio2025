import LandingShell from '@/components/landing/LandingShell';
import BlogSection from '@/components/landing/BlogSection';
import { ArticleService, CategoryService } from '@/lib/articles';
import type { Metadata } from 'next';

const ARTICLES_PER_PAGE = 6;

export const metadata: Metadata = {
  title: 'Blog | Ossawayas',
  description: 'Conseils et retours d\'expérience sur l\'automatisation, l\'IA et la productivité pour TPE et PME.',
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const categorySlug = params.category;

  let articles = await ArticleService.getPublished();
  if (categorySlug) {
    articles = await ArticleService.getByCategorySlug(categorySlug);
  }

  const categories = await CategoryService.getAll();
  const totalArticles = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedArticles = articles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE,
  );

  return (
    <LandingShell>
      <BlogSection
        articles={paginatedArticles}
        categories={categories}
        currentPage={safePage}
        totalPages={totalPages}
        totalArticles={totalArticles}
        selectedCategory={categorySlug}
      />
    </LandingShell>
  );
}
