/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ContactUsPage from "../pageObjects/ContactUsPage"
import CartPage from "../pageObjects/CartPage"
import genData from "../../fixtures/genData"
import { user } from '../../fixtures/api.json'
import text from "../../fixtures/text.json"


const homePage = new HomePage()
const contactUsPage = new ContactUsPage()
const cartPage = new CartPage()

const testData = genData.newProductTestData()


describe('Tests for the sections: Contact Us, Subscriptions', ()=> {

  it('Test Case 6: Contact Us Form', () => {
    homePage.clickContactUsButton()
    homePage.getPageUrl().should('contain', text.contactUsPage.pageUrl)
    contactUsPage.getGetInTouchHeader().should('contain', text.contactUsPage.getInTouchHeader)
    contactUsPage
      .typeNameTextField(user.name)
      .typeEmailTextField(user.email)
      .typeSubjectTextField(testData.subject)
      .typeMessageTextField(testData.message)
      .clickAndAttachFile(text.contactUsPage.fileLocation)
      .waitAndConfirmAlertWindow()
      .clickSubmitButton()
      .getSuccessMessage().should('have.text', text.contactUsPage.sentLetterSuccessMessage)
    contactUsPage.clickBackToHomePageButton()
    homePage.getPageTitle().should('include', text.homePage.pageTitle)
  })  

  it('Test Case 10: Verify Subscription in home page', () => {
    homePage
      .scrollToBottom()
      .getSubscriptionFooterSection().should('include.text', text.homePage.subscriptionHeading)
    homePage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton()
      .getSuccessSubscribeMessage().should('be.visible')
  })

  it('Test Case 11: Verify Subscription in Cart page', () => {
    homePage.clickViewCartHeaderButton()
    cartPage
      .scrollToBottom()
      .getSubscriptionFooterSection().should('include.text', text.homePage.subscriptionHeading)
    cartPage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton()
      .getSuccessSubscribeMessage().should('be.visible')
  })

})