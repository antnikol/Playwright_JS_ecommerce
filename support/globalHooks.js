import { test as baseTest } from '@playwright/test';
import * as commands from './commands.js'
import HomePage from '../pageObjects/HomaPage.js';

let homePage

export const test = baseTest.extend({
  deleteUser: async ({}, use) => { await use(commands.deleteUser) },
  registerUser: async ({}, use) => { await use(commands.registerUser) },
  loginUser: async ({}, use) => { await use(commands.loginUser) },
  deleteUserAfterRegistration: async ({}, use) => { await use(commands.deleteUserAfterRegistration) },

  beforeEach: async ({ page }, use, testInfo) => {
    const homePage = new HomePage(page)
    if (!testInfo.title.includes('api_automation')) {
      await page.goto('/')
      await expect(homePage.getPageUrl(page)).toBe('https://automationexercise.com/')
      await expect(homePage.getHeaderHomeIcon(page)).toHaveCSS('color', 'rgb(255, 165, 0)')
      await expect(homePage.getSliderSection(page)).toBeVisible()
      await expect(homePage.getLeftSideBar(page)).toBeVisible()
      await expect(homePage.getFeaturesItemsSection(page)).toBeVisible()
      await expect(homePage.getPageTitle(page)).toContain('Automation Exercise')
    }
    await use(page)
  },
});