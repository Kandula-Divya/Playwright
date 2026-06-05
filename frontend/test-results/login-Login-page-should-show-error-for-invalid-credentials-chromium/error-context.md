# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login page >> should show error for invalid credentials
- Location: tests\login.spec.ts:20:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Login page', () => {
  4  |   test('should display the login form', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     await expect(page.getByLabel('Username')).toBeVisible();
  8  |     await expect(page.getByLabel('Password')).toBeVisible();
  9  |     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('should login successfully and show welcome message', async ({ page }) => {
  13 |     await page.goto('/');
  14 | 
  15 |     await page.fill('input[name="username"]', 'admin');
  16 |     await page.fill('input[name="password"]', 'password');
  17 | 
  18 |     await Promise.all([
  19 |       page.waitForURL('**/welcome/admin', { timeout: 10000 }),
  20 |       page.getByRole('button', { name: 'Login' }).click(),
> 21 |     ]);
     |                ^ Error: page.goto: Target page, context or browser has been closed
  22 | 
  23 |     await expect(page.locator('text=Welcome, admin')).toBeVisible();
  24 |     await expect(page.locator('text=You have successfully logged in.')).toBeVisible();
  25 |   });
  26 | 
  27 |   test('should show error for invalid credentials', async ({ page }) => {
  28 |     await page.goto('/');
  29 | 
  30 |     await page.fill('input[name="username"]', 'wrong');
  31 |     await page.fill('input[name="password"]', 'wrong');
  32 |     await page.getByRole('button', { name: 'Login' }).click();
  33 | 
  34 |     await expect(page.locator('.error')).toHaveText('Username or password is incorrect.');
  35 |     await expect(page).toHaveURL('http://127.0.0.1:4300/');
  36 |   });
  37 | });
  38 | 
```