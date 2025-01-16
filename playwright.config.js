// @ts-check
// @see https://playwright.dev/docs/test-configuration
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 15 : 5,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }], 
    ['list'],
    [
      'allure-playwright',
      {
        excludeArtifacts: ['screenshot.png', 'video.mp4'],
      },
    ],
  ],
  use: {
    headless: true,
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
  },
  globalSetup: './support/globalSetup.js',
  timeout: 120000,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        timeout: 30000, 
        actionTimeout: 15000, 
        expect: {
          timeout: 10000, 
        },
      },

    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        timeout: 60000, 
        actionTimeout: 15000,
        expect: {
          timeout: 10000,
        },
      },
    },
    {
      name: 'Webkit',
      use: {
        ...devices['Desktop Safari'],
        timeout: 120000, 
        actionTimeout: 15000,
        expect: {
          timeout: 10000,
        },
      },
    },
    {
      name: 'Microsoft Edge',
      use: { 
       ...devices['Desktop Edge'], channel: 'msedge',
          timeout: 120000, 
          actionTimeout: 15000,
          expect: {
            timeout: 10000,
          },
      },
    },
    {
      name: 'Mobile_Chrome',
      use: { 
        ...devices['Pixel 5'],
        timeout: 120000, 
          actionTimeout: 15000,
          expect: {
            timeout: 10000,
          },
      },
    },
    {
      name: 'Mobile_Safari',
      use: { 
        ...devices['iPhone 12'], 
        timeout: 120000, 
          actionTimeout: 15000,
          expect: {
            timeout: 10000,
          },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})

