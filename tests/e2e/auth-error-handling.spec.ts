import { test, expect } from '@playwright/test';

test.describe('Authentication Error Handling', () => {
  test('Invalid credentials show error message', async ({ page }) => {
    await page.goto('/');
    
    // 1. Cliquer sur connexion
    await page.getByText('Connexion').click();
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    
    // 2. Remplir avec des identifiants invalides
    await page.fill('[name="identifier"]', 'invalid@email.com');
    await page.fill('[name="password"]', 'wrongpassword');
    
    // 3. Cliquer sur connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 4. Vérifier l'affichage du message d'erreur
    await expect(page.getByText(/Invalid credentials|Invalid email or password/i)).toBeVisible();
    
    // 5. Vérifier que l'utilisateur reste sur la page de connexion
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    await expect(page.getByText('Connexion')).not.toBeVisible();
  });

  test('Empty form fields show validation errors', async ({ page }) => {
    await page.goto('/');
    
    // 1. Cliquer sur connexion
    await page.getByText('Connexion').click();
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    
    // 2. Essayer de se connecter sans remplir les champs
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 3. Vérifier les messages de validation
    await expect(page.getByText(/This field is required|Email is required/i)).toBeVisible();
    
    // 4. Remplir seulement l'email
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 5. Vérifier le message d'erreur pour le mot de passe
    await expect(page.getByText(/Password is required/i)).toBeVisible();
  });

  // Test d'inscription supprimé - l'inscription n'est plus disponible

  // Test d'inscription supprimé - l'inscription n'est plus disponible

  test('Network error handling', async ({ page }) => {
    // 1. Simuler une erreur réseau
    await page.route('**/api/**', route => route.abort());
    
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    
    // 2. Cliquer sur connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 3. Vérifier l'affichage d'un message d'erreur réseau
    await expect(page.getByText(/Network error|Connection failed|Try again/i)).toBeVisible();
  });

  test('Server error handling', async ({ page }) => {
    // 1. Simuler une erreur serveur
    await page.route('**/api/**', route => 
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    );
    
    await page.goto('/');
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    
    // 2. Cliquer sur connexion
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 3. Vérifier l'affichage d'un message d'erreur serveur
    await expect(page.getByText(/Server error|Something went wrong|Try again later/i)).toBeVisible();
  });

  test('Error messages are accessible', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Connexion').click();
    
    // 1. Remplir avec des identifiants invalides
    await page.fill('[name="identifier"]', 'invalid@email.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 2. Vérifier que le message d'erreur est accessible
    const errorMessage = page.getByText(/Invalid credentials|Invalid email or password/i);
    await expect(errorMessage).toBeVisible();
    
    // 3. Vérifier que le message d'erreur a les bons attributs ARIA
    await expect(errorMessage).toHaveAttribute('role', 'alert');
    
    // 4. Vérifier que le focus est sur le message d'erreur ou le premier champ
    const firstInput = page.locator('[name="identifier"]');
    await expect(firstInput).toBeFocused();
  });

  test('Error recovery works correctly', async ({ page }) => {
    await page.goto('/');
    
    // 1. Essayer de se connecter avec des identifiants invalides
    await page.getByText('Connexion').click();
    await page.fill('[name="identifier"]', 'invalid@email.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 2. Vérifier l'erreur
    await expect(page.getByText(/Invalid credentials|Invalid email or password/i)).toBeVisible();
    
    // 3. Corriger les identifiants
    await page.fill('[name="identifier"]', 'test@example.com');
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // 4. Vérifier que la connexion fonctionne
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
  });
});
