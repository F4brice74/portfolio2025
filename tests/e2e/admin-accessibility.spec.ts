import { test, expect } from '@playwright/test';

test.describe('Admin Interface Accessibility', () => {
  test('Keyboard navigation works correctly', async ({ page }) => {
    // Se connecter d'abord
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    
    // Aller sur l'admin
    await page.getByText('Admin').click();
    await expect(page.getByText('Dashboard Administration')).toBeVisible();
    
    // 1. Tester la navigation au clavier dans le header admin
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();
    
    // 2. Naviguer entre les éléments du header
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // 3. Vérifier que la navigation fonctionne
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 4. Tester l'activation avec Entrée
    await page.keyboard.press('Enter');
    
    // 5. Vérifier que l'action a été déclenchée
    // (cela dépend de l'élément focalisé)
  });

  test('ARIA attributes are properly set', async ({ page }) => {
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
    
    // 1. Vérifier les rôles ARIA principaux
    await expect(page.getByRole('navigation')).toBeVisible(); // Header admin
    await expect(page.getByRole('main')).toBeVisible(); // Contenu principal
    
    // 2. Vérifier les boutons ont les bons rôles
    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Articles' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Paramètres' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Retour au site' })).toBeVisible();
    
    // 3. Vérifier les liens ont les bons rôles
    await expect(page.getByRole('link', { name: 'Nouvel Article' })).toBeVisible();
  });

  test('Color contrast meets accessibility standards', async ({ page }) => {
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
    
    // 1. Vérifier le contraste du titre principal
    const mainTitle = page.getByText('Dashboard Administration');
    await expect(mainTitle).toHaveCSS('color', /rgb\(0, 0, 0\)|rgb\(33, 37, 41\)/);
    
    // 2. Vérifier le contraste des boutons
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    const buttonColor = await dashboardButton.evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(buttonColor).toMatch(/rgb\(0, 0, 0\)|rgb\(33, 37, 41\)/);
    
    // 3. Vérifier le contraste des liens
    const newArticleLink = page.getByRole('link', { name: 'Nouvel Article' });
    const linkColor = await newArticleLink.evaluate(el => 
      window.getComputedStyle(el).color
    );
    expect(linkColor).toMatch(/rgb\(37, 99, 235\)|rgb\(59, 130, 246\)/);
  });

  test('Screen reader compatibility', async ({ page }) => {
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
    
    // 1. Vérifier les labels appropriés
    await expect(page.getByRole('heading', { name: 'Dashboard Administration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Articles Récents' })).toBeVisible();
    
    // 2. Vérifier les descriptions des boutons
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    await expect(dashboardButton).toHaveAttribute('aria-label', /Dashboard|Tableau de bord/);
    
    // 3. Vérifier les descriptions des liens
    const newArticleLink = page.getByRole('link', { name: 'Nouvel Article' });
    await expect(newArticleLink).toHaveAttribute('aria-label', /Nouvel Article|Create new article/);
  });

  test('Focus management works correctly', async ({ page }) => {
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
    
    // 1. Vérifier que le focus est visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 2. Vérifier que le focus est visible sur les boutons
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    await dashboardButton.focus();
    await expect(dashboardButton).toBeFocused();
    
    // 3. Vérifier que le focus est visible sur les liens
    const newArticleLink = page.getByRole('link', { name: 'Nouvel Article' });
    await newArticleLink.focus();
    await expect(newArticleLink).toBeFocused();
  });

  test('Mobile accessibility features work', async ({ page }) => {
    // Configuration mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
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
    
    // 1. Vérifier que les éléments sont accessibles au touch
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    await expect(dashboardButton).toHaveCSS('min-height', /44px|2.75rem/);
    
    // 2. Vérifier que les liens sont accessibles au touch
    const newArticleLink = page.getByRole('link', { name: 'Nouvel Article' });
    await expect(newArticleLink).toHaveCSS('min-height', /44px|2.75rem/);
    
    // 3. Vérifier que les éléments sont espacés correctement
    const buttonGroup = page.locator('[role="group"]');
    await expect(buttonGroup).toHaveCSS('gap', /8px|0.5rem/);
  });

  test('Error messages are accessible', async ({ page }) => {
    // Se connecter
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'invalid@email.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 1. Vérifier que le message d'erreur est accessible
    const errorMessage = page.getByText(/Invalid credentials|Invalid email or password/i);
    await expect(errorMessage).toBeVisible();
    
    // 2. Vérifier que le message d'erreur a les bons attributs ARIA
    await expect(errorMessage).toHaveAttribute('role', 'alert');
    
    // 3. Vérifier que le message d'erreur est annoncé par les lecteurs d'écran
    await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  test('Admin navigation is accessible with screen readers', async ({ page }) => {
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
    
    // 1. Vérifier que la navigation a les bons attributs ARIA
    const navigation = page.getByRole('navigation');
    await expect(navigation).toHaveAttribute('aria-label', /Admin navigation|Navigation admin/);
    
    // 2. Vérifier que les boutons de navigation ont les bons attributs
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    await expect(dashboardButton).toHaveAttribute('aria-current', 'page');
    
    // 3. Vérifier que les liens ont les bons attributs
    const newArticleLink = page.getByRole('link', { name: 'Nouvel Article' });
    await expect(newArticleLink).toHaveAttribute('aria-describedby');
  });
});
