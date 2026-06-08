const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './frontend/tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'http://127.0.0.1:4300',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npx ng serve --port 4300 --host 127.0.0.1 --open=false',
    cwd: 'frontend',
    url: 'http://127.0.0.1:4300',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
