import { test, expect } from '@playwright/test';

test.describe('Authentication Performance', () => {
  test('Sign in modal loads quickly', async ({ page }) => {
    await page.goto('/');
    
    // 1. Mesurer le temps de chargement de la modal de connexion
    const startTime = Date.now();
    await page.getByText('Connexion').click();
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la modal se charge en moins de 2 secondes
    expect(loadTime).toBeLessThan(2000);
    
    // 2. Vérifier que tous les éléments sont visibles
    await expect(page.getByRole('textbox', { name: 'Email address' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  // Test d'inscription supprimé - l'inscription n'est plus disponible

  test('Authentication process completes quickly', async ({ page }) => {
    await page.goto('/');
    
    // 1. Mesurer le temps de connexion complet
    const startTime = Date.now();
    
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Attendre que l'utilisateur soit connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    const authTime = Date.now() - startTime;
    
    // Vérifier que l'authentification se termine en moins de 5 secondes
    expect(authTime).toBeLessThan(5000);
  });

  test('Admin page loads quickly after authentication', async ({ page }) => {
    // 1. Se connecter d'abord
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Mesurer le temps de chargement de la page admin
    const startTime = Date.now();
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    const adminLoadTime = Date.now() - startTime;
    
    // Vérifier que la page admin se charge en moins de 3 secondes
    expect(adminLoadTime).toBeLessThan(3000);
  });

  test('Navigation between admin pages is fast', async ({ page }) => {
    // 1. Se connecter et aller sur l'admin
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 2. Mesurer le temps de navigation vers Articles
    const startTime1 = Date.now();
    await page.getByText('Articles').click();
    await expect(page.getByText('Gestion des Articles')).toBeVisible();
    const articlesLoadTime = Date.now() - startTime1;
    
    // Vérifier que la navigation est rapide (moins de 1 seconde)
    expect(articlesLoadTime).toBeLessThan(1000);
    
    // 3. Mesurer le temps de navigation vers Paramètres
    const startTime2 = Date.now();
    await page.getByText('Paramètres').click();
    await expect(page.getByText('Paramètres')).toBeVisible();
    const settingsLoadTime = Date.now() - startTime2;
    
    // Vérifier que la navigation est rapide (moins de 1 seconde)
    expect(settingsLoadTime).toBeLessThan(1000);
  });

  test('Page load performance with authentication', async ({ page }) => {
    // 1. Mesurer le temps de chargement de la page d'accueil
    const startTime = Date.now();
    await page.goto('/');
    await expect(page.getByText('Connexion')).toBeVisible();
    const homeLoadTime = Date.now() - startTime;
    
    // Vérifier que la page d'accueil se charge rapidement
    expect(homeLoadTime).toBeLessThan(3000);
    
    // 2. Se connecter
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 3. Mesurer le temps de rechargement après connexion
    const reloadStartTime = Date.now();
    await page.reload();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    const reloadTime = Date.now() - reloadStartTime;
    
    // Vérifier que le rechargement est rapide
    expect(reloadTime).toBeLessThan(2000);
  });

  test('Mobile authentication performance', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // 1. Mesurer le temps de chargement de la modal mobile
    const startTime = Date.now();
    await page.getByText('Connexion').click();
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    const mobileLoadTime = Date.now() - startTime;
    
    // Vérifier que la modal mobile se charge rapidement
    expect(mobileLoadTime).toBeLessThan(2000);
    
    // 2. Mesurer le temps de connexion mobile
    const authStartTime = Date.now();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    const mobileAuthTime = Date.now() - authStartTime;
    
    // Vérifier que l'authentification mobile est rapide
    expect(mobileAuthTime).toBeLessThan(5000);
  });

  test('Concurrent authentication requests are handled efficiently', async ({ browser }) => {
    // 1. Créer plusieurs pages pour simuler des utilisateurs concurrents
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();
    const page3 = await browser.newPage();
    
    const pages = [page1, page2, page3];
    
    // 2. Mesurer le temps de connexion concurrent
    const startTime = Date.now();
    
    const authPromises = pages.map(async (page) => {
      await page.goto('/');
      await page.getByText('Connexion').click();
      await page.fill('[name="identifier"]', 'test@example.com');
      await page.fill('[name="password"]', 'TestPassword123!');
      await page.getByRole('button', { name: 'Sign in' }).click();
      await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    });
    
    await Promise.all(authPromises);
    const concurrentTime = Date.now() - startTime;
    
    // Vérifier que les connexions concurrentes sont gérées efficacement
    expect(concurrentTime).toBeLessThan(10000); // 10 secondes pour 3 connexions
    
    // 3. Nettoyer
    await Promise.all(pages.map(page => page.close()));
  });
});
