import { test } from "../../support/globalHooks.js"
import { expect } from '@playwright/test'

import { newProductTestData } from '../../fixtures/genData.js'
import { userTestData } from '../../fixtures/genUser.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }
import { deleteUser, deleteUserAfterRegistration, registerUser, loginUser, loguotUser } from '../../support/commands.js'

const product = newProductTestData()
// const randomUser = userTestData()
const { user, incorrectPassword, registeredUser } = jsonData

test.describe('Tests for the sections: Sign Up, Login', ()=> {

  test('Test Case 1: Register User', async ({ page, homePage, loginPage, signUpPage }) => {
    const userEmail = product.userEmail
    const randomUser = userTestData()
    // await deleteUser(page, userEmail)
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getSignupFormHeader()).toHaveText(text.loginPage.signupFormHeader)
    await loginPage.typeNameSignupTextField(user.name)
    await loginPage.typeEmailSignupTextField(userEmail)
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
    await deleteUserAfterRegistration(page, userEmail)
  })

  test('Test Case 2: Login User with correct email and password', async ({ page, homePage }) => {
    await loginUser(page, registeredUser.email, registeredUser.password)
    await expect(await homePage.getListHeaderButtons()).toContainText(registeredUser.name)
    await loguotUser(page)
  })

  test('Test Case 3: Login User with incorrect email and password', async ({ page, homePage, loginPage }) => {
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeEmailLoginTextField(registeredUser.email)
    await loginPage.typePasswordLoginTextField(registeredUser.incorrectPassword)
    await loginPage.clickLoginButton()
    await expect(await loginPage.getErrorLoginMessage()).toHaveText(text.loginPage.errorLoginMessage)
  })

  test('Test Case 4: Logout User', async ({ page, homePage, loginPage }) => {
    await loginUser(page, registeredUser.email, registeredUser.password)
    await expect(await homePage.getListHeaderButtons()).toContainText(registeredUser.name)
    await homePage.clickLogoutButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader);
  })

  test('Test Case 5: Register User with existing email', async ({ page, homePage, loginPage }) => {
    await homePage.clickSignupLoginButton()
    await expect(await loginPage.getLoginFormHeader()).toHaveText(text.loginPage.loginFormHeader)
    await loginPage.typeNameSignupTextField(registeredUser.name)
    await loginPage.typeEmailSignupTextField(registeredUser.email)
    await loginPage.clickSignupButton()
    await expect(await loginPage.getErrorSingupMessage()).toHaveText(text.loginPage.errorSingupMessage)
  })

})