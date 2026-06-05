# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home page >> should keep user on login page with invalid credentials
- Location: tests\home.spec.ts:12:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://127.0.0.1:4300/"
Received: "http://127.0.0.1:4300/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://127.0.0.1:4300/login"

```

```yaml
- heading "Angular Login" [level=1]
- text: Username or password is incorrect. Username
- textbox "Username": wrong
- text: Password
- textbox "Password": bad
- button "Login"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Home page', () => {
  4  |   test('should show login form and labels', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     await expect(page.getByText('Username')).toBeVisible();
  8  |     await expect(page.getByText('Password')).toBeVisible();
  9  |     await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('should keep user on login page with invalid credentials', async ({ page }) => {
  13 |     await page.goto('/');
  14 | 
  15 |     await page.getByLabel('Username').fill('wrong');
  16 |     await page.getByLabel('Password').fill('bad');
  17 |     await page.getByRole('button', { name: 'Login' }).click();
  18 | 
  19 |     await expect(page.locator('.error')).toHaveText('Username or password is incorrect.');
> 20 |     await expect(page).toHaveURL('http://127.0.0.1:4300/');
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  21 |   });
  22 | });
  23 | 
```