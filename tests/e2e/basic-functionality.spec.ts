import { test, expect } from '@playwright/test';

test.describe('Basic Functionality Tests', () => {
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que la page se charge
    await expect(page).toHaveURL('/');
    
    // Vérifier que le titre principal est présent (plus spécifique)
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    // Vérifier que la page contient du contenu
    await expect(page.getByText('Développeur Fullstack - Catalyseur de projets')).toBeVisible();
  });

  test('Navigation works on desktop', async ({ page }) => {
    // Configuration desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/');
    
    // Vérifier que les liens de navigation sont présents
    await expect(page.getByText('Accueil')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
    
    // Vérifier que le menu burger n'est PAS visible sur desktop
    const burgerButton = page.locator('button[aria-label="Open navigation"]');
    await expect(burgerButton).not.toBeVisible();
  });


  test('Contact page loads correctly', async ({ page }) => {
    await page.goto('/contact');
    
    // Vérifier que la page contact se charge
    await expect(page).toHaveURL('/contact');
    
    // Vérifier que le titre est présent
    await expect(page.getByRole('heading', { name: 'Fabrice MIQUET-SAGE' })).toBeVisible();
    
    // Vérifier que le sous-titre est présent
    await expect(page.getByText('Développeur Fullstack - Catalyseur de projets digitaux')).toBeVisible();
    
    // Vérifier que le contenu principal est présent
    await expect(page.getByText('Transformer vos défis métier en solutions digitales sur mesure')).toBeVisible();
  });
});
