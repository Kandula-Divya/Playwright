import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should show login form and labels', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Username')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should keep user on login page with invalid credentials', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Username').fill('wrong');
    await page.getByLabel('Password').fill('bad');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.error')).toHaveText('Username or password is incorrect.');
    await expect(page).toHaveURL('http://127.0.0.1:4300/');
  });
});
