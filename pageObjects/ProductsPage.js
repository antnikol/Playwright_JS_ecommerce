import { expect } from '@playwright/test';
import BasePage from "./BasePage.js"
import ProductDetailsPage from "./ProductDetailsPage"
import CartPage from "./CartPage.js"

class ProductsPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page
}

getAllProductsHeader = () => this.page.locator('h2.title')
getAllProductsList = () => this.page.locator('.productinfo')
getAllViewProductButtons = () => this.page.locator('a[href^="/product_details/"]')
getSearchProductField = () => this.page.locator('input#search_product')
getSearchButton = () => this.page.locator('button#submit_search')
getAllProductsNames = () => this.page.locator('.overlay-content p')
getAllProductsPrices = () => this.page.locator('.overlay-content h2')
getAllSingleProductsSection = () => this.page.locator('.single-products')
getContinueShoppingButton = () => this.page.locator('button[data-dismiss="modal"]')
getViewCartModalButton = () => this.page.locator('.modal-body a[href="/view_cart"]')
getAllAddToCartButtons = () => this.page.locator('a[data-product-id]')
getBrandPageSectionHeading = () => this.page.locator('div.features_items h2.title')

getFirstProductItem = () => this.page.locator('.choose').eq(0)


static counterClickFirstProductAddToCartButton = 0


async clickFirstViewProductButton() {
  await this.getAllViewProductButtons().first().click()
  return new ProductDetailsPage(this.page)
}

async typeSearchProductField(searchWords) {
  await this.getSearchProductField().type(searchWords)
  return this
}

async clickSearchButton() {
  await this.getSearchButton().click()
  return this
}

async checkSearchedProductsNames(searchWords) {
  const elements = await this.getAllProductsNames().all();
  for (const element of elements) {
    const text = await element.innerText();
    expect(text).toMatch(new RegExp(searchWords, 'i'));
  }
  return this;
}

async takeFirstProductPrice() {
  return await this.getAllProductsPrices().first().innerText()
}

async returnFirstProductPriceOnlyNumber() {
  return await this.getAllProductsPrices().first().innerText()
}

async getFirstProductName() {
  return await this.getAllProductsNames().first().innerText() 
} 

clickFirstProductAddToCartButton() {
  this.getAllSingleProductsSection().first().scrollIntoView()
  .realHover().find('.product-overlay a.btn')
  .click({ animationDistanceThreshold: 40 })
  this.counterClickFirstProductAddToCartButton += 1
  return this
}

async clickContinueShoppingButton() {
  await this.getContinueShoppingButton().click()
  return this
}

async clickSecondProductAddToCartButton() {
  const button = await this.getAllSingleProductsSection().nth(1).locator('.product-overlay a.btn');
  await button.scrollIntoViewIfNeeded().click({ force: true });
  return this;
}


async returnSecondProductPriceAllText() {
  const text = await this.getAllProductsPrices().nth(1).innerText();
  return text.trim();
}


async returnSecondProductPriceOnlyNumber() {
  const text = await this.getAllProductsPrices().nth(1).innerText();
  return parseFloat(text.slice(4));
}


async returnSecondProductName() {
  const text = await this.getAllProductsNames().nth(1).innerText();
  return text.trim();
}


async clickViewCartModalButton() {
  await this.getViewCartModalButton().click()
  return new CartPage(this.page)
}

resetCounterClickFirstProductAddToCartButton() {
  this.counterClickFirstProductAddToCartButton = 0
  return this
}

takeCounterClickFirstProductAddToCartButton() {
  return this.counterClickFirstProductAddToCartButton;
}

async clickAllProductsAddToCartButton() {
  const buttons = await this.getAllAddToCartButtons();
  for (const button of buttons) {
    await button.click({ force: true });
    await this.getContinueShoppingButton().click();
  }
  return this;
}

}

export default ProductsPage;