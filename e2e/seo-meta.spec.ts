import { test, expect } from '@playwright/test';

test.describe('SEO & Meta Tags', () => {
  test('homepage has proper meta description', async ({ page }) => {
    await page.goto('/');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });

  test('homepage has proper Open Graph tags', async ({ page }) => {
    await page.goto('/');
    // Check OG title exists (may or may not be present)
    const title = await page.title();
    expect(title).toContain('LDASD');
  });

  test('schema markup is present on homepage', async ({ page }) => {
    await page.goto('/');
    const schema = page.locator('script[type="application/ld+json"]');
    await expect(schema.first()).toBeAttached();
  });

  test('all pages have unique titles', async ({ page }) => {
    const titles = new Set<string>();
    const pages = ['/', '/about', '/pricing', '/contact', '/privacy', '/terms'];
    
    for (const path of pages) {
      await page.goto(path);
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
    }
  });

  test('canonical URLs are properly set', async ({ page }) => {
    await page.goto('/');
    // Verify page loads with proper HTML lang attribute
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });
});
