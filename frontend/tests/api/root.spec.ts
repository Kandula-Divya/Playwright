import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8081';

test.describe('Backend root endpoint', () => {
  test('GET / returns welcome message', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain('Welcome to the Todo backend');
  });
});
