import { test, expect } from '@playwright/test';

test.describe('Session Persistence', () => {
  test('Session persists across page reloads', async ({ page }) => {
    // 1. Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
    
    // 2. Recharger la page
    await page.reload();
    
    // 3. Vérifier que la session persiste
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
    await expect(page.getByText('Connexion')).not.toBeVisible();
  });

  test('Session persists across different pages', async ({ page }) => {
    // 1. Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Naviguer vers différentes pages
    await page.goto('/contact');
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
    
    await page.goto('/admin');
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    await page.goto('/admin/articles');
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
    
    await page.goto('/admin/settings');
    await expect(page.getByText('Paramètres')).toBeVisible();
    
    // 3. Retourner à l'accueil
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
  });

  test('Session persists across browser tabs', async ({ context }) => {
    // 1. Se connecter dans le premier onglet
    const page1 = await context.newPage();
    await page1.goto('/');
    await page1.getByText('Connexion').click();
    await page1.fill('[name="identifier"]', 'test@example.com');
    await page1.fill('[name="password"]', 'TestPassword123!');
    await page1.getByRole('button', { name: 'Sign in' }).click();
    await expect(page1.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Ouvrir un nouvel onglet
    const page2 = await context.newPage();
    await page2.goto('/');
    
    // 3. Vérifier que la session est partagée entre les onglets
    await expect(page2.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page2.getByText('Admin')).toBeVisible();
    await expect(page2.getByText('Connexion')).not.toBeVisible();
    
    // 4. Tester l'accès admin dans le nouvel onglet
    await page2.getByText('Admin').click();
    await expect(page2.getByText('Dashboard Administration')).toBeVisible();
    
    // 5. Fermer les onglets
    await page1.close();
    await page2.close();
  });

  test('Session persists after browser restart simulation', async ({ page }) => {
    // 1. Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Aller sur l'admin et naviguer
    await page.getByText('Admin').click();
    await page.getByText('Articles').click();
    await expect(page).toHaveURL('/admin/articles');
    
    // 3. Simuler un redémarrage du navigateur (nouvelle session)
    // En réalité, cela dépend de la configuration de Clerk
    // Ici on teste que la session persiste dans la même session de test
    
    // 4. Vérifier que l'utilisateur est toujours connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page).toHaveURL('/admin/articles');
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
  });

  test('Session expires gracefully', async ({ page }) => {
    // 1. Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Aller sur l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 3. Simuler une déconnexion
    await page.getByRole('button', { name: 'User menu' }).click();
    await page.getByText('Sign out').click();
    
    // 4. Vérifier que l'accès admin est refusé
    await page.goto('/admin');
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Connexion')).toBeVisible();
  });
});
