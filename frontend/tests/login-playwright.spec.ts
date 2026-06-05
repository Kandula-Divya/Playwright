import { test, expect } from '@playwright/test';

test.describe('Angular login page', () => {
  test('should login successfully and navigate to welcome page', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('password');

    await Promise.all([
      page.waitForURL('**/welcome/admin', { timeout: 10000 }),
      page.getByRole('button', { name: 'Login' }).click(),
    ]);

    await expect(page.locator('text=Welcome, admin')).toBeVisible();
    await expect(page.locator('text=You have successfully logged in.')).toBeVisible();
  });

  test('should show an error when login credentials are invalid', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Username').fill('wrong');
    await page.getByLabel('Password').fill('bad');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.error')).toHaveText('Username or password is incorrect.');
    await expect(page).toHaveURL('http://127.0.0.1:4300/');
  });
});
