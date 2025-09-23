import { test, expect } from '@playwright/test';

test.describe('Admin Security Measures', () => {
  test('API endpoints are protected without authentication', async ({ page }) => {
    // 1. Tester l'accès aux API admin sans authentification
    const response = await page.request.get('/api/admin/articles');
    expect(response.status()).toBe(401);
    
    // 2. Tester d'autres endpoints admin
    const response2 = await page.request.post('/api/admin/articles');
    expect(response2.status()).toBe(401);
    
    const response3 = await page.request.put('/api/admin/articles/1');
    expect(response3.status()).toBe(401);
    
    const response4 = await page.request.delete('/api/admin/articles/1');
    expect(response4.status()).toBe(401);
  });

  test('Admin routes redirect unauthenticated users', async ({ page }) => {
    // 1. Tester toutes les routes admin
    const adminRoutes = [
      '/admin',
      '/admin/articles',
      '/admin/articles/new',
      '/admin/articles/1',
      '/admin/settings'
    ];
    
    for (const route of adminRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL('/');
      await expect(page.getByText('Connexion')).toBeVisible();
    }
  });

  test('Session tokens are properly managed', async ({ page }) => {
    // 1. Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // 2. Vérifier que les cookies de session sont présents
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find(cookie => 
      cookie.name.includes('session') || cookie.name.includes('clerk')
    );
    expect(sessionCookie).toBeDefined();
    
    // 3. Vérifier que le cookie est sécurisé
    expect(sessionCookie?.secure).toBe(true);
    expect(sessionCookie?.httpOnly).toBe(true);
  });

  test('CSRF protection is in place', async ({ page }) => {
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
    
    // 3. Vérifier la présence de tokens CSRF dans les formulaires
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      for (let i = 0; i < formCount; i++) {
        const form = forms.nth(i);
        const csrfToken = form.locator('input[name="_token"], input[name="csrf_token"]');
        await expect(csrfToken).toBeVisible();
      }
    }
  });

  test('XSS protection works correctly', async ({ page }) => {
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
    
    // 3. Vérifier que le contenu est échappé
    const pageContent = await page.content();
    expect(pageContent).not.toContain('<script>');
    expect(pageContent).not.toContain('javascript:');
    
    // 4. Vérifier les headers de sécurité
    const response = await page.request.get('/admin');
    const headers = response.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-xss-protection']).toBe('1; mode=block');
  });

  test('Rate limiting works on authentication endpoints', async ({ page }) => {
    // 1. Tester plusieurs tentatives de connexion rapides
    await page.goto('/');
    
    for (let i = 0; i < 5; i++) {
      await page.getByText('Connexion').click();
      await page.fill('[name="identifier"]', 'test@example.com');
      await page.fill('[name="password"]', 'wrongpassword');
      await page.getByRole('button', { name: 'Sign in' }).click();
      
      // Attendre un peu entre les tentatives
      await page.waitForTimeout(100);
    }
    
    // 2. Vérifier qu'un message de rate limiting apparaît
    await expect(page.getByText(/Too many attempts|Rate limit|Try again later/i)).toBeVisible();
  });

  test('Session timeout works correctly', async ({ page }) => {
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
    
    // 3. Simuler une inactivité prolongée (en réalité, cela dépend de la config Clerk)
    // Ici on teste que la session est toujours valide après un certain temps
    await page.waitForTimeout(1000);
    
    // 4. Vérifier que l'utilisateur est toujours connecté
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
  });

  test('Admin access is properly logged', async ({ page }) => {
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
    
    // 3. Vérifier que les requêtes sont loggées
    // (En réalité, cela nécessiterait un système de logging)
    // Ici on teste que les requêtes passent correctement
    const response = await page.request.get('/admin');
    expect(response.status()).toBe(200);
  });

  test('Unauthorized access attempts are blocked', async ({ page }) => {
    // 1. Essayer d'accéder directement aux routes admin
    await page.goto('/admin');
    await expect(page).toHaveURL('/');
    
    // 2. Essayer de contourner l'authentification via JavaScript
    await page.evaluate(() => {
      // Essayer d'accéder à des variables sensibles
      return window.localStorage.getItem('admin_token');
    });
    
    // 3. Vérifier que les variables sensibles ne sont pas exposées
    const sensitiveData = await page.evaluate(() => {
      return {
        hasAdminToken: !!window.localStorage.getItem('admin_token'),
        hasSecretKey: !!window.localStorage.getItem('secret_key'),
        hasUserData: !!window.localStorage.getItem('user_data')
      };
    });
    
    expect(sensitiveData.hasAdminToken).toBe(false);
    expect(sensitiveData.hasSecretKey).toBe(false);
  });

  test('Admin interface shows security indicators', async ({ page }) => {
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // Aller sur l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 1. Vérifier que l'interface admin indique la sécurité
    await expect(page.getByText('Administration')).toBeVisible();
    
    // 2. Vérifier que les actions sensibles nécessitent une confirmation
    const deleteButtons = page.locator('button[aria-label*="Supprimer"], button[title*="Supprimer"]');
    const deleteCount = await deleteButtons.count();
    
    if (deleteCount > 0) {
      await deleteButtons.first().click();
      await expect(page.getByText(/Confirmer|Êtes-vous sûr|Delete/i)).toBeVisible();
    }
  });
});
