import { test, expect } from '@playwright/test';

test.describe('Authentication Flow - Real Clerk', () => {
  test.skip('Complete authentication flow with real Clerk', async ({ page }) => {
    // Ce test nécessite des vraies clés Clerk configurées
    // Il sera activé quand vous aurez configuré vos clés
    
    await page.goto('/');
    
    // 1. Vérifier que les boutons de connexion sont visibles
    await expect(page.getByText('Connexion')).toBeVisible();
    await expect(page.getByText('Inscription')).toBeVisible();
    
    // 2. Tester l'inscription (nécessite des vraies clés)
    await page.getByText('Inscription').click();
    
    // Attendre que la modal d'inscription s'ouvre
    await expect(page.locator('[data-clerk-modal]')).toBeVisible();
    
    // Remplir le formulaire d'inscription
    await page.fill('[name="emailAddress"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.fill('[name="firstName"]', 'Test');
    await page.fill('[name="lastName"]', 'User');
    
    // Cliquer sur le bouton d'inscription
    await page.getByRole('button', { name: 'Create account' }).click();
    
    // Attendre la redirection et vérifier que l'utilisateur est connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 3. Vérifier que le lien Admin est visible
    await expect(page.getByText('Admin')).toBeVisible();
    
    // 4. Tester l'accès à l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
  });
});
