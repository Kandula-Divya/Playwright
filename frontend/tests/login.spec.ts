import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('should display the login form', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should login successfully and show welcome message', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'password');

    await Promise.all([
      page.waitForURL('**/welcome/admin', { timeout: 10000 }),
      page.getByRole('button', { name: 'Login' }).click(),
    ]);

    await expect(page.locator('text=Welcome, admin')).toBeVisible();
    await expect(page.locator('text=You have successfully logged in.')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/');

    await page.fill('input[name="username"]', 'wrong');
    await page.fill('input[name="password"]', 'wrong');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.error')).toHaveText('Username or password is incorrect.');
    await expect(page).toHaveURL('http://127.0.0.1:4300/');
  });
});
