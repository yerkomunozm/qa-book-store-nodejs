import { expect, test } from 'playwright/test';

test('GET /admin sin sesion queda protegido @api', async ({ request }) => {
  const response = await request.get('/admin', {
    maxRedirects: 0
  });

  expect(response.status()).toBe(302);
  expect(response.headers().location).toContain('/users/login');
});
