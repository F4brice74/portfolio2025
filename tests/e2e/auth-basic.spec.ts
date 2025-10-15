import { test, expect } from '@playwright/test';

test.describe('Authentication Basic Tests', () => {
  test('Authentication button is present and clickable', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que le bouton de connexion est présent
    const signInButton = page.locator('button:has-text("Connexion"), [data-clerk="sign-in-button"]');
    
    await expect(signInButton).toBeVisible();
    
    // Vérifier que le bouton est cliquable
    await expect(signInButton).toBeEnabled();
  });

  test('Admin link is not visible when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que le lien Admin n'est PAS visible
    const adminLink = page.locator('a:has-text("Admin"), [href="/admin"]');
    await expect(adminLink).not.toBeVisible();
  });

  test('Admin routes redirect to home when not authenticated', async ({ page }) => {
    // Tester plusieurs routes admin
    const adminRoutes = ['/admin', '/admin/articles', '/admin/settings'];
    
    for (const route of adminRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL('/');
    }
  });

  test('Authentication button works on mobile', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Ouvrir le menu mobile
    const burgerButton = page.locator('button[aria-label="Open navigation"]').first();
    if (await burgerButton.isVisible()) {
      await burgerButton.click();
    }
    
    // Vérifier que le bouton de connexion est dans le menu mobile
    const signInButton = page.locator('button:has-text("Connexion"), [data-clerk="sign-in-button"]');
    
    await expect(signInButton).toBeVisible();
  });
});
