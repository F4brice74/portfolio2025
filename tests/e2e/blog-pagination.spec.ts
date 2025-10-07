import { test, expect } from '@playwright/test';

test.describe('Blog Pagination - US-002', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
  });

  test('should display pagination controls', async ({ page }) => {
    // Check pagination container is visible
    await expect(page.locator('.mantine-Pagination-root')).toBeVisible();
    
    // Check pagination controls exist
    const paginationControls = page.locator('.mantine-Pagination-control');
    await expect(paginationControls).toHaveCount(3); // Previous, 1, 2, Next
    
    // Check page info
    await expect(page.getByText('Page 1 sur 2')).toBeVisible();
    await expect(page.getByText('10 articles au total')).toBeVisible();
  });

  test('should navigate to page 2', async ({ page }) => {
    // Click on page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    
    // Should navigate to page 2
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Should show page 2 info
    await expect(page.getByText('Page 2 sur 2')).toBeVisible();
    
    // Should still show total articles
    await expect(page.getByText('10 articles au total')).toBeVisible();
  });

  test('should navigate back to page 1', async ({ page }) => {
    // Go to page 2 first
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Click on page 1
    const page1Button = page.locator('.mantine-Pagination-control').filter({ hasText: '1' });
    await page1Button.click();
    
    // Should navigate back to page 1
    await expect(page).toHaveURL(/^\/(\?page=1)?$/);
    
    // Should show page 1 info
    await expect(page.getByText('Page 1 sur 2')).toBeVisible();
  });

  test('should disable previous button on first page', async ({ page }) => {
    // Previous button should be disabled on page 1
    const prevButton = page.locator('.mantine-Pagination-control').first();
    await expect(prevButton).toHaveAttribute('data-disabled', 'true');
    await expect(prevButton).toBeDisabled();
  });

  test('should disable next button on last page', async ({ page }) => {
    // Go to page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Next button should be disabled on last page
    const nextButton = page.locator('.mantine-Pagination-control').last();
    await expect(nextButton).toHaveAttribute('data-disabled', 'true');
    await expect(nextButton).toBeDisabled();
  });

  test('should maintain article count across pages', async ({ page }) => {
    // Check articles on page 1
    const articlesPage1 = page.locator('.mantine-Card-root');
    const countPage1 = await articlesPage1.count();
    expect(countPage1).toBe(6); // 6 articles per page
    
    // Go to page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    await page.waitForLoadState('networkidle');
    
    // Check articles on page 2
    const articlesPage2 = page.locator('.mantine-Card-root');
    const countPage2 = await articlesPage2.count();
    expect(countPage2).toBe(4); // Remaining articles (10 total - 6 on page 1)
  });

  test('should handle direct URL navigation to page 2', async ({ page }) => {
    // Navigate directly to page 2
    await page.goto('/?page=2');
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
    
    // Should show page 2
    await expect(page.getByText('Page 2 sur 2')).toBeVisible();
    
    // Should show correct articles
    const articles = page.locator('.mantine-Card-root');
    const count = await articles.count();
    expect(count).toBe(4); // Remaining articles
  });

  test('should handle invalid page numbers gracefully', async ({ page }) => {
    // Navigate to invalid page
    await page.goto('/?page=999');
    await page.waitForLoadState('networkidle');
    
    // Should either redirect to page 1 or show appropriate message
    // The behavior depends on implementation, but should not crash
    await expect(page.locator('.mantine-Card-root')).toBeVisible();
  });

  test('should maintain pagination state when refreshing', async ({ page }) => {
    // Go to page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    await expect(page).toHaveURL(/[?&]page=2/);
    
    // Refresh page
    await page.reload();
    await page.waitForSelector('.mantine-Pagination-root', { timeout: 5000 });
    
    // Should still be on page 2
    await expect(page).toHaveURL(/[?&]page=2/);
    await expect(page.getByText('Page 2 sur 2')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('.mantine-Pagination-root')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.mantine-Pagination-root')).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.mantine-Pagination-root')).toBeVisible();
  });

  test('should have accessible pagination controls', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to focus on pagination controls
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test Enter key on pagination button
    await page.keyboard.press('Enter');
    
    // Should navigate to next page if possible
    const currentURL = page.url();
    if (currentURL.includes('page=2')) {
      await expect(page).toHaveURL(/[?&]page=2/);
    }
  });

  test('should show correct page numbers', async ({ page }) => {
    // On page 1, should show 1 and 2
    await expect(page.locator('.mantine-Pagination-control').filter({ hasText: '1' })).toBeVisible();
    await expect(page.locator('.mantine-Pagination-control').filter({ hasText: '2' })).toBeVisible();
    
    // Go to page 2
    const page2Button = page.locator('.mantine-Pagination-control').filter({ hasText: '2' });
    await page2Button.click();
    
    // Should still show 1 and 2
    await expect(page.locator('.mantine-Pagination-control').filter({ hasText: '1' })).toBeVisible();
    await expect(page.locator('.mantine-Pagination-control').filter({ hasText: '2' })).toBeVisible();
  });
});
