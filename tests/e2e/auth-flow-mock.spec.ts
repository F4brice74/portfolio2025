import { test, expect } from '@playwright/test';

test.describe('Authentication Flow - Mock Mode', () => {
  test('Page loads with authentication button', async ({ page }) => {
    // 1. Naviguer vers la page d'accueil
    await page.goto('/');
    
    // 2. Vérifier que le bouton de connexion est visible
    await expect(page.getByText('Connexion')).toBeVisible();
    
    // 3. Vérifier que le lien Admin n'est PAS visible (utilisateur non connecté)
    await expect(page.getByText('Admin')).not.toBeVisible();
  });

  test('Admin routes redirect unauthenticated users', async ({ page }) => {
    // 1. Essayer d'accéder à /admin sans être connecté
    await page.goto('/admin');
    
    // 2. Vérifier la redirection vers l'accueil
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Connexion')).toBeVisible();
  });

  test('Authentication button is clickable', async ({ page }) => {
    await page.goto('/');
    
    // 1. Vérifier que le bouton est cliquable
    const signInButton = page.getByText('Connexion');
    
    await expect(signInButton).toBeVisible();
    
    // 2. Tester le clic (sans attendre la modal Clerk)
    await signInButton.click();
    // Note: En mode mock, on ne teste pas l'ouverture de la modal Clerk
    
    // 3. Vérifier que la page reste sur l'accueil
    await expect(page).toHaveURL('/');
  });

  test('Mobile navigation works', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // 1. Vérifier que le bouton est visible sur mobile
    await expect(page.getByText('Connexion')).toBeVisible();
    
    // 2. Ouvrir le menu mobile
    await page.getByRole('button', { name: 'Open navigation' }).click();
    
    // 3. Vérifier que le bouton de connexion est dans le menu mobile
    await expect(page.getByText('Connexion')).toBeVisible();
  });
});
