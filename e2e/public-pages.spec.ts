import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('homepage loads with hero section and key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LDASD Estate Planning/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Create Your Estate Plan')).toBeVisible();
    await expect(page.getByText('View Products & Pricing')).toBeVisible();
  });

  test('homepage displays trust indicators', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('BBB A+ Rated')).toBeVisible();
    await expect(page.getByText('100,000+ Families')).toBeVisible();
    await expect(page.getByText('50-State Coverage')).toBeVisible();
  });

  test('homepage displays product cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Trust', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Will', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Guardianship', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Complete Estate Plan')).toBeVisible();
  });

  test('homepage displays testimonials', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('What Our Families Say')).toBeVisible();
    await expect(page.getByText('Sarah & Michael T.')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/i);
  });

  test('pricing page loads with product tiers', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveTitle(/Pricing/i);
    await expect(page.getByText('$199').first()).toBeVisible();
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/i);
  });

  test('privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page).toHaveTitle(/Privacy/i);
  });

  test('terms of service page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveTitle(/Terms/i);
  });

  test('product pages load correctly', async ({ page }) => {
    for (const product of ['will', 'trust', 'estate-plan', 'guardianship']) {
      await page.goto(`/products/${product}`);
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('learn page loads', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('who-we-serve page loads', async ({ page }) => {
    await page.goto('/who-we-serve');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
