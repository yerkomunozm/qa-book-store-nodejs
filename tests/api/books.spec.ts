import { expect, test } from 'playwright/test';

test('GET /books responde correctamente y entrega HTML @api', async ({ request }) => {
  const response = await request.get('/books');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/html');

  const body = await response.text();
  expect(body).toContain('Book Store');
});
