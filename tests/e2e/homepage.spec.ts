import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage - US-001', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });

  test('should display personal/professional information clearly', async ({ page }) => {
    // Check hero section
    await expect(page.getByRole('heading', { name: 'OSSAWAYAS' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Développement web mais pas que...' })).toBeVisible();
    
    // Check about section content
    await expect(page.getByText(/Partir d'une feuille blanche/)).toBeVisible();
    await expect(page.getByText(/identifier les vrais enjeux/)).toBeVisible();
    await expect(page.getByText(/15 ans d'expérience/)).toBeVisible();
    await expect(page.getByText(/curiosité insatiable/)).toBeVisible();
  });

//   test('should display professional timeline', async ({ page }) => {
//     // Check timeline section (it should be visible on the page)
//     await expect(page.getByRole('heading', { name: 'Parcours Professionnel' })).toBeVisible();
    
//     // Check timeline items
//     await expect(page.getByText('2006')).toBeVisible();
//     await expect(page.getByText('CEO - réalisateur')).toBeVisible();
//     await expect(page.getByText('MT FILMS')).toBeVisible();
    
//     await expect(page.getByText('2021')).toBeVisible();
//     await expect(page.getByText('Software developer')).toBeVisible();
//     await expect(page.getByText('AD SOFTWARE')).toBeVisible();
//   });

  test('should display blog articles section', async ({ page }) => {
    // Check that articles are displayed
    await page.waitForSelector('.mantine-Card-root', { timeout: 5000 });
    const articleCount = await page.locator('.mantine-Card-root').count();
    expect(articleCount).toBeGreaterThan(0);
    
    // Check article count display
    await expect(page.getByText(/article.*au total/)).toBeVisible();
    
    // Check pagination if multiple pages exist
    const paginationExists = await page.getByText(/Page \d+ sur \d+/).isVisible().catch(() => false);
    if (paginationExists) {
      await expect(page.getByText(/Page \d+ sur \d+/)).toBeVisible();
    }
  });

  test('should have working navigation', async ({ page }) => {
    // Check navigation menu
    await expect(page.getByText('Accueil')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
  });

  test('should be fully responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'OSSAWAYAS' })).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'OSSAWAYAS' })).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'OSSAWAYAS' })).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title exists
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.*/);
  });

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
