import { test as baseTest } from '@playwright/test';
import * as commands from './commands.js'

import BasePage from '../pageObjects/BasePage.js';
import CartPage from '../pageObjects/CartPage.js';
import CheckoutPage from '../pageObjects/CheckoutPage.js';
import ContactUsPage from '../pageObjects/ContactUsPage.js';
import LoginPage from '../pageObjects/LoginPage.js';
import PaymentDonePage from '../pageObjects/PaymentDonePage.cy.js';
import PaymentPage from '../pageObjects/PaymentPage.js';
import ProductDetailsPage from '../pageObjects/ProductDetailsPage.js';
import ProductsPage from '../pageObjects/ProductsPage.js';
import SignUpPage from '../pageObjects/SignUpPage.js';
import TestCasesPage from '../pageObjects/TestCasesPage.js';
import HomePage from '../pageObjects/HomePage.js';


export const test = baseTest.extend({
  deleteUser: async ({}, use) => { await use(commands.deleteUser) },
  registerUser: async ({}, use) => { await use(commands.registerUser) },
  loginUser: async ({}, use) => { await use(commands.loginUser) },
  deleteUserAfterRegistration: async ({}, use) => { await use(commands.deleteUserAfterRegistration) },

  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage)
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage)
  },
  
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage)
  },
  
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage)
  },
  
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage)
  },
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage)
  },
  
  paymentDonePage: async ({ page }, use) => {
    const paymentDonePage = new PaymentDonePage(page);
    await use(paymentDonePage)
  },
  
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage)
  },
  
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage)
  },
  
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage)
  },
  
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage)
  },
  
  testCasesPage: async ({ page }, use) => {
    const testCasesPage = new TestCasesPage(page);
    await use(testCasesPage)
  },


  beforeEach: async ({ page, basePage }, use, testInfo) => {
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