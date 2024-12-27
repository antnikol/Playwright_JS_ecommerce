import BasePage from "./BasePage.js"
import LoginPage from "./LoginPage.js"
import PaymentPage from "./PaymentPage.js"

class CheckoutPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page;
}

getCartInfoSection = () => this.page.locator('#cart_info')
getCartProductDescription = () => this.page.locator('.cart_description')
getRegisterLoginModalButton = () => this.page.locator('.modal-body a[href="/login"]')
getAddressDeliverySection = () => this.page.locator('#address_delivery')
getAddressBillingSection = () => this.page.locator('#address_invoice')
getDeliveryGenderFirstNameLastName = () => this.page.locator('#address_delivery .address_firstname.address_lastname').innerText()
getDeliveryCompany = () => this.page.locator('#address_delivery .address_address1.address_address2').nth(0)
getDeliveryAddress = () => this.page.locator('#address_delivery .address_address1.address_address2').nth(1)
getDeliveryAddress2 = () => this.page.locator('#address_delivery .address_address1.address_address2').nth(2)
getAllCartProductNameList = () => this.page.locator('.cart_description a')
getAllCartProductPriceList = () => this.page.locator('.cart_price p')
getCommentOrderTextField = () => this.page.locator('textarea[class="form-control"]')
getPlaceOrderButton = () => this.page.locator('a[href="/payment"]')
getToCartTableSection = () => this.page.locator('.cart_menu')


async clickRegisterLoginModalButton() {
  await this.getRegisterLoginModalButton().click()
  return new LoginPage(this.page)
}

async getSavedVariableAs(variable) {
  return variable
}
async typeCommentOrderTextField(commentToOrder) {
  await this.getCommentOrderTextField().type(commentToOrder)
  return this
}

async clickPlaceOrderButton() {
  await this.getPlaceOrderButton().click()
  return new PaymentPage(this.page)
}

async scrollToCartTableSection() {
  await this.getToCartTableSection().scrollIntoViewIfNeeded();
  return this;
}
}

export default CheckoutPage;