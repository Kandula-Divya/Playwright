import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:8081/api/auth';

test.describe('Auth API', () => {
  test('login success returns 200 and username', async ({ request }) => {
    const response = await request.post(`${BASE}/login`, {
      data: { username: 'admin', password: 'password' },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('username', 'admin');
  });

  test('login failure returns 401', async ({ request }) => {
    const response = await request.post(`${BASE}/login`, {
      data: { username: 'wrong', password: 'creds' },
    });
    expect(response.status()).toBe(401);
  });

  test('root endpoint returns welcome message', async ({ request }) => {
    const response = await request.get('http://localhost:8081/');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain('Welcome to the Todo backend');
  });
});
