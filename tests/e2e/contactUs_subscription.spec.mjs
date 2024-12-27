import { test } from './support/globalHooks'
import { expect } from '@playwright/test'
import { user } from '../fixtures/api.json' with { type: "json" }
 
import HomePage from '../../pageObjects/HomaPage'
import ContactUsPage from '../../pageObjects/ContactUsPage'
import CartPage from '../../pageObjects/CartPage'
import genData from "../../fixtures/genData"
import text from "../../fixtures/text.json" with { type: "json" }


let contactUsPage, cartPage, homePage;
const testData = genData.newProductTestData();

test.describe('Tests for the sections: Contact Us, Subscriptions', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
    cartPage = new CartPage(page);
  });

  test('Test Case 6: Contact Us Form', async ({ page }) => {
    await homePage.clickContactUsButton();
    expect(await homePage.getPageUrl()).toContain(text.contactUsPage.pageUrl);
    expect(await contactUsPage.getGetInTouchHeader()).toContain(text.contactUsPage.getInTouchHeader);
    await contactUsPage
      .typeNameTextField(user.name)
      .typeEmailTextField(user.email)
      .typeSubjectTextField(testData.subject)
      .typeMessageTextField(testData.message)
      .clickAndAttachFile(text.contactUsPage.fileLocation)
      .waitAndConfirmAlertWindow()
      .clickSubmitButton();
    expect(await contactUsPage.getSuccessMessage()).toHaveText(text.contactUsPage.sentLetterSuccessMessage);
    await contactUsPage.clickBackToHomePageButton();
    expect(await homePage.getPageTitle()).toContain(text.homePage.pageTitle);
  });

  test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
    await homePage.scrollToBottom();
    expect(await homePage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    await homePage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton();
    expect(await homePage.getSuccessSubscribeMessage()).toBeVisible();
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
    await homePage.clickViewCartHeaderButton();
    await cartPage.scrollToBottom();
    expect(await cartPage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    cartPage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton();
    expect(await cartPage.getSuccessSubscribeMessage()).toBeVisible();
  });
});
