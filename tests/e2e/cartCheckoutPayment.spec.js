import { test } from '../../support/globalHooks'
import { expect } from '@playwright/test';

import genData from "../../fixtures/genData"
import jsonData from '../../fixtures/api.json' assert { type: "json" }
import text from "../../fixtures/text.json" assert { type: "json" }
import HomePage from '../../pageObjects/HomaPage'
import ProductsPage from '../../pageObjects/ProductsPage'
import CartPage from '../../pageObjects/CartPage'
import ProductDetailsPage from '../../pageObjects/ProductDetailsPage'
import CheckoutPage from '../../pageObjects/CheckoutPage'
import PaymentPage from '../../pageObjects/PaymentPage'
import PaymentDonePage from '../../pageObjects/PaymentDonePage.cy'

const homePage = new HomePage(page)
const productsPage = new ProductsPage(page)
const cartPage = new CartPage(page)
const productDetailsPage = new ProductDetailsPage(page)
const checkoutPage = new CheckoutPage(page)
const paymentPage = new PaymentPage(page)
const paymentDonePage = new PaymentDonePage(page)

const product = genData.newProductTestData()
const { user } = jsonData

test.describe('Tests for the sections: Cart, Checkout, Payment', ()=> {

  test('Test Case 12: Hover and click "Add to cart" button for two different products with different quantity', async ({ page }) => {
    homePage.clickProductsHeaderButton()
    productsPage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    productsPage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
    productsPage
      .resetCounterClickFirstProductAddToCartButton()
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickSecondProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 2)
    cartPage.getFirstProductQuantity().should('have.text', productsPage.takeCounterClickFirstProductAddToCartButton())
    cartPage.getLastProductQuantity().should('have.text', '1')

    cy.log('Checking that multiply quantity by price function in Cart works correctly for both items')
    cartPage.calculateFirstProductTotalPrice().then((totalPrice) => {
      cartPage.getFirstProductTotalPriceNumber().should('equal', totalPrice)
    })
    cartPage.calculateLastProductTotalPrice().then((totalPrice) => {
      cartPage.getLastProductTotalPriceNumber().should('equal', totalPrice)
    })

    cy.log('Checking that the name, price of the product in the cart matches the previously added one')
    cy.get('@firstProductName').then((firstProductName) => {
      cartPage.getFirstProductName().should('have.text', firstProductName)
    })
    cy.get('@firstProductPrice').then((firstProductPrice) => {
      cartPage.getFirstProductPrice().should('have.text', firstProductPrice)
    })
  })

  test('Test Case 13: Verify product quantity in Cart by add from "Product details page"', async ({ page }) => {
    homePage.clickProductsHeaderButton()
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getProductInformationSection().should('be.visible')
    productDetailsPage
      .clearProductQuantityField()
      .typeProductQuantityField(product.quantity)
      .clickAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1)
    cartPage.getProductQuantityList().should('have.text', product.quantity)
  }) 

  test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1)
    cartPage.getPageUrl().should('include', text.cartPage.pageUrl)
    cartPage.getPageTitle().should('equal', text.cartPage.pageTitle)
    cartPage.getActiveBreadcrumbs().should('have.text', text.cartPage.breadCrumbs)
    cartPage.clickDeleteProductFromCartButton()
    cartPage.getEmptyCardSection().should('contain', text.cartPage.cardIsEmpty)
  })

  test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    homePage.scrollToCarouselRecommendedItems()
    homePage.getCarouselRecommendedItemName(product.randomCarouselProductNumber)
      .then((name) => { cy.wrap(name).as('productName') })
    homePage
      .clickCarouselRecommendedItemAddToCartButton(product.randomCarouselProductNumber)
      .clickViewCartModalButton()
    cartPage.getSavedVariableAs('productName').then((productName) => {
      cartPage.getFirstProductName().should('have.text', productName)
    })
  })

  test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1) 
    cartPage
      .clickProceedToCheckoutButton()
      .clickRegisterLoginModalButton()
    cy.registerUser()
    homePage.clickViewCartHeaderButton()
    cartPage.clickProceedToCheckoutButton()
    checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
    checkoutPage.getCartInfoSection().should('be.visible')
    checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
    checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
    checkoutPage.getCartProductDescription().should('have.length', 1)
    checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
    checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
    checkoutPage.scrollToCartTableSection()
    checkoutPage.getDeliveryGenderFirstNameLastName()
      .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
    checkoutPage.getDeliveryCompany().should('have.text', user.company)
    checkoutPage.getDeliveryAddress().should('have.text', user.address1)
    checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
    checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
      checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
    })
    checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
      checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
    })
    checkoutPage
      .typeCommentOrderTextField(product.commentToOrder)
      .clickPlaceOrderButton()
    paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
    paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
    paymentPage.getPaymentInformation().should('be.visible')
    paymentPage
      .typeNameOnCardTextField(user.name, user.lastname)
      .typeCardNumberTextField(text.userCardNumber[0])
      .typeCardCvvTextField(text.userCardCvv[0])
      .typeCardExpiryMonthTextField(text.userCardExMonth[0])
      .typeCardExpiryYearTextField(text.userCardExYear[0])
      .clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
    paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
  })

  test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
    cy.registerUser()
    homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1) 
    cartPage
      .clickProceedToCheckoutButton()
    checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
    checkoutPage.getCartInfoSection().should('be.visible')
    checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
    checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
    checkoutPage.getCartProductDescription().should('have.length', 1)
    checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
    checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
    checkoutPage.scrollToCartTableSection()
    checkoutPage.getDeliveryGenderFirstNameLastName()
      .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
    checkoutPage.getDeliveryCompany().should('have.text', user.company)
    checkoutPage.getDeliveryAddress().should('have.text', user.address1)
    checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
    checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
      checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
    })
    checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
      checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
    })
    checkoutPage
      .typeCommentOrderTextField(product.commentToOrder)
      .clickPlaceOrderButton()
    paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
    paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
    paymentPage.getPaymentInformation().should('be.visible')
    paymentPage
      .typeNameOnCardTextField(user.name, user.lastname)
      .typeCardNumberTextField(text.userCardNumber[0])
      .typeCardCvvTextField(text.userCardCvv[0])
      .typeCardExpiryMonthTextField(text.userCardExMonth[0])
      .typeCardExpiryYearTextField(text.userCardExYear[0])
      .clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
    paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
  })

  test('Test Case 16 + 23: Place Order: Login before Checkout + Verify address details in checkout', async ({ page }) => {
    cy.loginUser()
    homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1) 
    cartPage
      .clickProceedToCheckoutButton()
    checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
    checkoutPage.getCartInfoSection().should('be.visible')
    checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
    checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
    checkoutPage.getCartProductDescription().should('have.length', 1)
    checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
    checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
    checkoutPage.scrollToCartTableSection()
    checkoutPage.getDeliveryGenderFirstNameLastName()
      .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
    checkoutPage.getDeliveryCompany().should('have.text', user.company)
    checkoutPage.getDeliveryAddress().should('have.text', user.address1)
    checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
    checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
      checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
    })
    checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
      checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
    })
    checkoutPage
      .typeCommentOrderTextField(product.commentToOrder)
      .clickPlaceOrderButton()
    paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
    paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
    paymentPage.getPaymentInformation().should('be.visible')
    paymentPage
      .typeNameOnCardTextField(user.name, user.lastname)
      .typeCardNumberTextField(text.userCardNumber[0])
      .typeCardCvvTextField(text.userCardCvv[0])
      .typeCardExpiryMonthTextField(text.userCardExMonth[0])
      .typeCardExpiryYearTextField(text.userCardExYear[0])
      .clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
    paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
  })

  test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
    cy.loginUser()
    homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1) 
    cartPage
      .clickProceedToCheckoutButton()
    checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
    checkoutPage.getCartInfoSection().should('be.visible')
    checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
    checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
    checkoutPage.getCartProductDescription().should('have.length', 1)
    checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
    checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
    checkoutPage.scrollToCartTableSection()
    checkoutPage.getDeliveryGenderFirstNameLastName()
      .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
    checkoutPage.getDeliveryCompany().should('have.text', user.company)
    checkoutPage.getDeliveryAddress().should('have.text', user.address1)
    checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
    checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
      checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
    })
    checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
      checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
    })
    checkoutPage
      .typeCommentOrderTextField(product.commentToOrder)
      .clickPlaceOrderButton()
    paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
    paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
    paymentPage.getPaymentInformation().should('be.visible')
    paymentPage
      .typeNameOnCardTextField(user.name, user.lastname)
      .typeCardNumberTextField(text.userCardNumber[0])
      .typeCardCvvTextField(text.userCardCvv[0])
      .typeCardExpiryMonthTextField(text.userCardExMonth[0])
      .typeCardExpiryYearTextField(text.userCardExYear[0])
      .clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
    paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)

    cy.intercept('GET', '/download_invoice/*').as('downloadInvoice')
    paymentDonePage.clickDownloadInvoiceButton()
    cy.watest('@downloadInvoice').its('response.statusCode').should('eq', 200)
    paymentDonePage.clickContinuePlacedOrderButton()
    homePage.clickDeleteAccountButton()
    homePage.getAccountDeletedConfirmMessage().should('contain', text.homePage.accountDeleted)
  })
})