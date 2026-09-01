import HomePage from '@/components/landing/HomePage';
import { ArticleService } from '@/lib/articles';
import type { Article } from '@/lib/articles/types';

// 6 articles pour que le carrousel ait de quoi défiler au-delà des 3 cartes visibles
const LATEST_ARTICLES_COUNT = 6;

export const revalidate = 3600;

async function getLatestArticles(): Promise<Article[]> {
  try {
    const articles = await ArticleService.getPublished();
    return articles.slice(0, LATEST_ARTICLES_COUNT);
  } catch (error) {
    // La landing doit rester affichable même si la base est indisponible
    console.error('[Home] Impossible de récupérer les derniers articles:', error);
    return [];
  }
}

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return <HomePage latestArticles={latestArticles} />;
}
