import jsonData from '../fixtures/api.json' assert { type: 'json' }
import { expect } from '@playwright/test'

import LoginPage from '../pageObjects/LoginPage'
import BasePage from '../pageObjects/BasePage'
import SignUpPage from '../pageObjects/SignUpPage'
import HomePage from '../pageObjects/HomePage'

const { user, message, registeredUser } = jsonData
// const USEREMAIL = randomUser.email
// const PASSWORD = randomUser.password


// export async function deleteUser(page, userEmail, userPassword) {
//   const homePage = new HomePage(page)
//   const loginPage = new LoginPage(page)
//   const basePage = new BasePage(page)

//   await homePage.clickSignupLoginButton()
//   await loginPage.typeEmailLoginTextField(userEmail)
//   await loginPage.typePasswordLoginTextField(userPassword)
//   await loginPage.clickLoginButton()

//   const errorMessageVisible = await loginPage.getErrorLoginMessage().count()

//   if (errorMessageVisible > 0) {
//     await expect(loginPage.getErrorLoginMessage()).toHaveText('Your email or password is incorrect!')
//     await page.goto('/')
//     await expect(await homePage.getPageUrl(page)).toBe('https://automationexercise.com/')
//     await expect(await homePage.getPageTitle(page)).toContain('Automation Exercise')
//   } else {
//     await homePage.clickDeleteAccountButton()
//     await expect( basePage.getAccountDeletedConfirmMessage()).toContainText('Account Deleted!')
//   }
// }

export async function registerUser(page, randomUser) {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  const signupPage = new SignUpPage(page)

  if (homePage.getPageUrl(page) == 'https://automationexercise.com/') {
    await homePage.clickSignupLoginButton()
  }
  await loginPage.typeNameSignupTextField(randomUser.name)
  await loginPage.typeEmailSignupTextField(randomUser.email)
  await loginPage.clickSignupButton()
  await signupPage.checkTitleMrRadioButton()
  await signupPage.typePasswordTextField(randomUser.password)
  await signupPage.selectBirthDay(randomUser.birth_date)
  await signupPage.selectBirthMonth(randomUser.birth_month)
  await signupPage.selectBirthYear(randomUser.birth_year)
  await signupPage.checkNewsletterCheckbox()
  await signupPage.checkSpecialOffersCheckbox()
  await signupPage.typeFirstNameTextField(randomUser.firstname)
  await signupPage.typeLastNameTextField(randomUser.lastname)
  await signupPage.typeCompanyTextField(randomUser.company)
  await signupPage.typeAddressTextField(randomUser.address1)
  await signupPage.typeAddress2TextField(randomUser.address2)
  await signupPage.selectCountryList(randomUser.country)
  await signupPage.typeStateTextField(randomUser.state)
  await signupPage.typeCityTextField(randomUser.city)
  await signupPage.typeZipCodeTextField(randomUser.zipcode)
  await signupPage.typeMobileNumberTextField(randomUser.mobile_number)
  await signupPage.clickCreateAccountButton()
  await signupPage.clickContinueButton()
  
  await expect(homePage.getListHeaderButtons()).toContainText(randomUser.name)
}

export async function loginUser(page, userEmail, userPassword) {
  const homePage = new HomePage(page)
  const basePage = new BasePage(page)
  const loginPage = new LoginPage(page)
  await basePage.clickSignupLoginButton()
  await expect(loginPage.getLoginFormHeader()).toHaveText('Login to your account')
  await loginPage.typeEmailLoginTextField(userEmail)
  await loginPage.typePasswordLoginTextField(userPassword)
  await loginPage.clickLoginButton()

  await expect(homePage.getListHeaderButtons()).toContainText('Logout')
}

export async function deleteUserAfterRegistration(page) {
  const homePage = new HomePage(page)
  const basePage = new BasePage(page)
  await homePage.clickDeleteAccountButton()
  await expect(basePage.getAccountDeletedConfirmMessage()).toContainText('Account Deleted!')
}

export async function apiRegisterUser({request}, randomUser) {
  let formData = new URLSearchParams()
    for (let key in randomUser) {
      if (randomUser.hasOwnProperty(key)) {
        formData.append(key, randomUser[key])
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

// export async function deleteUserByAPI({request}) {
//   let formData = new URLSearchParams()
//   formData.append('email', user.email)
//   formData.append('password', user.password)
//   const response = await request.delete('/api/deleteAccount', {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
//     data: formData.toString()
//   })
//   const responseBody = await response.json()
//   expect(response.status()).toBe(200)
//   expect(responseBody.responseCode).toBe(200)
//   expect(responseBody.message).toBe(message.accountDeleted)
// }

// export async function registerUserFromLoginPage(page, randomUser) {
//   const homePage = new HomePage(page)
//   const loginPage = new LoginPage(page)
//   const signupPage = new SignUpPage(page)

//   await loginPage.typeNameSignupTextField(randomUser.name)
//   await loginPage.typeEmailSignupTextField(randomUser.email)
//   await loginPage.clickSignupButton()
  
//   await signupPage.checkTitleMrRadioButton()
//   await signupPage.typePasswordTextField(randomUser.password)
//   await signupPage.selectBirthDay(randomUser.birth_date)
//   await signupPage.selectBirthMonth(randomUser.birth_month)
//   await signupPage.selectBirthYear(randomUser.birth_year)
//   await signupPage.checkNewsletterCheckbox()
//   await signupPage.checkSpecialOffersCheckbox()
  
//   await signupPage.typeFirstNameTextField(randomUser.firstname)
//   await signupPage.typeLastNameTextField(randomUser.lastname)
//   await signupPage.typeCompanyTextField(randomUser.company)
//   await signupPage.typeAddressTextField(randomUser.address1)
//   await signupPage.typeAddress2TextField(randomUser.address2)
//   await signupPage.selectCountryList(randomUser.country)
//   await signupPage.typeStateTextField(randomUser.state)
//   await signupPage.typeCityTextField(randomUser.city)
//   await signupPage.typeZipCodeTextField(randomUser.zipcode)
//   await signupPage.typeMobileNumberTextField(randomUser.mobile_number)
  
//   await signupPage.clickCreateAccountButton()
//   await signupPage.clickContinueButton()
  
//   await expect(homePage.getListHeaderButtons()).toContainText(randomUser.name)
// }

export async function loguotUser(page, userName) {
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

export async function checkUserExists({ request }, randomUser) {
    const response = await request.get(`/api/getUserDetailByEmail?email=${randomUser.email}`)
    const responseBody = await response.json()
    return responseBody.user && responseBody.user.name !== undefined ? true : false
}