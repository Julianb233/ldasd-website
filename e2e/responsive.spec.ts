import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('homepage renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Create Your Estate Plan')).toBeVisible();
  });

  test('homepage renders correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('pricing page is usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/pricing');
    await expect(page.getByText('$199').first()).toBeVisible();
  });
});
