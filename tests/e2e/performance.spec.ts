import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load images efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Check that images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check that image has loaded
      const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete);
      expect(isLoaded).toBe(true);
    }
  });

  test('should respond successfully', async ({ page }) => {
    const response = await page.goto('/');
    
    // Response should be successful
    expect(response?.status()).toBe(200);
  });
});
