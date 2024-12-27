import BasePage from "./BasePage.js"
import HomePage from "./HomePage.js"


class SignUpPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getTitleMrRadioButton = () => this.page.locator('input[id="id_gender1"]')
getPasswordTextField = () => this.page.locator('input[data-qa="password"]')
getAllBirthDays = () => this.page.locator('select[data-qa="days"]')
getAllBirthMonths = () => this.page.locator('select[data-qa="months"]')
getAllBirthYears = () => this.page.locator('select[data-qa="years"]')
getNewsletterCheckbox = () => this.page.locator('#newsletter')
getSpecialOffersCheckbox = () => this.page.locator('#newsletter')
getFirstNameTextField = () => this.page.locator('input[data-qa="first_name"]')
getLastNameTextField = () => this.page.locator('input[data-qa="last_name"]')
getCompanyTextField = () => this.page.locator('input[data-qa="company"]')
getAddressTextField = () => this.page.locator('input[data-qa="address"]')
getAddress2TextField = () => this.page.locator('input[data-qa="address2"]')
getCountryList = () => this.page.locator('select[data-qa="country"]')
getStateTextField = () => this.page.locator('input[data-qa="state"]')
getCityTextField = () => this.page.locator('input[data-qa="city"]')
getZipCodeTextField = () => this.page.locator('input[data-qa="zipcode"]')
getMobileNumberTextField = () => this.page.locator('input[data-qa="mobile_number"]')
getCreateAccountButton = () => this.page.locator('button[data-qa="create-account"]')
getContinueButton = () => this.page.locator('a[data-qa="continue-button"]')


async checkTitleMrRadioButton() {
  await this.getTitleMrRadioButton().check()
  return this
}

async typePasswordTextField(password) {
  await this.getPasswordTextField().type(password)
  return this
}
  
async selectBirthDay(day) {
  await this.getAllBirthDays().selectOption(day)
  return this
}

async selectBirthMonth(month) {
  await this.getAllBirthMonths().selectOption(month)
  return this
}

async selectBirthYear(year) {
  await this.getAllBirthYears().selectOption(year)
  return this
}

async checkNewsletterCheckbox() {
  await this.getNewsletterCheckbox().check()
  return this
}

async checkSpecialOffersCheckbox() {
  await this.getSpecialOffersCheckbox().check()
  return this
}

async typeFirstNameTextField(firstName) {
  await this.getFirstNameTextField().type(firstName)
  return this
}

async typeLastNameTextField(lastName) {
  await this.getLastNameTextField().type(lastName)
  return this
}

async typeCompanyTextField(company) {
  await this.getCompanyTextField().type(company)
  return this
}

async typeAddressTextField(address) {
  await this.getAddressTextField().type(address)
  return this
}

async typeAddress2TextField(address2) {
  await this.getAddress2TextField().type(address2)
  return this
}

async selectCountryList(country) {
  await this.getCountryList().select(country)
  return this
}

async typeStateTextField(state) {
  await this.getStateTextField().type(state)
  return this
}

async typeCityTextField(city) {
  await this.getCityTextField().type(city)
  return this
}

async typeZipCodeTextField(zipcode) {
  await this.getZipCodeTextField().type(zipcode)
  return this
}

async typeMobileNumberTextField(mobileNumber) {
  await this.getMobileNumberTextField().type(mobileNumber)
  return this
}

async clickCreateAccountButton() {
  await this.getCreateAccountButton().click()
  return this
}

async clickContinueButton() {
  await this.getContinueButton().click()
  return new HomePage(this.page)
}

}

export default SignUpPage;