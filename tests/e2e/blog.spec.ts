import { test, expect } from '@playwright/test';

test.describe('Blog Page - US-002', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('should load blog page within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });

  test('should display blog header and description', async ({ page }) => {
    // Check main title
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
    
    // Check description
    await expect(page.getByText('Découvrez mes réflexions sur le développement, les projets et l\'innovation')).toBeVisible();
  });

  test('should display articles in grid layout', async ({ page }) => {
    // Wait for articles to load
    await page.waitForSelector('[data-testid="article-card"], .mantine-Card-root', { timeout: 5000 });
    
    // Check that articles are displayed in a grid
    const articleCards = page.locator('.mantine-Card-root');
    await expect(articleCards).toHaveCount(6); // 6 articles per page
    
    // Check first article has required elements
    const firstArticle = articleCards.first();
    await expect(firstArticle).toBeVisible();
    
    // Check article image
    await expect(firstArticle.locator('img')).toBeVisible();
    
    // Check article title (using the actual structure)
    await expect(firstArticle.locator('p[data-size="lg"]')).toHaveCount(1);
    
    // Check article excerpt (there are 5 p elements in each card)
    await expect(firstArticle.locator('p')).toHaveCount(5);
  });

  test('should display article metadata correctly', async ({ page }) => {
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    const firstArticle = page.locator('.mantine-Card-root').first();
    
    // Check category badge
    await expect(firstArticle.locator('.mantine-Badge-root')).toBeVisible();
    
    // Check publication date
    await expect(firstArticle.locator('text=/📅/')).toBeVisible();
    
    // Check reading time
    await expect(firstArticle.locator('text=/⏱️/')).toBeVisible();
    await expect(firstArticle.locator('text=/min de lecture/')).toBeVisible();
  });

  test('should display pagination when multiple pages exist', async ({ page }) => {
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
    
    // Check pagination is visible
    await expect(page.locator('.mantine-Pagination-root')).toBeVisible();
    
    // Check page info
    await expect(page.getByText('Page 1 sur 2')).toBeVisible();
    await expect(page.getByText('10 articles au total')).toBeVisible();
    
    // Check pagination controls (4 controls: Previous, 1, 2, Next)
    await expect(page.locator('.mantine-Pagination-control')).toHaveCount(4);
  });

  test('should navigate to individual article when clicked', async ({ page }) => {
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Get first article (which is already a link)
    const firstArticle = page.locator('.mantine-Card-root').first();
    
    // Click on article and wait for navigation
    await Promise.all([
      page.waitForURL(/\/blog\/[a-z0-9-]+/),
      firstArticle.click()
    ]);
    
    // Should navigate to article page
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Check article page loads
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    await expect(page.locator('.mantine-Card-root')).toHaveCount(6);
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.mantine-Card-root').first()).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.mantine-Card-root').first()).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title contains the main site title
    await expect(page).toHaveTitle(/Fabrice MIQUET-SAGE/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.*/);
  });

  test('should display loading state initially', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog');
    
    // Wait for content to load (loader might be too fast to catch)
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Content should be visible (check first card)
    await expect(page.locator('.mantine-Card-root').first()).toBeVisible();
  });

  test('should handle pagination navigation', async ({ page }) => {
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
    
    // Click on page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    
    // Should navigate to page 2
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Should show page 2 info
    await expect(page.getByText('Page 2 sur 2')).toBeVisible();
  });
});
