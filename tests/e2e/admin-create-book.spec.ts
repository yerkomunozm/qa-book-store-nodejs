import { expect, test } from 'playwright/test';
import { loginAsAdmin } from '../support/auth';

test('admin crea un libro y luego queda visible en el catalogo @e2e', async ({ page }) => {
  const uniqueSuffix = `${Date.now()}`;
  const bookTitle = `QA Admin Book ${uniqueSuffix}`;
  const bookImage = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80';
  const bookDescription = `Playwright seeded book ${uniqueSuffix}`;

  await loginAsAdmin(page);

  await page.getByRole('link', { name: /add a new book/i }).click();
  await expect(page).toHaveURL(/\/books\/new$/);

  await page.getByLabel(/book title/i).fill(bookTitle);
  await page.getByLabel(/book cover url/i).fill(bookImage);
  await page.getByLabel(/book description/i).fill(bookDescription);
  await page.locator('input[name="price"]').fill('19.99');

  await page.getByRole('button', { name: /^create$/i }).click();

  // After creation the app redirects to the book detail page, which is the strongest confirmation.
  await expect(page).toHaveURL(/\/books\/view\//);
  await expect(page.getByRole('heading', { name: bookTitle })).toBeVisible();
  await expect(page.getByText(bookDescription)).toBeVisible();

  // Go back to the catalog and verify the new title is also discoverable from the storefront.
  await page.goto('/books');
  await expect(page.getByText(bookTitle)).toBeVisible();
});
