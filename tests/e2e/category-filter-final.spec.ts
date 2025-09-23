import { test, expect } from '@playwright/test';

test.describe('Category Filter - US-003 (Final)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display category filter component', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check that category filter is visible
    await expect(page.getByText('Filtrer par catégorie :')).toBeVisible();
    
    // Check that the select dropdown is present
    const categorySelect = page.locator('.mantine-Select-input');
    await expect(categorySelect).toBeVisible();
  });

  test('should filter articles by category via URL - Development', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Navigate directly to filtered URL
    await page.goto('/?category=developpement');
    await page.waitForLoadState('networkidle');
    
    // Check URL has category parameter
    await expect(page).toHaveURL(/[?&]category=developpement/);
    
    // Check that the filter indicator shows active filtering
    await expect(page.getByText('Filtrage actif')).toBeVisible();
    
    // Check that the article counter shows filtered results
    await expect(page.getByText(/dans la catégorie "Développement"/)).toBeVisible();
    
    // Check that all visible articles belong to the "Développement" category
    const articleCards = page.locator('.mantine-Card-root');
    const cardCount = await articleCards.count();
    
    for (let i = 0; i < cardCount; i++) {
      const card = articleCards.nth(i);
      // Check that the category badge shows "Développement"
      await expect(card.locator('.mantine-Badge-root')).toContainText('Développement');
    }
  });

  test('should filter articles by category via URL - Architecture', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Navigate to Architecture category (should have 1 article)
    await page.goto('/?category=architecture');
    await page.waitForLoadState('networkidle');
    
    // Check URL
    await expect(page).toHaveURL(/[?&]category=architecture/);
    
    // Check article count
    const articleCount = await page.locator('.mantine-Card-root').count();
    expect(articleCount).toBe(1);
    
    // Check counter text
    await expect(page.getByText('1 article dans la catégorie "Architecture"')).toBeVisible();
  });

  test('should filter articles by category via URL - Performance', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Navigate to Performance category
    await page.goto('/?category=performance');
    await page.waitForLoadState('networkidle');
    
    // Check URL
    await expect(page).toHaveURL(/[?&]category=performance/);
    
    // Check that filter indicator shows active filtering
    await expect(page.getByText('Filtrage actif')).toBeVisible();
    
    // Check that the article counter shows filtered results
    await expect(page.getByText(/dans la catégorie "Performance"/)).toBeVisible();
  });

  test('should maintain filter state when navigating back', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Navigate to filtered view
    await page.goto('/?category=performance');
    await page.waitForLoadState('networkidle');
    
    // Verify filter is applied
    await expect(page).toHaveURL(/[?&]category=performance/);
    
    // Navigate to an article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.click();
    
    // Should be on article page
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Navigate back to blog
    await page.goBack();
    
    // Filter should still be applied
    await expect(page).toHaveURL(/[?&]category=performance/);
    await expect(page.getByText('Filtrage actif')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Check that filter is still visible and functional
    await expect(page.getByText('Filtrer par catégorie :')).toBeVisible();
    
    // Test filter functionality on mobile via URL
    await page.goto('/?category=developpement');
    await page.waitForLoadState('networkidle');
    
    // Should work the same way
    await expect(page).toHaveURL(/[?&]category=developpement/);
    await expect(page.getByText('Filtrage actif')).toBeVisible();
  });

  test('should handle multiple category filters', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Test different categories
    const categories = [
      { slug: 'developpement', name: 'Développement' },
      { slug: 'architecture', name: 'Architecture' },
      { slug: 'performance', name: 'Performance' },
      { slug: 'securite', name: 'Sécurité' }
    ];
    
    for (const category of categories) {
      await page.goto(`/?category=${category.slug}`);
      await page.waitForLoadState('networkidle');
      
      // Check URL
      await expect(page).toHaveURL(new RegExp(`[?&]category=${category.slug}`));
      
      // Check filter indicator
      await expect(page.getByText('Filtrage actif')).toBeVisible();
      
      // Check counter text
      await expect(page.getByText(new RegExp(`dans la catégorie "${category.name}"`))).toBeVisible();
    }
  });

  test('should show correct article counts for each category', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Test known article counts
    const testCases = [
      { category: 'developpement', expectedMin: 1, expectedMax: 5 },
      { category: 'architecture', expectedCount: 1 },
      { category: 'performance', expectedMin: 1, expectedMax: 2 },
      { category: 'securite', expectedCount: 1 }
    ];
    
    for (const testCase of testCases) {
      await page.goto(`/?category=${testCase.category}`);
      await page.waitForLoadState('networkidle');
      
      const articleCount = await page.locator('.mantine-Card-root').count();
      
      if (testCase.expectedCount) {
        expect(articleCount).toBe(testCase.expectedCount);
      } else {
        expect(articleCount).toBeGreaterThanOrEqual(testCase.expectedMin!);
        expect(articleCount).toBeLessThanOrEqual(testCase.expectedMax!);
      }
    }
  });
});
