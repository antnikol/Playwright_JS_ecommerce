// @ts-check
// @see https://playwright.dev/docs/test-configuration
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 5 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }], 
    ['list'],
    ['allure-playwright'],
  ],
  use: {
    headless: true,
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
  },
  globalSetup: './support/globalSetup.js',
  timeout: 60000,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        timeout: 30000, 
        actionTimeout: 45000, 
        expect: {
          timeout: 15000, 
        },
      },

    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        timeout: 60000, 
        actionTimeout: 60000,
        expect: {
          timeout: 15000,
        },
      },
    },
    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
        timeout: 90000, 
        actionTimeout: 90000,
        expect: {
          timeout: 15000,
        },
      },
    },
    {
      name: 'Microsoft Edge',
      use: { 
       ...devices['Desktop Edge'], channel: 'msedge',
          timeout: 90000, 
          actionTimeout: 40000,
          expect: {
            timeout: 15000,
          },
      },
    },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

