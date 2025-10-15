import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('Complete authentication flow - sign in, sign out', async ({ page }) => {
    // 1. Naviguer vers la page d'accueil
    await page.goto('/');
    
    // 2. Vérifier que le bouton de connexion est visible
    await expect(page.getByText('Connexion')).toBeVisible();
    
    // 3. Tester la connexion
    await page.getByText('Connexion').click();
    
    // Attendre que la modal de connexion s'ouvre
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    
    // Remplir le formulaire de connexion
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    
    // Cliquer sur le bouton de connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Attendre la redirection et vérifier que l'utilisateur est connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 4. Vérifier que le lien Admin est visible pour l'utilisateur connecté
    await expect(page.getByText('Admin')).toBeVisible();
    
    // 5. Tester l'accès à l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 6. Retourner à l'accueil
    await page.getByText('Retour au site').click();
    
    // 7. Tester la déconnexion
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByText('Sign out').click();
    
    // 8. Vérifier que l'utilisateur est déconnecté
    await expect(page.getByText('Connexion')).toBeVisible();
    await expect(page.getByText('Admin')).not.toBeVisible();
  });

  test('Sign in with existing account', async ({ page }) => {
    await page.goto('/');
    
    // Cliquer sur connexion
    await page.getByText('Connexion').click();
    
    // Attendre que la modal de connexion s'ouvre
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    
    // Remplir le formulaire de connexion
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    
    // Cliquer sur le bouton de connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
  });
});
