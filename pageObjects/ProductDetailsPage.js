import BasePage from "./BasePage.js"

class ProductDetailsPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getProductInformationSection = () => this.page.locator('.product-information')
getProductName = () => this.page.locator('.product-information h2')
getProductCategory = () => this.page.locator('.product-information p', { hasText: 'Category' })
getProductAvailability = () => this.page.locator('.product-information p', { hasText: 'Availability' })
getProductCondition = () => this.page.locator('.product-information p', { hasText: 'Condition' })
getProductBrand = () => this.page.locator('.product-information p', { hasText: 'Brand' })
getProductPrice = () => this.page.locator('.product-information span span')
getProductQuantityField = () => this.page.locator('#quantity')
getAddToCartButton = () => this.page.getByRole('button', { name: 'Add to cart' })
getViewCartModalButton = () => this.page.locator('.modal-body a[href="/view_cart"]')
getWriteYourReviewHeader = () => this.page.getByRole('link', { name: 'Write Your Review' })
getYourNameField = () => this.page.getByPlaceholder('Your Name')
getYourEmailField = () => this.page.getByPlaceholder('Email Address', { exact: true })
getReviewTextField = () => this.page.getByPlaceholder('Add Review Here!')
getSubmitReviewButton = () => this.page.getByRole('button', { name: 'Submit' })
getReviewSuccessMessage = () => this.page.getByText('Thank you for your review.')

// other locators:
// getAddToCartButton = () => this.page.locator('button.btn.btn-default.cart')
// getWriteYourReviewHeader = () => this.page.locator('li.active a')
// getYourNameField = () => this.page.locator('input#name')
// getYourEmailField = () => this.page.locator('input#email')
// getReviewTextField = () => this.page.locator('textarea#review')
// getSubmitReviewButton = () => this.page.locator('#button-review')
// getReviewSuccessMessage = () => this.page.locator('#review-form .alert-success span')


async clearProductQuantityField() {
  await this.getProductQuantityField().clear()
  return this
}

async typeProductQuantityField(quantity) {
  await this.getProductQuantityField().type(quantity)
  return this
}

async clickAddToCartButton() {
  await this.getAddToCartButton().click()
  return this
}

async clickViewCartModalButton() {
  await this.getViewCartModalButton().click()
  return this
}

async typeYourNameField(name) {
  await this.getYourNameField().type(name)
  return this
}

async typeYourEmailField(email) {
  await this.getYourEmailField().type(email)
  return this
}

async typeReviewTextField(reviewText) {
  await this.getReviewTextField().type(reviewText)
  return this
}

async clickSubmitReviewButton() {
  await this.getSubmitReviewButton().click()
  return this
}
  
}

export default ProductDetailsPage