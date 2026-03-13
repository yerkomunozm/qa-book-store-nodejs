import { expect, test } from 'playwright/test';
import { loginAsAdmin, loginAsCustomer } from '../support/auth';

test.describe('Post-deploy smoke checks', () => {
  test('application responds and core public pages load @smoke', async ({ page }) => {
    await page.goto('/books');

    await expect(page).toHaveURL(/\/books$/);
    await expect(page).toHaveTitle(/Book Store App/i);
    await expect(page.getByRole('heading', { name: /book store app/i })).toBeVisible();

    await page.goto('/users/login');
    await expect(page).toHaveURL(/\/users\/login$/);
    await expect(page.getByRole('heading', { name: /^login$/i })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('customer login works and dashboard is reachable @smoke', async ({ page }) => {
    await loginAsCustomer(page);

    await page.goto('/users/dashboard');
    await expect(page).toHaveURL(/\/users\/dashboard$/);
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test('admin panel responds for an authenticated admin @smoke', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole('heading', { name: /admin panel/i })).toBeVisible();
    await expect(page.getByText(/books in your store/i)).toBeVisible();
  });
});
