import BasePage from "./BasePage.js"
import HomePage from "./HomePage.js"


class ContactUsPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getGetInTouchHeader = () => this.page.getByRole('heading', { level: 2, name: 'Get In Touch' })
getNameTextField = () => this.page.getByPlaceholder('Name')
getEmailTextField = () => this.page.getByPlaceholder('Email', { exact: true })
getSubjectTextField = () => this.page.getByPlaceholder('Subject')
getMessageTextField = () => this.page.getByPlaceholder('Your Message Here')
getAttachFileField = () => this.page.locator('input[type="file"]')
getSubmitButton = () => this.page.locator('input[data-qa="submit-button"]')
getSuccessMessage = () => this.page.locator('.status.alert.alert-success')
getBackToHomePageButton = () => this.page.locator('a.btn.btn-success')

// css.locators:
// getGetInTouchHeader = () => this.page.locator('.contact-form h2')
// getNameTextField = () => this.page.locator('input[data-qa="name"]')
// getEmailTextField = () => this.page.locator('input[data-qa="email"]')
// getSubjectTextField = () => this.page.locator('input[data-qa="subject"]')
// getMessageTextField = () => this.page.locator('textarea[data-qa="message"]')


async getGetInTouchHeaderText() {
  return (await this.getGetInTouchHeader().textContent())
}

async typeNameTextField(name) {
  await this.getNameTextField().type(name)
  return this
}

async typeEmailTextField(email) {
  await this.getEmailTextField().type(email)
  return this
}

async typeSubjectTextField(subject) {
  await this.getSubjectTextField().type(subject)
  return this
}
  
async typeMessageTextField(message) {
  await this.getMessageTextField().type(message)
  return this
}

async clickAndAttachFile(fileName) {
  await this.getAttachFileField().setInputFiles(fileName)
  return this
}

async waitAndConfirmAlertWindow() {
  this.page.once('dialog', async (dialog) => { await dialog.accept()})
  return this
}

async clickSubmitButton() {
  await this.getSubmitButton().click()
  return this
}

async clickBackToHomePageButton() {
  await this.getBackToHomePageButton().click()
  return new HomePage(this.page)
}

}

export default ContactUsPage