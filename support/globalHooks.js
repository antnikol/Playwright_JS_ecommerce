import { test as baseTest } from '@playwright/test';
import * as commands from './commands.js'

import HomePage from '../pageObjects/HomePage';

const homePage = new HomePage();


export const test = baseTest.extend({
  deleteUser: commands.deleteUser,
  registerUser: commands.registerUser,
  loginUser: commands.loginUser,
  deleteUserAfterRegistration: commands.deleteUserAfterRegistration,
  beforeEach: async ({ page }, testInfo) => {
    if (!testInfo.title.includes('api_automation')) {
      await page.goto('/');
      await expect(homePage.getPageUrl(page)).toBe('https://automationexercise.com/');
      await expect(homePage.getHeaderHomeIcon(page)).toHaveCSS('color', 'rgb(255, 165, 0)');
      await expect(homePage.getSliderSection(page)).toBeVisible();
      await expect(homePage.getLeftSideBar(page)).toBeVisible();
      await expect(homePage.getFeaturesItemsSection(page)).toBeVisible();
      await expect(homePage.getPageTitle(page)).toContain('Automation Exercise');
    }
  },
});