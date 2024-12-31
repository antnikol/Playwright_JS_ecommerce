import BasePage from "./BasePage.js"

class CartPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page;
}

getCartProductsList = () => this.page.locator('.cart_product')
getProductQuantityList = () => this.page.locator('.cart_quantity button')
getProductPricesList = () => this.page.locator('.cart_price p')
getProductTotalPriceList = () => this.page.locator('.cart_total_price')
getActiveBreadcrumbs = () => this.page.locator('.breadcrumb .active')
getDeleteProductFromCartButton = () => this.page.locator('.cart_quantity_delete')
getEmptyCardSection = () => this.page.locator('#empty_cart p')
getProductsNamesList = () => this.page.locator('h4 a')
getProceedToCheckoutButton = () => this.page.locator('.btn.check_out')

getFirstProductQuantity = () => this.page.locator('.cart_quantity button').first().innerText()
getLastProductQuantity = () => this.page.locator('.cart_quantity button').last()
getFirstProductPrice = () => this.page.locator('.cart_price p').first()
getFirstProductTotalPrice = () => this.page.locator('.cart_total_price').first()
getLastProductPrice = () => this.page.locator('.cart_price p').last()
getLastProductTotalPrice = () => this.page.locator('.cart_total_price').last()
getFirstProductName = () => this.page.locator('.cart_description a').first()

async getEmptyCardSectionText() {
  return this.getEmptyCardSection().innerText()
}

async getFirstProductPriceNumber() {
  const text = await this.getProductPricesList().first().innerText()
  return parseFloat(text.slice(4))
}

async calculateFirstProductTotalPrice() {
  const quantity = await this.getProductQuantityList().first().innerText()
  const price = await this.getFirstProductPriceNumber()
  return parseFloat(quantity) * parseFloat(price)
}

async getFirstProductTotalPriceNumber() {
  const text = await this.getProductTotalPriceList().first().innerText()
  return parseFloat(text.slice(4)) 
}

async getLastProductPriceNumber() {
  const text = await this.getProductPricesList().last().innerText();
  return parseFloat(text.slice(4))
}

async calculateLastProductTotalPrice() {
  const quantity = await this.getProductQuantityList().last().innerText()
  const price = await this.getLastProductPriceNumber()
  return parseFloat(quantity) * parseFloat(price)
}

async getLastProductTotalPriceNumber() {
  const text = await this.getProductTotalPriceList().last().innerText();
  return parseFloat(text.slice(4));
}

async getExpectedFirstProductTotalPrice(quantity) {
  const price = await this.getFirstProductPrice().innerText();
  return parseFloat(price) * quantity;
}

async clickDeleteProductFromCartButton() {
  await this.getDeleteProductFromCartButton().click();
  return this;
}

async checkSearchedProductNamesInCart(searchWords) {
  const productNames = await this.getProductsNamesList().allTextContents();
  productNames.forEach(text => {
    if (!new RegExp(searchWords, 'i').test(text)) throw new Error(`Mismatch: ${text}`);
  });
  return this;
}

async checkSearchedProductQuantityInCart(quantity) {
  const quantities = await this.getProductQuantityList().allTextContents();
  quantities.forEach(text => {
    if (!new RegExp(quantity, 'i').test(text)) throw new Error(`Quantity mismatch: ${text}`);
  });
  return this;
}

async getSavedVariableAs(variable) {
  return variable
}

async clickProceedToCheckoutButton() {
  await this.getProceedToCheckoutButton().click()
  return this
}

}

export default CartPage;