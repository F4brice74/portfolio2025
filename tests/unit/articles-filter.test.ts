// Test unitaire simple pour les fonctions de filtrage
// Ce fichier peut être exécuté avec Node.js directement

import { describe, it, expect } from '@jest/globals';

// Simulation des données de test
const mockArticles = [
  {
    id: "1",
    title: "Introduction à Next.js 15 et React 19",
    category: "Développement",
    publishedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2", 
    title: "Architecture microservices avec Docker",
    category: "Architecture",
    publishedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    title: "Optimisation des performances web",
    category: "Performance",
    publishedAt: "2024-01-05T09:15:00Z",
  },
  {
    id: "4",
    title: "Gestion d'état avec Zustand",
    category: "Développement", 
    publishedAt: "2024-01-01T16:45:00Z",
  },
  {
    id: "5",
    title: "Sécurité des applications web",
    category: "Sécurité",
    publishedAt: "2023-12-28T11:20:00Z",
  }
];

const mockCategories = [
  { id: "1", name: "Développement", slug: "developpement", articleCount: 2 },
  { id: "2", name: "Architecture", slug: "architecture", articleCount: 1 },
  { id: "3", name: "Performance", slug: "performance", articleCount: 1 },
  { id: "4", name: "Sécurité", slug: "securite", articleCount: 1 }
];

// Fonction de test pour simuler getArticlesPaginated
function testGetArticlesPaginated(page = 1, limit = 6, categorySlug?: string) {
  let filteredArticles = mockArticles;
  
  // Filtrer par catégorie si spécifiée
  if (categorySlug) {
    const category = mockCategories.find(cat => cat.slug === categorySlug);
    if (category) {
      filteredArticles = mockArticles.filter(article => article.category === category.name);
    }
  }
  
  // Trier par date de publication (plus récent en premier)
  const sortedArticles = filteredArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const totalArticles = sortedArticles.length;
  const totalPages = Math.ceil(totalArticles / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const articles = sortedArticles.slice(startIndex, endIndex);
  
  return {
    articles,
    totalPages,
    currentPage: page,
    totalArticles,
    filteredByCategory: categorySlug
  };
}

describe('Articles Filtering Functions', () => {
  describe('getArticlesPaginated with category filtering', () => {
    it('should return all articles when no category filter is applied', () => {
      const result = testGetArticlesPaginated(1, 6);
      
      expect(result.totalArticles).toBe(5);
      expect(result.articles).toHaveLength(5);
      expect(result.filteredByCategory).toBeUndefined();
    });

    it('should filter articles by category slug', () => {
      const result = testGetArticlesPaginated(1, 6, 'developpement');
      
      expect(result.totalArticles).toBe(2);
      expect(result.filteredByCategory).toBe('developpement');
      expect(result.articles.every(article => article.category === 'Développement')).toBe(true);
    });

    it('should filter articles by architecture category', () => {
      const result = testGetArticlesPaginated(1, 6, 'architecture');
      
      expect(result.totalArticles).toBe(1);
      expect(result.filteredByCategory).toBe('architecture');
      expect(result.articles[0].category).toBe('Architecture');
    });

    it('should return empty results for non-existent category', () => {
      const result = testGetArticlesPaginated(1, 6, 'inexistante');
      
      expect(result.totalArticles).toBe(0);
      expect(result.articles).toHaveLength(0);
      expect(result.filteredByCategory).toBe('inexistante');
    });

    it('should handle pagination with category filter', () => {
      // Get all Development articles (2 total)
      const page1 = testGetArticlesPaginated(1, 1, 'developpement');
      expect(page1.totalArticles).toBe(2);
      expect(page1.articles).toHaveLength(1);
      expect(page1.currentPage).toBe(1);
      expect(page1.totalPages).toBe(2);

      const page2 = testGetArticlesPaginated(2, 1, 'developpement');
      expect(page2.totalArticles).toBe(2);
      expect(page2.articles).toHaveLength(1);
      expect(page2.currentPage).toBe(2);
      expect(page2.totalPages).toBe(2);
    });

    it('should maintain correct sorting when filtering', () => {
      const result = testGetArticlesPaginated(1, 10, 'developpement');
      
      // Articles should be sorted by publication date (newest first)
      const dates = result.articles.map(article => new Date(article.publishedAt).getTime());
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
      }
    });
  });

  describe('Category filtering edge cases', () => {
    it('should handle empty category slug', () => {
      const result = testGetArticlesPaginated(1, 6, '');
      
      expect(result.totalArticles).toBe(5);
      expect(result.filteredByCategory).toBe('');
    });

    it('should handle undefined category slug', () => {
      const result = testGetArticlesPaginated(1, 6, undefined);
      
      expect(result.totalArticles).toBe(5);
      expect(result.filteredByCategory).toBeUndefined();
    });
  });

  describe('Performance and data integrity', () => {
    it('should complete filtering within reasonable time', () => {
      const startTime = Date.now();
      testGetArticlesPaginated(1, 6, 'developpement');
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast with mock data
    });

    it('should maintain data consistency across multiple calls', () => {
      const result1 = testGetArticlesPaginated(1, 6, 'developpement');
      const result2 = testGetArticlesPaginated(1, 6, 'developpement');
      
      expect(result1.totalArticles).toBe(result2.totalArticles);
      expect(result1.articles).toHaveLength(result2.articles.length);
    });
  });
});
