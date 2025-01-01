import jsonData from '../fixtures/api.json' assert { type: 'json' }
import { expect } from '@playwright/test'

import LoginPage from '../pageObjects/LoginPage'
import BasePage from '../pageObjects/BasePage'
import SignUpPage from '../pageObjects/SignUpPage'
import HomePage from '../pageObjects/HomePage'

const { user } = jsonData
const USEREMAIL = user.email
const PASSWORD = user.password


export async function deleteUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const basePage = new BasePage(page)

  await homePage.clickSignupLoginButton()
  await loginPage.typeEmailLoginTextField(user.email)
  await loginPage.typePasswordLoginTextField(user.password)
  await loginPage.clickLoginButton()

  const errorMessageVisible = await loginPage.getErrorLoginMessage().count()

  if (errorMessageVisible > 0) {
    await expect(loginPage.getErrorLoginMessage()).toHaveText('Your email or password is incorrect!')
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
  
  await loginPage.typeEmailLoginTextField(user.email);
  await loginPage.typePasswordLoginTextField(user.password);
  await loginPage.clickLoginButton();
  
  await expect(homePage.getListHeaderButtons()).toContainText(user.name);
}

export async function deleteUserAfterRegistration(page) {
  const homePage = new HomePage(page)
  const basePage = new BasePage(page)

  await homePage.clickDeleteAccountButton();
  await expect(basePage.getAccountDeletedConfirmMessage()).toContainText('Account Deleted!');
}

