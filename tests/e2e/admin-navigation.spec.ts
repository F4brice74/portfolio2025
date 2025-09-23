import { test, expect } from '@playwright/test';

test.describe('Admin Navigation Responsive', () => {
  test('Desktop navigation works correctly', async ({ page }) => {
    // Configuration desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 1. Vérifier la navigation desktop dans la navbar
    await expect(page.getByText('Admin')).toBeVisible();
    await page.getByText('Admin').click();
    
    // 2. Vérifier la navigation admin desktop
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Articles')).toBeVisible();
    await expect(page.getByText('Paramètres')).toBeVisible();
    
    // 3. Tester la navigation entre les sections
    await page.getByText('Articles').click();
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
    
    await page.getByText('Paramètres').click();
    await expect(page.getByText('Profil')).toBeVisible();
    
    await page.getByText('Dashboard').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
  });

  test('Mobile navigation works correctly', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 1. Ouvrir le menu mobile
    await page.getByRole('button', { name: 'Open navigation' }).click();
    
    // 2. Vérifier que le lien Admin est visible dans le menu mobile
    await expect(page.getByText('Admin')).toBeVisible();
    
    // 3. Cliquer sur Admin
    await page.getByText('Admin').click();
    
    // 4. Vérifier que la page admin se charge
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 5. Tester la navigation mobile dans l'admin
    // Le menu admin devrait être visible dans le header
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Articles')).toBeVisible();
    await expect(page.getByText('Paramètres')).toBeVisible();
  });

  test('Navigation state persists across page reloads', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // Aller sur l'admin
    await page.getByText('Admin').click();
    await page.getByText('Articles').click();
    await expect(page).toHaveURL('/admin/articles');
    
    // Recharger la page
    await page.reload();
    
    // Vérifier que l'utilisateur est toujours connecté et sur la bonne page
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page).toHaveURL('/admin/articles');
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
  });

  test('Admin navigation adapts to different screen sizes', async ({ page }) => {
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // Test tablet (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // Test mobile (375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // Test large desktop (1920px)
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    await expect(page.getByText('Articles')).toBeVisible();
    await expect(page.getByText('Paramètres')).toBeVisible();
  });
});
