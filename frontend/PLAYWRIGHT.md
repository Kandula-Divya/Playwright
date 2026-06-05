# Playwright Login Test for Todo Angular App

## What was added

- `@playwright/test` as a dev dependency in `frontend/package.json`
- `frontend/playwright.config.ts` for Playwright configuration
- `frontend/tests/login.spec.ts` with two login test cases
- Playwright test scripts in `frontend/package.json`

## What the test does

The login spec covers two scenarios:

1. Successful login
   - Opens the app at `/`
   - Fills username `admin`
   - Fills password `password`
   - Submits the form
   - Verifies the welcome message contains `Welcome, admin`

2. Failed login
   - Opens the app at `/`
   - Fills invalid credentials
   - Submits the form
   - Verifies the error message is displayed

## Playwright configuration

- `testDir`: `./tests`
- `baseURL`: `http://127.0.0.1:4200`
- `webServer`: starts the Angular frontend using `npm start`
- `projects`: runs tests in Chromium via Playwright's Desktop Chrome device

## How to run

From the `frontend` folder:

```powershell
npm install
npm run playwright:install
npm run playwright:test
```

If the frontend server is already running, Playwright will reuse it.

## Notes

- `npm start` now runs `ng serve --port 4200`.
- The login page is expected to accept `admin` / `password`.
