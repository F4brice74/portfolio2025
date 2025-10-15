import { test, expect } from '@playwright/test';

test.describe('Authentication Flow - Real Clerk', () => {
  test.skip('Complete authentication flow with real Clerk', async ({ page }) => {
    // Ce test nécessite des vraies clés Clerk configurées
    // Il sera activé quand vous aurez configuré vos clés
    
    await page.goto('/');
    
    // 1. Vérifier que le bouton de connexion est visible
    await expect(page.getByText('Connexion')).toBeVisible();
    
    // 2. Tester la connexion (nécessite des vraies clés)
    await page.getByText('Connexion').click();
    
    // Attendre que la modal de connexion s'ouvre
    await expect(page.locator('[data-clerk-modal]')).toBeVisible();
    
    // Remplir le formulaire de connexion
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    
    // Cliquer sur le bouton de connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Attendre la redirection et vérifier que l'utilisateur est connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 3. Vérifier que le lien Admin est visible
    await expect(page.getByText('Admin')).toBeVisible();
    
    // 4. Tester l'accès à l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
  });
});
