import { test } from "../../support/globalHooks.js"
import { expect } from '@playwright/test'

import { newProductTestData } from '../../fixtures/genData.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }


const { user } = jsonData
const testData = newProductTestData()


test.describe('Tests for the sections: Contact Us, Subscriptions', () => {

  test('Test Case 6: Contact Us Form', async ({ page, homePage, contactUsPage }) => {
    await homePage.clickContactUsButton()
    await expect(await homePage.getPageUrl()).toContain(text.contactUsPage.pageUrl)
    await expect(await contactUsPage.getGetInTouchHeaderText()).toContain(text.contactUsPage.getInTouchHeader)
    await contactUsPage.typeNameTextField(user.name)
    await contactUsPage.typeEmailTextField(user.email)
    await contactUsPage.typeSubjectTextField(testData.subject)
    await contactUsPage.typeMessageTextField(testData.message)
    await contactUsPage.clickAndAttachFile(text.contactUsPage.fileLocation)
    await contactUsPage.waitAndConfirmAlertWindow()
    await contactUsPage.clickSubmitButton();
    await expect(await contactUsPage.getSuccessMessage()).toHaveText(text.contactUsPage.sentLetterSuccessMessage);
    await contactUsPage.clickBackToHomePageButton();
    await expect(await homePage.getPageTitle()).toContain(text.homePage.pageTitle);
  });

  test('Test Case 10: Verify Subscription in home page', async ({ page, homePage }) => {
    await homePage.scrollToBottom();
    await expect(await homePage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    await homePage.typeSubscriptionFooterEmailField(user.email)
    await homePage.clickSubscribeButton();
    await expect(await homePage.getSuccessSubscribeMessage()).toBeVisible();
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({ page, homePage, cartPage }) => {
    await homePage.clickViewCartHeaderButton()
    await cartPage.scrollToBottom()
    await expect(await cartPage.getSubscriptionFooterSection()).toHaveText(text.homePage.subscriptionHeading);
    await cartPage.typeSubscriptionFooterEmailField(user.email)
    await cartPage.clickSubscribeButton();
    await expect(await cartPage.getSuccessSubscribeMessage()).toBeVisible();
  });
});
