import BasePage from "./BasePage.js"
import SignUpPage from "./SignUpPage.js";

class LoginPage extends BasePage {
 
constructor(page) {
  super(page)
  this.page = page;
}

getSignupFormHeader = () => this.page.locator('.signup-form > h2')
getSignupNameTextField = () => this.page.locator('input[data-qa="signup-name"]')
getSignupEmailTextField = () => this.page.locator('input[data-qa="signup-email"]')
getSignupButton = () => this.page.locator('button[data-qa="signup-button"]')
getLoginFormHeader = () => this.page.locator('.login-form > h2')
getLoginEmailTextField = () => this.page.locator('input[data-qa="login-email"]')
getLoginPasswordTextField = () => this.page.locator('input[data-qa="login-password"]')
getLoginButton = () => this.page.locator('button[data-qa="login-button"]')
getErrorLoginMessage = () => this.page.locator('form[action="/login"] > p')
getErrorSingupMessage = () => this.page.locator('form[action="/signup"] > p')


async typeNameSignupTextField(userName) {
  await this.getSignupNameTextField().type(userName)
  return this
}

async typeEmailSignupTextField(userEmail) {
  await this.getSignupEmailTextField().type(userEmail)
  return this
}

async clickSignupButton() {
  await this.getSignupButton().click()
  return new SignUpPage(this.page)
}

async typeEmailLoginTextField(userEmail) {
  await this.getLoginEmailTextField().type(userEmail)
  return this
}

async typePasswordLoginTextField(userPassword) {
  await this.getLoginPasswordTextField().type(userPassword)
  return this
}

async clickLoginButton() {
  await this.getLoginButton().click()
  return this
}

}

export default LoginPage;