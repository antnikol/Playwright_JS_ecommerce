import { test } from "../../support/globalHooks.js"
import { expect } from '@playwright/test'

import { newProductTestData } from '../../fixtures/genData.js'
import { deleteUserAfterRegistration, loginUser, apiDeleteUser } from '../../support/commands.js'
import text from "../../fixtures/text.json" assert { type: "json" }

const product = newProductTestData()


test.describe('Tests for the sections: Sign Up, Login', ()=> {

  test('Test Case 1: Register User', async ({ page, homePage, loginPage, signUpPage, request, randomUser }) => {
    await apiDeleteUser({ request }, randomUser)
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getSignupFormHeader()).toHaveText(text.loginPage.signupFormHeader)
    await loginPage.typeNameSignupTextField(randomUser.name)
    await loginPage.typeEmailSignupTextField(randomUser.email)
    await loginPage.clickSignupButton()
    await expect(await signUpPage.getCreateAccountButton()).toHaveText(text.loginPage.createAccount)
    await signUpPage.checkTitleMrRadioButton()
    await signUpPage.typePasswordTextField(randomUser.password)
    await signUpPage.selectBirthDay(randomUser.birth_date)
    await signUpPage.selectBirthMonth(randomUser.birth_month)
    await signUpPage.selectBirthYear(randomUser.birth_year)
    await signUpPage.checkNewsletterCheckbox()
    await signUpPage.checkSpecialOffersCheckbox()
    await signUpPage.typeFirstNameTextField(randomUser.firstname)
    await signUpPage.typeLastNameTextField(randomUser.lastname)
    await signUpPage.typeCompanyTextField(randomUser.company)
    await signUpPage.typeAddressTextField(randomUser.address1)
    await signUpPage.typeAddress2TextField(randomUser.address2)
    await signUpPage.selectCountryList(randomUser.country)
    await signUpPage.typeStateTextField(randomUser.state)
    await signUpPage.typeCityTextField(randomUser.city)
    await signUpPage.typeZipCodeTextField(randomUser.zipcode)
    await signUpPage.typeMobileNumberTextField(randomUser.mobile_number)
    await signUpPage.clickCreateAccountButton()
    await signUpPage.clickContinueButton()
    await expect(await homePage.getListHeaderButtons()).toContainText(`${randomUser.name}`)
    await deleteUserAfterRegistration(page)
  })

  test('Test Case 2: Login User with correct email and password', async ({ page, homePage, randomUser }) => {
    await loginUser(page, randomUser.email, randomUser.password)
    await expect(await homePage.getListHeaderButtons()).toContainText(randomUser.name)
  })

  test('Test Case 3: Login User with incorrect email and password', async ({ homePage, loginPage, randomUser }) => {
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeEmailLoginTextField(randomUser.email)
    await loginPage.typePasswordLoginTextField(randomUser.incorrectPassword)
    await loginPage.clickLoginButton()
    await expect(await loginPage.getErrorLoginMessage()).toHaveText(text.loginPage.errorLoginMessage)
  })

  test('Test Case 4: Logout User', async ({ page, homePage, loginPage, randomUser }) => {
    await loginUser(page, randomUser.email, randomUser.password)
    await expect(await homePage.getListHeaderButtons()).toContainText(randomUser.name)
    await homePage.clickLogoutButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
  })

  test('Test Case 5: Register User with existing email', async ({ homePage, loginPage, randomUser }) => {
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeNameSignupTextField(randomUser.name)
    await loginPage.typeEmailSignupTextField(randomUser.email)
    await loginPage.clickSignupButton()
    await expect(await loginPage.getErrorSingupMessage()).toHaveText(text.loginPage.errorSingupMessage)
  })

})