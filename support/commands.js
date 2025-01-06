import jsonData from '../fixtures/api.json' assert { type: 'json' }
import { expect } from '@playwright/test'

import LoginPage from '../pageObjects/LoginPage'
import BasePage from '../pageObjects/BasePage'
import SignUpPage from '../pageObjects/SignUpPage'
import HomePage from '../pageObjects/HomePage'

const { user, message, registeredUser } = jsonData
const USEREMAIL = user.email
const PASSWORD = user.password


export async function deleteUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const basePage = new BasePage(page)

  await homePage.clickSignupLoginButton()
  await loginPage.typeEmailLoginTextField(userEmail)
  await loginPage.typePasswordLoginTextField(pass)
  await loginPage.clickLoginButton()

  const errorMessageVisible = await loginPage.getErrorLoginMessage().count()

  if (errorMessageVisible > 0) {
    await expect(loginPage.getErrorLoginMessage()).toHaveText('Your email or password is incorrect!')
    await page.goto('/')
    await expect(await homePage.getPageUrl(page)).toBe('https://automationexercise.com/')
    await expect(await homePage.getPageTitle(page)).toContain('Automation Exercise')
  } else {
    await homePage.clickDeleteAccountButton()
    await expect( basePage.getAccountDeletedConfirmMessage()).toContainText('Account Deleted!')
  }
}

export async function registerUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const signupPage = new SignUpPage(page)

  await deleteUser(page)
  await homePage.clickSignupLoginButton();
  
  await loginPage.typeNameSignupTextField(user.name);
  await loginPage.typeEmailSignupTextField(userEmail);
  await loginPage.clickSignupButton();
  
  await signupPage.checkTitleMrRadioButton();
  await signupPage.typePasswordTextField(pass);
  await signupPage.selectBirthDay(user.birth_date);
  await signupPage.selectBirthMonth(user.birth_month);
  await signupPage.selectBirthYear(user.birth_year);
  await signupPage.checkNewsletterCheckbox();
  await signupPage.checkSpecialOffersCheckbox();
  
  await signupPage.typeFirstNameTextField(user.firstname);
  await signupPage.typeLastNameTextField(user.lastname);
  await signupPage.typeCompanyTextField(user.company);
  await signupPage.typeAddressTextField(user.address1);
  await signupPage.typeAddress2TextField(user.address2);
  await signupPage.selectCountryList(user.country);
  await signupPage.typeStateTextField(user.state);
  await signupPage.typeCityTextField(user.city);
  await signupPage.typeZipCodeTextField(user.zipcode);
  await signupPage.typeMobileNumberTextField(user.mobile_number);
  
  await signupPage.clickCreateAccountButton();
  await signupPage.clickContinueButton();
  
  await expect(homePage.getListHeaderButtons()).toContainText(user.name);
}

export async function loginUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  const homePage = new HomePage(page)
  const basePage = new BasePage(page)
  const loginPage = new LoginPage(page)

  await basePage.clickSignupLoginButton();
  await expect(loginPage.getLoginFormHeader()).toHaveText('Login to your account')
  
  await loginPage.typeEmailLoginTextField(userEmail);
  await loginPage.typePasswordLoginTextField(pass);
  await loginPage.clickLoginButton();
  
  await expect(homePage.getListHeaderButtons()).toContainText('Logout');
}

export async function deleteUserAfterRegistration(page) {
  const homePage = new HomePage(page)
  const basePage = new BasePage(page)

  await homePage.clickDeleteAccountButton();
  await expect(basePage.getAccountDeletedConfirmMessage()).toContainText('Account Deleted!');
}

export async function registerUserByAPI({request}, randomUser) {
  let formData = new URLSearchParams();
    for (let key in randomUser) {
      if (randomUser.hasOwnProperty(key)) {
        formData.append(key, randomUser[key]);
      }
    }
    const response = await request.post('/api/createAccount', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString(),
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(201)
    expect(responseBody.message).toBe(message.userCreated)
}

export async function deleteUserByAPI({request}) {
  let formData = new URLSearchParams()
  formData.append('email', user.email)
  formData.append('password', user.password)
  const response = await request.delete('/api/deleteAccount', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
    data: formData.toString()
  })
  const responseBody = await response.json()
  expect(response.status()).toBe(200)
  expect(responseBody.responseCode).toBe(200)
  expect(responseBody.message).toBe(message.accountDeleted)
}

export async function registerUserFromLoginPage(page, userEmail = USEREMAIL, pass = PASSWORD) {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const signupPage = new SignUpPage(page)

  await loginPage.typeNameSignupTextField(user.name);
  await loginPage.typeEmailSignupTextField(userEmail);
  await loginPage.clickSignupButton();
  
  await signupPage.checkTitleMrRadioButton();
  await signupPage.typePasswordTextField(pass);
  await signupPage.selectBirthDay(user.birth_date);
  await signupPage.selectBirthMonth(user.birth_month);
  await signupPage.selectBirthYear(user.birth_year);
  await signupPage.checkNewsletterCheckbox();
  await signupPage.checkSpecialOffersCheckbox();
  
  await signupPage.typeFirstNameTextField(user.firstname);
  await signupPage.typeLastNameTextField(user.lastname);
  await signupPage.typeCompanyTextField(user.company);
  await signupPage.typeAddressTextField(user.address1);
  await signupPage.typeAddress2TextField(user.address2);
  await signupPage.selectCountryList(user.country);
  await signupPage.typeStateTextField(user.state);
  await signupPage.typeCityTextField(user.city);
  await signupPage.typeZipCodeTextField(user.zipcode);
  await signupPage.typeMobileNumberTextField(user.mobile_number);
  
  await signupPage.clickCreateAccountButton();
  await signupPage.clickContinueButton();
  
  await expect(homePage.getListHeaderButtons()).toContainText(user.name);
}

export async function loguotUser(page, userName=registeredUser.name) {
  const basePage = new BasePage(page)
  const homePage = new HomePage(page)
  await basePage.clickLogoutButton()
  await expect(homePage.getListHeaderButtons()).not.toContainText(userName)
}

export async function apiDeleteUser({request}, randomUser) {
      let formData = new URLSearchParams()
      formData.append('email', randomUser.email)
      formData.append('password', randomUser.password)
      const response = await request.delete('/api/deleteAccount', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        data: formData.toString()
      })
      const responseBody = await response.json()
      expect(response.status()).toBe(200)
      expect(responseBody.responseCode).toBe(200)
      expect(responseBody.message).toBe(message.accountDeleted)
}