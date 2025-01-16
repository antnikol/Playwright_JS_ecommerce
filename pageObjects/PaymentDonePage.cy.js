import BasePage from "./BasePage.js"

class PaymentDonePage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getOrderPlacedHeading = () => this.page.getByRole('heading', { level: 2, name: 'Order Placed!' })
getOrderPlacedMessage = () => this.page.getByText('Congratulations! Your order has been confirmed!')
getDownloadInvoiceButton = () => this.page.getByRole('link', { name: /download invoice/i })
getContinuePlacedOrderButton = () => this.page.getByRole('link', { name: /continue/i })

// css.locators:
// getOrderPlacedHeading = () => this.page.locator('h2[data-qa="order-placed"]')
// getOrderPlacedMessage = () => this.page.locator('h2[data-qa="order-placed"] + p')
// getDownloadInvoiceButton = () => this.page.locator('.btn.btn-default.check_out')
// getContinuePlacedOrderButton = () => this.page.locator('a[data-qa="continue-button"]')

async clickDownloadInvoiceButton() {
  await this.getDownloadInvoiceButton().click()
  return this
}

async clickContinuePlacedOrderButton() {
  await this.getContinuePlacedOrderButton().click()
  return this
}
}

export default PaymentDonePage