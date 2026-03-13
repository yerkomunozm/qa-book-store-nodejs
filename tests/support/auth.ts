import { expect, Page } from 'playwright/test';
import { getRequiredEnv } from './env';

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/users/login');
  await expect(page).toHaveURL(/\/users\/login$/);

  await page.locator('#email').fill(getRequiredEnv('QA_ADMIN_EMAIL'));
  await page.locator('#password').fill(getRequiredEnv('QA_ADMIN_PASSWORD'));
  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page).toHaveURL(/\/books$/);
  await expect(page.getByRole('link', { name: /add a new book/i })).toBeVisible();
}

export async function loginAsCustomer(page: Page): Promise<void> {
  await page.goto('/users/login');
  await expect(page).toHaveURL(/\/users\/login$/);

  await page.locator('#email').fill(getRequiredEnv('QA_CUSTOMER_EMAIL'));
  await page.locator('#password').fill(getRequiredEnv('QA_CUSTOMER_PASSWORD'));
  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page).toHaveURL(/\/books$/);
  await expect(page.getByRole('link', { name: /go to dashboard/i })).toBeVisible();
}
