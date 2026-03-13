import { expect, test } from 'playwright/test';

test('POST /users/login con credenciales invalidas no autentica al usuario @api', async ({ request }) => {
  const loginResponse = await request.post('/users/login', {
    form: {
      email: 'invalid-user@example.com',
      password: 'wrong-password'
    },
    maxRedirects: 0
  });

  expect(loginResponse.status()).toBe(302);
  expect(loginResponse.headers().location).toContain('/users/login');

  const dashboardResponse = await request.get('/users/dashboard', {
    maxRedirects: 0
  });

  expect(dashboardResponse.status()).toBe(302);
  expect(dashboardResponse.headers().location).toContain('/users/login');
});
