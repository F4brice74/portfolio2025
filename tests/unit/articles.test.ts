import { describe, it, expect, beforeEach } from '@jest/globals';
import { 
  getArticlesPaginated, 
  getCategories, 
  getArticlesByCategory,
  searchArticles 
} from '../../src/lib/articles';

describe('Articles Library - Category Filtering', () => {
  describe('getCategories', () => {
    it('should return all available categories', async () => {
      const categories = await getCategories();
      
      expect(categories).toHaveLength(5);
      expect(categories.map(cat => cat.name)).toEqual([
        'Développement',
        'Architecture', 
        'Performance',
        'Sécurité',
        'DevOps'
      ]);
    });

    it('should return categories with correct article counts', async () => {
      const categories = await getCategories();
      
      const developmentCategory = categories.find(cat => cat.name === 'Développement');
      expect(developmentCategory?.articleCount).toBe(5);
      
      const architectureCategory = categories.find(cat => cat.name === 'Architecture');
      expect(architectureCategory?.articleCount).toBe(1);
    });
  });

  describe('getArticlesPaginated with category filtering', () => {
    it('should return all articles when no category filter is applied', async () => {
      const result = await getArticlesPaginated(1, 6);
      
      expect(result.totalArticles).toBe(10); // Total articles in mock data
      expect(result.articles).toHaveLength(6); // First page
      expect(result.filteredByCategory).toBeUndefined();
    });

    it('should filter articles by category slug', async () => {
      const result = await getArticlesPaginated(1, 6, 'developpement');
      
      expect(result.totalArticles).toBe(5); // Only Development articles
      expect(result.filteredByCategory).toBe('developpement');
      expect(result.articles.every(article => article.category === 'Développement')).toBe(true);
    });

    it('should filter articles by architecture category', async () => {
      const result = await getArticlesPaginated(1, 6, 'architecture');
      
      expect(result.totalArticles).toBe(1); // Only 1 Architecture article
      expect(result.filteredByCategory).toBe('architecture');
      expect(result.articles[0].category).toBe('Architecture');
    });

    it('should return empty results for non-existent category', async () => {
      const result = await getArticlesPaginated(1, 6, 'inexistante');
      
      expect(result.totalArticles).toBe(0);
      expect(result.articles).toHaveLength(0);
      expect(result.filteredByCategory).toBe('inexistante');
    });

    it('should handle pagination with category filter', async () => {
      // Get all Development articles (5 total)
      const page1 = await getArticlesPaginated(1, 3, 'developpement');
      expect(page1.totalArticles).toBe(5);
      expect(page1.articles).toHaveLength(3);
      expect(page1.currentPage).toBe(1);
      expect(page1.totalPages).toBe(2);

      const page2 = await getArticlesPaginated(2, 3, 'developpement');
      expect(page2.totalArticles).toBe(5);
      expect(page2.articles).toHaveLength(2); // Remaining 2 articles
      expect(page2.currentPage).toBe(2);
      expect(page2.totalPages).toBe(2);
    });

    it('should maintain correct sorting when filtering', async () => {
      const result = await getArticlesPaginated(1, 10, 'developpement');
      
      // Articles should be sorted by publication date (newest first)
      const dates = result.articles.map(article => new Date(article.publishedAt).getTime());
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
      }
    });
  });

  describe('getArticlesByCategory', () => {
    it('should return articles for valid category slug', async () => {
      const articles = await getArticlesByCategory('developpement');
      
      expect(articles).toHaveLength(5);
      expect(articles.every(article => article.category === 'Développement')).toBe(true);
    });

    it('should return empty array for invalid category slug', async () => {
      const articles = await getArticlesByCategory('inexistante');
      
      expect(articles).toHaveLength(0);
    });

    it('should return articles sorted by publication date', async () => {
      const articles = await getArticlesByCategory('developpement');
      
      const dates = articles.map(article => new Date(article.publishedAt).getTime());
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
      }
    });
  });

  describe('searchArticles', () => {
    it('should search articles by title', async () => {
      const articles = await searchArticles('Next.js');
      
      expect(articles.length).toBeGreaterThan(0);
      expect(articles.some(article => article.title.includes('Next.js'))).toBe(true);
    });

    it('should search articles by content', async () => {
      const articles = await searchArticles('microservices');
      
      expect(articles.length).toBeGreaterThan(0);
      expect(articles.some(article => 
        article.content.toLowerCase().includes('microservices')
      )).toBe(true);
    });

    it('should search articles by tags', async () => {
      const articles = await searchArticles('React');
      
      expect(articles.length).toBeGreaterThan(0);
      expect(articles.some(article => 
        article.tags.some(tag => tag.toLowerCase().includes('react'))
      )).toBe(true);
    });

    it('should return empty array for non-matching search', async () => {
      const articles = await searchArticles('xyz123nonexistent');
      
      expect(articles).toHaveLength(0);
    });

    it('should be case insensitive', async () => {
      const articlesLower = await searchArticles('next.js');
      const articlesUpper = await searchArticles('NEXT.JS');
      
      expect(articlesLower).toHaveLength(articlesUpper.length);
    });
  });

  describe('Category filtering edge cases', () => {
    it('should handle empty category slug', async () => {
      const result = await getArticlesPaginated(1, 6, '');
      
      expect(result.totalArticles).toBe(10);
      expect(result.filteredByCategory).toBe('');
    });

    it('should handle undefined category slug', async () => {
      const result = await getArticlesPaginated(1, 6, undefined);
      
      expect(result.totalArticles).toBe(10);
      expect(result.filteredByCategory).toBeUndefined();
    });

    it('should handle special characters in category slug', async () => {
      const result = await getArticlesPaginated(1, 6, 'développement');
      
      // Should not match 'developpement' (without accent)
      expect(result.totalArticles).toBe(0);
    });
  });

  describe('Performance and data integrity', () => {
    it('should complete filtering within reasonable time', async () => {
      const startTime = Date.now();
      await getArticlesPaginated(1, 6, 'developpement');
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeLessThan(200); // Should be fast with mock data
    });

    it('should maintain data consistency across multiple calls', async () => {
      const result1 = await getArticlesPaginated(1, 6, 'developpement');
      const result2 = await getArticlesPaginated(1, 6, 'developpement');
      
      expect(result1.totalArticles).toBe(result2.totalArticles);
      expect(result1.articles).toHaveLength(result2.articles.length);
    });

    it('should not modify original mock data', async () => {
      const originalArticles = await getArticlesPaginated(1, 10);
      await getArticlesPaginated(1, 6, 'developpement');
      const afterFilterArticles = await getArticlesPaginated(1, 10);
      
      expect(originalArticles.totalArticles).toBe(afterFilterArticles.totalArticles);
    });
  });
});
