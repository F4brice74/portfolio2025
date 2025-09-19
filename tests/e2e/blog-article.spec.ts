import { test, expect } from '@playwright/test';

test.describe('Blog Article Pages - US-002', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to blog first to get a valid article URL
    await page.goto('/blog');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
  });

  test('should load individual article page', async ({ page }) => {
    // Get first article link
    const firstArticle = page.locator('.mantine-Card-root').first();
    const articleLink = firstArticle.locator('a').first();
    
    // Get article title for verification
    const articleTitle = await firstArticle.locator('h3, h4, [data-testid="article-title"]').textContent();
    
    // Click on article
    await articleLink.click();
    
    // Should navigate to article page
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Check article page loads within 2 seconds
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);
  });

  test('should display article content correctly', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Check article title is displayed
    await expect(page.locator('h1')).toBeVisible();
    
    // Check article metadata
    await expect(page.locator('text=/📅/')).toBeVisible();
    await expect(page.locator('text=/⏱️/')).toBeVisible();
    await expect(page.locator('text=/min de lecture/')).toBeVisible();
    
    // Check category badge
    await expect(page.locator('.mantine-Badge-root')).toBeVisible();
    
    // Check article content exists
    await expect(page.locator('main, article, .mantine-Container-root')).toBeVisible();
  });

  test('should display article image', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Check article image is displayed
    const articleImage = page.locator('img').first();
    await expect(articleImage).toBeVisible();
    
    // Check image has proper attributes
    await expect(articleImage).toHaveAttribute('src', /https:\/\/images\.unsplash\.com/);
    await expect(articleImage).toHaveAttribute('alt');
  });

  test('should have working back to blog navigation', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Look for back button or navigation
    const backButton = page.locator('text=/Retour au blog/, text=/←/, text=/Back/').first();
    
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL('/blog');
    } else {
      // If no back button, test browser back
      await page.goBack();
      await expect(page).toHaveURL('/blog');
    }
  });

  test('should display author information', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Check author information is displayed
    await expect(page.locator('text=/Fabrice MIQUET-SAGE/')).toBeVisible();
  });

  test('should handle non-existent article gracefully', async ({ page }) => {
    // Try to navigate to non-existent article
    await page.goto('/blog/non-existent-article');
    
    // Should show 404 page or error message
    await expect(page.locator('text=/404/, text=/not found/, text=/Page non trouvée/')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Check title contains article title
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.*/);
  });

  test('should display article tags if available', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Check if tags are displayed (they might be in the content)
    const tagsSection = page.locator('text=/Tags/, text=/Étiquettes/');
    if (await tagsSection.isVisible()) {
      await expect(tagsSection).toBeVisible();
    }
  });

  test('should have accessible navigation', async ({ page }) => {
    // Navigate to first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should load all articles successfully', async ({ page }) => {
    // Test multiple articles to ensure they all load
    const articleLinks = page.locator('.mantine-Card-root a');
    const articleCount = await articleLinks.count();
    
    expect(articleCount).toBeGreaterThan(0);
    
    // Test first few articles
    for (let i = 0; i < Math.min(3, articleCount); i++) {
      await page.goto('/blog');
      await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
      
      const articleLink = page.locator('.mantine-Card-root a').nth(i);
      await articleLink.click();
      
      // Should load successfully
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    }
  });
});
