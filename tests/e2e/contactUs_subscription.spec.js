import { test } from '../../support/globalHooks'
import { expect } from '@playwright/test'

import { newProductTestData } from '../../fixtures/genData.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }


const { user } = jsonData
const testData = newProductTestData()


test.describe('Tests for the sections: Contact Us, Subscriptions', () => {

  test.only('Test Case 6: Contact Us Form', async ({ page, homePage, contactUsPage }) => {
    await page.goto('/')
    await homePage.clickContactUsButton()
    expect(await homePage.getPageUrl()).toContain(text.contactUsPage.pageUrl)
    await expect(await contactUsPage.getGetInTouchHeader()).toContain(text.contactUsPage.getInTouchHeader)
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

  test('Test Case 10: Verify Subscription in home page', async ({ homePage }) => {
    await homePage.scrollToBottom();
    expect(await homePage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    await homePage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton();
    expect(await homePage.getSuccessSubscribeMessage()).toBeVisible();
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({ homePage, cartPage }) => {
    await homePage.clickViewCartHeaderButton();
    await cartPage.scrollToBottom();
    expect(await cartPage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    cartPage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton();
    expect(await cartPage.getSuccessSubscribeMessage()).toBeVisible();
  });
});
