import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('header contains all main navigation links', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check nav links exist
    await expect(header.getByRole('link', { name: /products/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /pricing/i }).first()).toBeVisible();
  });

  test('footer contains legal and company links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: /privacy/i }).first()).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms/i }).first()).toBeVisible();
  });

  test('CTA button navigates to booking page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Create Your Estate Plan').first().click();
    await expect(page).toHaveURL(/\/book/);
  });

  test('product card links navigate to product pages', async ({ page }) => {
    await page.goto('/');
    // Click on a product card
    await page.getByText('Learn More').first().click();
    await expect(page).toHaveURL(/\/products\//);
  });

  test('pricing link from homepage works', async ({ page }) => {
    await page.goto('/');
    await page.getByText('View Full Pricing & Comparison').click();
    await expect(page).toHaveURL(/\/pricing/);
  });
});
