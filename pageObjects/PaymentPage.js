import BasePage from "./BasePage.js";

class PaymentPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getHeadingOfSection = () => this.page.getByRole('heading', { level: 2, name: 'Payment' })
getPaymentInformation = () => this.page.locator('.payment-information')
getNameOnCardTextField = () => this.page.locator('input[data-qa="name-on-card"]')
getCardNumberTextField = () => this.page.locator('input[data-qa="card-number"]')
getCardCvvTextField = () => this.page.locator('input[data-qa="cvc"]')
getCardExpiryMonthTextField = () => this.page.locator('input[data-qa="expiry-month"]')
getCardExpiryYearTextField = () => this.page.locator('input[data-qa="expiry-year"]')
getPayAndConfirmOrderButton = () => this.page.getByRole('button', { name: 'Pay and Confirm Order' })
getSuccessOrderMessage = () => this.page.locator('#success_message > .alert-success')

// other locators:
// getHeadingOfSection = () => this.page.locator('.step-one h2')
// getPayAndConfirmOrderButton = () => this.page.locator('button[data-qa="pay-button"]')

async typeNameOnCardTextField(name, lastname) {
  await this.getNameOnCardTextField().type(`${name} ${lastname}`)
  return this
}

async typeCardNumberTextField(cardNumber) {
  await this.getCardNumberTextField().type(cardNumber)
  return this
}

async typeCardCvvTextField(cardCvv) {
  await this.getCardCvvTextField().type(cardCvv)
  return this
}

async typeCardExpiryMonthTextField(exMonth) {
  await this.getCardExpiryMonthTextField().type(exMonth)
  return this
}

async typeCardExpiryYearTextField(exYear) {
  await this.getCardExpiryYearTextField().type(exYear)
  return this
}

async clickPayAndConfirmOrderButton() {
  await this.getPayAndConfirmOrderButton().click()
  return this
}
}

export default PaymentPage;