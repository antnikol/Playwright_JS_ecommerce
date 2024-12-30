import { test } from "../../support/globalHooks.js"
import { expect } from '@playwright/test'

import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }
import { deleteUser, deleteUserAfterRegistration, registerUser } from '../../support/commands.js';



const { user, incorrectPassword } = jsonData

test.describe('Tests for the sections: Sign Up, Login', ()=> {

  test('Test Case 1: Register User', async ({ page, homePage, loginPage, signUpPage }) => {
    await deleteUser(page)
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getSignupFormHeader()).toHaveText(text.loginPage.signupFormHeader)
    await loginPage.typeNameSignupTextField(user.name)
    await loginPage.typeEmailSignupTextField(user.email)
    await loginPage.clickSignupButton()
    await expect(await signUpPage.getCreateAccountButton()).toHaveText(text.loginPage.createAccount)
    await signUpPage.checkTitleMrRadioButton()
    await signUpPage.typePasswordTextField(user.password)
    await signUpPage.selectBirthDay(user.birth_date)
    await signUpPage.selectBirthMonth(user.birth_month)
    await signUpPage.selectBirthYear(user.birth_year)
    await signUpPage.checkNewsletterCheckbox()
    await signUpPage.checkSpecialOffersCheckbox()
    await signUpPage.typeFirstNameTextField(user.firstname)
    await signUpPage.typeLastNameTextField(user.lastname)
    await signUpPage.typeCompanyTextField(user.company)
    await signUpPage.typeAddressTextField(user.address1)
    await signUpPage.typeAddress2TextField(user.address2)
    await signUpPage.selectCountryList(user.country)
    await signUpPage.typeStateTextField(user.state)
    await signUpPage.typeCityTextField(user.city)
    await signUpPage.typeZipCodeTextField(user.zipcode)
    await signUpPage.typeMobileNumberTextField(user.mobile_number)
    await signUpPage.clickCreateAccountButton()
    await signUpPage.clickContinueButton();
    await expect(await homePage.getListHeaderButtons()).toContainText(`${user.name}`)
    await deleteUserAfterRegistration(page)
  })

  test('Test Case 2: Login User with correct email and password', async ({ page, homePage, loginPage }) => {
    await registerUser(page)
    await homePage.clickLogoutButton()
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader);
    await loginPage.typeEmailLoginTextField(user.email)
    await loginPage.typePasswordLoginTextField(user.password)
    await loginPage.clickLoginButton()
    await expect(await homePage.getListHeaderButtons()).toContainText(user.name);
  })

  test('Test Case 3: Login User with incorrect email and password', async ({ page, homePage, loginPage }) => {
    await registerUser(page)
    await homePage.clickLogoutButton()
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeEmailLoginTextField(user.email)
    await loginPage.typePasswordLoginTextField(incorrectPassword[0])
    await loginPage.clickLoginButton()
    await expect(await loginPage.getErrorLoginMessage()).toHaveText('Your email or password is incorrect!')
  })

  test('Test Case 4: Logout User', async ({ page, homePage, loginPage }) => {
    await registerUser(page)
    await homePage.clickLogoutButton()
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeEmailLoginTextField(user.email)
    await loginPage.typePasswordLoginTextField(user.password)
    await loginPage.clickLoginButton()
    await expect(await homePage.getListHeaderButtons()).toContainText(user.name)
    await homePage.clickLogoutButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader);
  })

  test('Test Case 5: Register User with existing email', async ({ page, homePage, loginPage }) => {
    await registerUser(page)
    await homePage.clickLogoutButton()
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeNameSignupTextField(user.name)
    await loginPage.typeEmailSignupTextField(user.email)
    await loginPage.clickSignupButton()
    await expect(await loginPage.getErrorSingupMessage()).toHaveText(text.loginPage.errorSingupMessage)
    await deleteUser(page)
  })

})