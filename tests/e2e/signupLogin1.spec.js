import { test } from "../../support/globalHooks.js"
import { expect } from '@playwright/test'

import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }


const { user, incorrectPassword } = jsonData

test.describe('Tests for the sections: Sign Up, Login', ()=> {

  test('Test Case 1: Register User', async ({ page }) => {
    cy.deleteUser()
    homePage.clickSignupLoginButton();
    loginPage.getSignupFormHeader().should('have.text', text.loginPage.signupFormHeader);
    loginPage
      .typeNameSignupTextField(user.name)
      .typeEmailSignupTextField(user.email)
      .clickSignupButton();
    signupPage.getCreateAccountButton().should('have.text', text.loginPage.createAccount);
    signupPage
      .checkTitleMrRadioButton()
      .typePasswordTextField(user.password)
      .selectBirthDay(user.birth_date)
      .selectBirthMonth(user.birth_month)
      .selectBirthYear(user.birth_year)
      .checkNewsletterCheckbox()
      .checkSpecialOffersCheckbox()
      .typeFirstNameTextField(user.firstname)
      .typeLastNameTextField(user.lastname)
      .typeCompanyTextField(user.company)
      .typeAddressTextField(user.address1)
      .typeAddress2TextField(user.address2)
      .selectCountryList(user.country)
      .typeStateTextField(user.state)
      .typeCityTextField(user.city)
      .typeZipCodeTextField(user.zipcode)
      .typeMobileNumberTextField(user.mobile_number)
      .clickCreateAccountButton()
      .clickContinueButton();
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
    cy.deleteUserAfterRegistration()
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', text.loginPage.loginFormHeader);
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(user.password)
      .clickLoginButton()
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
  })

  test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', text.loginPage.loginFormHeader);
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(incorrectPassword[0])
      .clickLoginButton()
    loginPage.getErrorLoginMessage().should('have.text', 'Your email or password is incorrect!');
  })

  test('Test Case 4: Logout User', async ({ page }) => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', text.loginPage.loginFormHeader);
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(user.password)
      .clickLoginButton()
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
    homePage.clickLogoutButton()
    loginPage.getLoginFormHeader().should('have.text', text.loginPage.loginFormHeader);
  })

  test('Test Case 5: Register User with existing email', async ({ page }) => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', text.loginPage.loginFormHeader);
    loginPage
      .typeNameSignupTextField(user.name)
      .typeEmailSignupTextField(user.email)
      .clickSignupButton()
    loginPage.getErrorSingupMessage().should('have.text', text.loginPage.errorSingupMessage)
    cy.deleteUser()
  })

})