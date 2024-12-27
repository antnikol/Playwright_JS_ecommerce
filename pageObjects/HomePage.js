import BasePage from "./BasePage";
import CartPage from "./CartPage";

class HomePage extends BasePage {

constructor(page) {
  super(page)
  this.page = page;
}

getSliderSection = () => this.page.locator('section[id="slider"]')
getLeftSideBar = () => this.page.locator('.left-sidebar')
getFeaturesItemsSection = () => this.page.locator('.features_items')
getPageTitle = () => this.page.title()
getAllAddToCartButtons = () => this.page.locator('a[data-product-id]')
getViewCartModalButton = () => this.page.locator('.modal-body a[href="/view_cart"]')
getSliderCarouselSection = () => this.page.locator('#slider-carousel div.carousel-inner')
getRecommendedItemCarouselSection = () => this.page.locator('#recommended-item-carousel div.carousel-inner')
getRecommendedItemCarouselSectionActive = () => this.page.locator('#recommended-item-carousel .item.active')
getCarouselRecommendedItemNamesList = () => this.page.locator('#recommended-item-carousel .item.active p')
getCarouselRecommendedItemAddToCartButtonssList = () => this.page.locator('#recommended-item-carousel .item.active a.add-to-cart')
getAllProductsNames = () => this.page.locator('.overlay-content p')
getAllProductsPrices = () => this.page.locator('.overlay-content h2')

async clickFirstProductAddToCartButton() {
  await this.getAllAddToCartButtons().first().click({force:true})
  return this
}

async clickViewCartModalButton() {
  await this.getViewCartModalButton().click()
  return new CartPage(this.page)
}

async clickAddToCartRecommendedItemCarousel(itemNumber) {
  await this.getRecommendedItemCarouselSectionActive().nth(itemNumber).click()
  return new CartPage(this.page)
}

async getCarouselRecommendedItemName(randomCarouselNumber) {
  return (await this.getCarouselRecommendedItemNamesList().nth(randomCarouselNumber).innerText())
}

async clickCarouselRecommendedItemAddToCartButton(randomCarouselNumber) {
  await this.getCarouselRecommendedItemAddToCartButtonssList().nth(randomCarouselNumber).click()
  return this
}

async scrollToCarouselRecommendedItems() {
  await this.getRecommendedItemCarouselSection().scrollIntoViewIfNeeded({ behavior: 'smooth' });
  return this;
}

async getFirstProductName() {
  return (await this.getAllProductsNames().first().innerText()).trim()
} 

async takeFirstProductPrice() {
  return (await this.getAllProductsPrices().first().innerText()).trim()
}

}

export default HomePage;