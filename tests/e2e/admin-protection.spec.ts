import { test, expect } from '@playwright/test';

test.describe('Admin Routes Protection', () => {
  test('Redirect unauthenticated users from admin routes', async ({ page }) => {
    // 1. Essayer d'accéder à /admin sans être connecté
    await page.goto('/admin');
    
    // Vérifier la redirection vers l'accueil
    await expect(page).toHaveURL('/');
    
    // 2. Essayer d'accéder à /admin/articles
    await page.goto('/admin/articles');
    await expect(page).toHaveURL('/');
    
    // 3. Essayer d'accéder à /admin/settings
    await page.goto('/admin/settings');
    await expect(page).toHaveURL('/');
  });

  test('Allow authenticated users to access admin routes', async ({ page }) => {
    // 1. Se connecter d'abord
    await page.goto('/');
    await page.getByText('Connexion').click();
    
    // Simuler une connexion (vous devrez adapter selon votre setup de test)
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Attendre que l'utilisateur soit connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Tester l'accès au dashboard admin
    await page.goto('/admin');
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    await expect(page.getByText('Total Articles')).toBeVisible();
    
    // 3. Tester l'accès à la page des articles
    await page.getByText('Articles').click();
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
    await expect(page.getByText('Nouvel Article')).toBeVisible();
    
    // 4. Tester l'accès aux paramètres
    await page.getByText('Paramètres').click();
    await expect(page.getByText('Paramètres')).toBeVisible();
    await expect(page.getByText('Profil')).toBeVisible();
  });

  test('Admin layout navigation works correctly', async ({ page }) => {
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // Aller sur l'admin
    await page.goto('/admin');
    
    // 1. Tester la navigation entre les sections
    await page.getByText('Articles').click();
    await expect(page).toHaveURL('/admin/articles');
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
    
    await page.getByText('Paramètres').click();
    await expect(page).toHaveURL('/admin/settings');
    await expect(page.getByText('Profil')).toBeVisible();
    
    await page.getByText('Dashboard').click();
    await expect(page).toHaveURL('/admin');
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 2. Tester le bouton "Retour au site"
    await page.getByText('Retour au site').click();
    await expect(page).toHaveURL('/');
  });
});
