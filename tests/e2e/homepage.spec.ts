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
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Catalyseur de projets digitaux' })).toBeVisible();
    
    // Check professional photo
    await expect(page.getByAltText('Fabrice MIQUET-SAGE - Catalyseur de projets digitaux')).toBeVisible();
    
    // Check about section content
    await expect(page.getByText('Transformer vos défis métier en solutions digitales sur mesure')).toBeVisible();
    await expect(page.getByText('Mon ADN : La vision globale au service de vos projets')).toBeVisible();
    await expect(page.getByText('Mon engagement')).toBeVisible();
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

  test('should display services section', async ({ page }) => {
    // Check services section
    await expect(page.getByRole('heading', { name: 'Mes atouts différenciants' })).toBeVisible();
    
    // Check key differentiators
    await expect(page.getByText('🎯 Vision stratégique & opérationnelle')).toBeVisible();
    await expect(page.getByText('🤝 Facilitateur de collaboration')).toBeVisible();
    await expect(page.getByText('🎨 Approche design-driven & marketing-aware')).toBeVisible();
    await expect(page.getByText('⚡ Excellence technique au service du projet')).toBeVisible();
    
    // Check AI section
    await expect(page.getByText('🧠 Ma plus-value dans l\'ère de l\'IA')).toBeVisible();
  });

  test('should have working contact section', async ({ page }) => {
    // Check footer contact
    await expect(page.getByText('Prêt à collaborer sur votre prochain projet ?')).toBeVisible();
    
    // Check contact buttons
    await expect(page.getByRole('link', { name: 'mail' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
    
    // Check email link works
    const emailLink = page.getByRole('link', { name: 'mail' });
    await expect(emailLink).toHaveAttribute('href', /mailto:/);
  });

  test('should be fully responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Fabrice MIQUET-SAGE | Developpeur & Catalyseur de projets digitaux/);
    
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
