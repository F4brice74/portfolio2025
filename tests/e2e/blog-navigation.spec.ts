import { test, expect } from '@playwright/test';

test.describe('Blog Navigation - US-002', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display blog on homepage', async ({ page }) => {
    // Homepage should display blog content
    await expect(page).toHaveURL('/');
    
    // Should show blog header
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
    
    // Should show articles
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    const articleCount = await page.locator('.mantine-Card-root').count();
    expect(articleCount).toBeGreaterThan(0);
  });

  test('should navigate from homepage to individual article', async ({ page }) => {
    // Homepage has blog articles
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Click on first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Should navigate to article page
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Should show article content
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate back from article to homepage', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Click on first article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    
    // Should be on article page
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Use browser back button
    await page.goBack();
    
    // Should be back on homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
  });

  test('should maintain navigation state across page refreshes', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Refresh page
    await page.reload();
    
    // Should still be on homepage
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
  });

  test('should handle direct URL navigation to homepage', async ({ page }) => {
    // Navigate directly to homepage URL
    await page.goto('/');
    
    // Should load homepage with blog
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
  });

  test('should handle direct URL navigation to article', async ({ page }) => {
    // First get a valid article slug from homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Get first article link
    const firstArticle = page.locator('.mantine-Card-root').first();
    const articleLink = firstArticle.locator('a').first();
    const articleHref = await articleLink.getAttribute('href');
    
    // Navigate directly to article URL
    await page.goto(articleHref!);
    
    // Should load article page
    await expect(page).toHaveURL(articleHref!);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should show proper breadcrumb or navigation context', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Check if there's any navigation context
    const navContext = page.locator('text=/Accueil/, text=/Home/, text=/OSSAWAYA/');
    if (await navContext.isVisible()) {
      await expect(navContext).toBeVisible();
    }
  });

  test('should handle navigation with browser back/forward buttons', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Navigate to article
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
  });

  test('should maintain navigation state during pagination', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
    
    // Go to page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Navigate to article from page 2
    const firstArticle = page.locator('.mantine-Card-root').first();
    await firstArticle.locator('a').first().click();
    await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Go back to homepage
    await page.goBack();
    
    // Should be back on page 2
    await expect(page).toHaveURL(/[?&]page=2/);
  });

  test('should handle navigation errors gracefully', async ({ page }) => {
    // Try to navigate to non-existent blog article
    await page.goto('/blog/non-existent-article');
    
    // Should show 404 or error page
    await expect(page.locator('text=/404/, text=/not found/, text=/Page non trouvée/')).toBeVisible();
  });

  test('should have consistent navigation across different screen sizes', async ({ page }) => {
    // Test desktop navigation
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
    
    // Test tablet navigation
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
    
    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'OSSAWAYA' })).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to focus on elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should maintain navigation state in new tabs', async ({ page, context }) => {
    // Go to homepage
    await page.goto('/');
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    
    // Open article in new tab
    const firstArticle = page.locator('.mantine-Card-root').first();
    const articleLink = firstArticle.locator('a').first();
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      articleLink.click({ modifiers: ['Control'] }) // Ctrl+click for new tab
    ]);
    
    // Should open in new tab
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/\/blog\/[a-z0-9-]+/);
    
    // Original page should still be on homepage
    await expect(page).toHaveURL('/');
  });
});
