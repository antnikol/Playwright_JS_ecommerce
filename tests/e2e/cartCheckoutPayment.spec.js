import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test';

import { newProductTestData } from '../../fixtures/genData.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }


const product = newProductTestData()
const { user } = jsonData

test.describe('Tests for the sections: Cart, Checkout, Payment', ()=> {

  test('Test Case 12: Hover and click "Add to cart" button for two different products with different quantity', async ({ homePage, productsPage, cartPage }) => {
    await homePage.clickProductsHeaderButton()
    const firstProductName = await productsPage.getFirstProductName()
    const firstProductPrice = await productsPage.takeFirstProductPrice()
    await productsPage.resetCounterClickFirstProductAddToCartButton()
    await productsPage.clickFirstProductAddToCartButton()
    await productsPage.clickContinueShoppingButton()
    await productsPage.clickFirstProductAddToCartButton()
    await productsPage.clickContinueShoppingButton()
    await productsPage.clickSecondProductAddToCartButton()
    await productsPage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList().count()).toBe(2)
    await expect(await cartPage.getFirstProductQuantity()).toBe(String(await productsPage.takeCounterClickFirstProductAddToCartButton()))
    await expect(await cartPage.getLastProductQuantity()).toHaveText('1')

    console.log('Checking that multiply quantity by price function in Cart works correctly for both items')
    const totalPriceFirst = await cartPage.calculateFirstProductTotalPrice()
    await expect(await cartPage.getFirstProductTotalPriceNumber()).toBe(totalPriceFirst)
    const totalPriceLast = await cartPage.calculateLastProductTotalPrice()
    await expect(await cartPage.getLastProductTotalPriceNumber()).toBe(totalPriceLast)

    console.log('Checking that the name, price of the product in the cart matches the previously added one')
    await expect(await cartPage.getFirstProductName()).toHaveText(firstProductName)
    await expect(await cartPage.getFirstProductPrice()).toHaveText(firstProductPrice)
  })

  test('Test Case 13: Verify product quantity in Cart by add from "Product details page"', async ({ homePage, productsPage, productDetailsPage, cartPage  }) => {
    await homePage.clickProductsHeaderButton()
    await productsPage.clickFirstViewProductButton()
    await expect(await productDetailsPage.getProductInformationSection()).toBeVisible()
    await productDetailsPage.clearProductQuantityField()
    await productDetailsPage.typeProductQuantityField(`${product.quantity}`)
    await productDetailsPage.clickAddToCartButton()
    await productDetailsPage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1)
    await expect(await cartPage.getProductQuantityList()).toHaveText(String(product.quantity))
  }) 

  test('Test Case 17: Remove Products From Cart', async ({ homePage, cartPage }) => {
    await homePage.clickFirstProductAddToCartButton()
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1)
    await expect(await cartPage.getPageUrl()).toContain(text.cartPage.pageUrl)
    await expect(await cartPage.getPageTitle()).toBe(text.cartPage.pageTitle)
    await expect(await cartPage.getActiveBreadcrumbs()).toHaveText(text.cartPage.breadCrumbs)
    await cartPage.clickDeleteProductFromCartButton()
    await expect(await cartPage.getEmptyCardSectionText()).toContain(text.cartPage.cardIsEmpty)
  })

  test('Test Case 22: Add to cart from Recommended items', async ({ homePage, cartPage }) => {
    await homePage.scrollToCarouselRecommendedItems()
    const productName = await homePage.getCarouselRecommendedItemName(product.randomCarouselProductNumber)
    await homePage.clickCarouselRecommendedItemAddToCartButton(product.randomCarouselProductNumber)
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getFirstProductName()).toHaveText(productName)
  })

//   test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
//     homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
//     homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
//     homePage
//       .clickFirstProductAddToCartButton()
//       .clickViewCartModalButton()
//     cartPage.getCartProductsList().should('have.length', 1) 
//     cartPage
//       .clickProceedToCheckoutButton()
//       .clickRegisterLoginModalButton()
//     cy.registerUser()
//     homePage.clickViewCartHeaderButton()
//     cartPage.clickProceedToCheckoutButton()
//     checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
//     checkoutPage.getCartInfoSection().should('be.visible')
//     checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
//     checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
//     checkoutPage.getCartProductDescription().should('have.length', 1)
//     checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
//     checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
//     checkoutPage.scrollToCartTableSection()
//     checkoutPage.getDeliveryGenderFirstNameLastName()
//       .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
//     checkoutPage.getDeliveryCompany().should('have.text', user.company)
//     checkoutPage.getDeliveryAddress().should('have.text', user.address1)
//     checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
//     checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
//       checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
//     })
//     checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
//       checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
//     })
//     checkoutPage
//       .typeCommentOrderTextField(product.commentToOrder)
//       .clickPlaceOrderButton()
//     paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
//     paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
//     paymentPage.getPaymentInformation().should('be.visible')
//     paymentPage
//       .typeNameOnCardTextField(user.name, user.lastname)
//       .typeCardNumberTextField(text.userCardNumber[0])
//       .typeCardCvvTextField(text.userCardCvv[0])
//       .typeCardExpiryMonthTextField(text.userCardExMonth[0])
//       .typeCardExpiryYearTextField(text.userCardExYear[0])
//       .clickPayAndConfirmOrderButton()
//     // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
//     paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
//     paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
//   })

//   test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
//     cy.registerUser()
//     homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
//     homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
//     homePage
//       .clickFirstProductAddToCartButton()
//       .clickViewCartModalButton()
//     cartPage.getCartProductsList().should('have.length', 1) 
//     cartPage
//       .clickProceedToCheckoutButton()
//     checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
//     checkoutPage.getCartInfoSection().should('be.visible')
//     checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
//     checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
//     checkoutPage.getCartProductDescription().should('have.length', 1)
//     checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
//     checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
//     checkoutPage.scrollToCartTableSection()
//     checkoutPage.getDeliveryGenderFirstNameLastName()
//       .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
//     checkoutPage.getDeliveryCompany().should('have.text', user.company)
//     checkoutPage.getDeliveryAddress().should('have.text', user.address1)
//     checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
//     checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
//       checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
//     })
//     checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
//       checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
//     })
//     checkoutPage
//       .typeCommentOrderTextField(product.commentToOrder)
//       .clickPlaceOrderButton()
//     paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
//     paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
//     paymentPage.getPaymentInformation().should('be.visible')
//     paymentPage
//       .typeNameOnCardTextField(user.name, user.lastname)
//       .typeCardNumberTextField(text.userCardNumber[0])
//       .typeCardCvvTextField(text.userCardCvv[0])
//       .typeCardExpiryMonthTextField(text.userCardExMonth[0])
//       .typeCardExpiryYearTextField(text.userCardExYear[0])
//       .clickPayAndConfirmOrderButton()
//     // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
//     paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
//     paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
//   })

//   test('Test Case 16 + 23: Place Order: Login before Checkout + Verify address details in checkout', async ({ page }) => {
//     cy.loginUser()
//     homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
//     homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
//     homePage
//       .clickFirstProductAddToCartButton()
//       .clickViewCartModalButton()
//     cartPage.getCartProductsList().should('have.length', 1) 
//     cartPage
//       .clickProceedToCheckoutButton()
//     checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
//     checkoutPage.getCartInfoSection().should('be.visible')
//     checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
//     checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
//     checkoutPage.getCartProductDescription().should('have.length', 1)
//     checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
//     checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
//     checkoutPage.scrollToCartTableSection()
//     checkoutPage.getDeliveryGenderFirstNameLastName()
//       .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
//     checkoutPage.getDeliveryCompany().should('have.text', user.company)
//     checkoutPage.getDeliveryAddress().should('have.text', user.address1)
//     checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
//     checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
//       checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
//     })
//     checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
//       checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
//     })
//     checkoutPage
//       .typeCommentOrderTextField(product.commentToOrder)
//       .clickPlaceOrderButton()
//     paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
//     paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
//     paymentPage.getPaymentInformation().should('be.visible')
//     paymentPage
//       .typeNameOnCardTextField(user.name, user.lastname)
//       .typeCardNumberTextField(text.userCardNumber[0])
//       .typeCardCvvTextField(text.userCardCvv[0])
//       .typeCardExpiryMonthTextField(text.userCardExMonth[0])
//       .typeCardExpiryYearTextField(text.userCardExYear[0])
//       .clickPayAndConfirmOrderButton()
//     // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
//     paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
//     paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)
//   })

//   test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
//     cy.loginUser()
//     homePage.getFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
//     homePage.takeFirstProductPrice().then((price) => { cy.wrap(price).as('firstProductPrice') })
//     homePage
//       .clickFirstProductAddToCartButton()
//       .clickViewCartModalButton()
//     cartPage.getCartProductsList().should('have.length', 1) 
//     cartPage
//       .clickProceedToCheckoutButton()
//     checkoutPage.getActiveBreadcrumbs().should('have.text', text.checkoutPage.breadCrumbs)
//     checkoutPage.getCartInfoSection().should('be.visible')
//     checkoutPage.getPageTitle().should('equal', text.checkoutPage.pageTitle)
//     checkoutPage.getPageUrl().should('include', text.checkoutPage.pageUrl)
//     checkoutPage.getCartProductDescription().should('have.length', 1)
//     checkoutPage.getAddressDeliverySection().should('contain', text.checkoutPage.deliveryAddress)
//     checkoutPage.getAddressBillingSection().should('contain', text.checkoutPage.billingAddress)
//     checkoutPage.scrollToCartTableSection()
//     checkoutPage.getDeliveryGenderFirstNameLastName()
//       .should('contain', `${user.title}. ${user.firstname} ${user.lastname}`)
//     checkoutPage.getDeliveryCompany().should('have.text', user.company)
//     checkoutPage.getDeliveryAddress().should('have.text', user.address1)
//     checkoutPage.getDeliveryAddress2().should('have.text', user.address2)
//     checkoutPage.getSavedVariableAs('firstProductName').then((firstProductName) => {
//       checkoutPage.getAllCartProductNameList().should('have.text', firstProductName)
//     })
//     checkoutPage.getSavedVariableAs('firstProductPrice').then((firstProductPrice) => {
//       checkoutPage.getAllCartProductPriceList().should('have.text', firstProductPrice)
//     })
//     checkoutPage
//       .typeCommentOrderTextField(product.commentToOrder)
//       .clickPlaceOrderButton()
//     paymentPage.getActiveBreadcrumbs().should('have.text', text.paymentPage.breadCrumbs)
//     paymentPage.getHeadingOfSection().should('have.text', text.paymentPage.sectionHeading)
//     paymentPage.getPaymentInformation().should('be.visible')
//     paymentPage
//       .typeNameOnCardTextField(user.name, user.lastname)
//       .typeCardNumberTextField(text.userCardNumber[0])
//       .typeCardCvvTextField(text.userCardCvv[0])
//       .typeCardExpiryMonthTextField(text.userCardExMonth[0])
//       .typeCardExpiryYearTextField(text.userCardExYear[0])
//       .clickPayAndConfirmOrderButton()
//     // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
//     paymentDonePage.getOrderPlacedHeading().should('have.text', text.paymentDonePage.orderPlacedHeading)
//     paymentDonePage.getOrderPlacedMessage().should('have.text', text.paymentDonePage.orderPlacedMessage)

//     cy.intercept('GET', '/download_invoice/*').as('downloadInvoice')
//     paymentDonePage.clickDownloadInvoiceButton()
//     cy.watest('@downloadInvoice').its('response.statusCode').should('eq', 200)
//     paymentDonePage.clickContinuePlacedOrderButton()
//     homePage.clickDeleteAccountButton()
//     homePage.getAccountDeletedConfirmMessage().should('contain', text.homePage.accountDeleted)
//   })
})