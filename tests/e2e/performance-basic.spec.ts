import { test, expect } from '@playwright/test';

test.describe('Performance Basic Tests', () => {
  test('Homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Attendre que la page soit complètement chargée
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page se charge en moins de 5 secondes
    expect(loadTime).toBeLessThan(5000);
  });

  test('Navigation between pages is fast', async ({ page }) => {
    await page.goto('/');
    
    // Mesurer le temps de navigation vers contact
    const startTime = Date.now();
    await page.getByText('Contact').click();
    await expect(page).toHaveURL('/contact');
    const navigationTime = Date.now() - startTime;
    
    // Vérifier que la navigation est rapide (moins de 2 secondes)
    expect(navigationTime).toBeLessThan(2000);
  });

  test('Mobile viewport loads correctly', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/');
    
    // Attendre que le contenu soit visible
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page mobile se charge rapidement
    expect(loadTime).toBeLessThan(3000);
  });
});
