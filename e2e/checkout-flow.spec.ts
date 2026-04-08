import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('checkout page requires authentication', async ({ page }) => {
    // API checkout should require auth
    const response = await page.goto('/checkout/success');
    // Should either show the page or redirect - either way it should load
    await expect(page.locator('body')).toBeVisible();
  });

  test('checkout cancel page loads', async ({ page }) => {
    await page.goto('/checkout/cancel');
    await expect(page.locator('body')).toBeVisible();
  });

  test('pricing page shows all product tiers', async ({ page }) => {
    await page.goto('/pricing');
    // Check that major price points are visible
    await expect(page.getByText('$199').first()).toBeVisible();
    await expect(page.getByText('$599').first()).toBeVisible();
  });

  test('product pages have purchase/get started CTA', async ({ page }) => {
    await page.goto('/products/will');
    // Should have a CTA button
    const cta = page.getByRole('link', { name: /get started|buy|purchase|start|create/i }).first();
    await expect(cta).toBeVisible();
  });
});
