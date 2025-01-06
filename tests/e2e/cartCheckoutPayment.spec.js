import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test';

import { newProductTestData } from '../../fixtures/genData.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }
import { registerUser, loginUser, loguotUser, registerUserFromLoginPage, deleteUser, deleteUserByAPI, deleteUserAfterRegistration } from '../../support/commands.js'


const product = newProductTestData()
const { user, registeredUser } = jsonData

test.describe('Tests for the sections: Cart, Checkout, Payment', ()=> {

  test('Test Case 12: Hover and click "Add to cart" button for two different products with different quantity', async ({ homePage, productsPage, cartPage }) => {
    await homePage.clickProductsHeaderButton()
    const firstProductName = await productsPage.getFirstProductName()
    const firstProductPrice = await productsPage.getFirstProductPrice()
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

    //'Checking that multiply quantity by price function in Cart works correctly for both items'
    const totalPriceFirst = await cartPage.calculateFirstProductTotalPrice()
    await expect(await cartPage.getFirstProductTotalPriceNumber()).toBe(totalPriceFirst)
    const totalPriceLast = await cartPage.calculateLastProductTotalPrice()
    await expect(await cartPage.getLastProductTotalPriceNumber()).toBe(totalPriceLast)

    //'Checking that the name, price of the product in the cart matches the previously added one'
    await expect(await cartPage.getFirstProductName()).toHaveText(firstProductName)
    await expect(await cartPage.getFirstProductPrice()).toHaveText(firstProductPrice)
  })

  test('Test Case 13: Verify product quantity in Cart by add from "Product details page"', async ({ homePage, productsPage, productDetailsPage, cartPage  }) => {
    await homePage.clickProductsHeaderButton()
    await productsPage.clickFirstViewProductButton()
    await expect(await productDetailsPage.getProductInformationSection()).toBeVisible()
    await productDetailsPage.clearProductQuantityField()
    await productDetailsPage.typeProductQuantityField(`${product.productQuantity}`)
    await productDetailsPage.clickAddToCartButton()
    await productDetailsPage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1)
    await expect(await cartPage.getProductQuantityList()).toHaveText(String(product.productQuantity))
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
    const productName = await homePage.getCarouselRecommendedItemName(product.carouselProductNumber)
    await homePage.clickCarouselRecommendedItemAddToCartButton(product.carouselProductNumber)
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getFirstProductName()).toHaveText(productName)
  })

  test('Test Case 14: Place Order: Register while Checkout', async ({ page, homePage, cartPage, checkoutPage, paymentPage, paymentDonePage }) => {
    const userEmail = product.userEmail
    const firstProductName = await homePage.getFirstProductName()
    const firstProductPrice = await homePage.getFirstProductPrice()
    // await deleteUser(page)
    await homePage.clickFirstProductAddToCartButton()
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1) 
    await cartPage.clickProceedToCheckoutButton()
    await cartPage.clickRegisterLoginModalButton()
    await registerUser(page, userEmail)
    await homePage.clickViewCartHeaderButton()
    await cartPage.clickProceedToCheckoutButton()
    await expect(await checkoutPage.getActiveBreadcrumbs()).toHaveText(text.checkoutPage.breadCrumbs)
    await expect(await checkoutPage.getCartInfoSection()).toBeVisible()
    await expect(await checkoutPage.getPageTitle()).toBe(text.checkoutPage.pageTitle)
    await expect(await checkoutPage.getPageUrl()).toContain(text.checkoutPage.pageUrl)
    await expect(await checkoutPage.getCartProductDescription()).toHaveCount(1)
    await expect(await checkoutPage.getAddressDeliverySectionHeading()).toContain(text.checkoutPage.deliveryAddress)
    await expect(await checkoutPage.getAddressBillingSectionHeading()).toContain(text.checkoutPage.billingAddress)
    await checkoutPage.scrollToCartTableSection()
    await expect(await checkoutPage.getDeliveryGenderFirstNameLastName()).toContain(`${user.title}. ${user.firstname} ${user.lastname}`)
    await expect(await checkoutPage.getDeliveryCompany()).toHaveText(user.company)
    await expect(await checkoutPage.getDeliveryAddress()).toHaveText(user.address1)
    await expect(await checkoutPage.getDeliveryAddress2()).toHaveText(user.address2)
    await expect(await checkoutPage.getAllCartProductNameList()).toHaveText(firstProductName)
    await expect(await checkoutPage.getAllCartProductPriceList()).toHaveText(firstProductPrice)
    await checkoutPage.typeCommentOrderTextField(product.commentToOrder)
    await checkoutPage.clickPlaceOrderButton()
    await expect(await paymentPage.getActiveBreadcrumbs()).toHaveText(text.paymentPage.breadCrumbs)
    await expect(await paymentPage.getHeadingOfSection()).toHaveText(text.paymentPage.sectionHeading)
    await expect(await paymentPage.getPaymentInformation()).toBeVisible()
    await paymentPage.typeNameOnCardTextField(user.name, user.lastname)
    await paymentPage.typeCardNumberTextField(text.userCardNumber[0])
    await paymentPage.typeCardCvvTextField(text.userCardCvv[0])
    await paymentPage.typeCardExpiryMonthTextField(text.userCardExMonth[0])
    await paymentPage.typeCardExpiryYearTextField(text.userCardExYear[0])
    await paymentPage.clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    await expect(await paymentDonePage.getOrderPlacedHeading()).toHaveText(text.paymentDonePage.orderPlacedHeading)
    await expect(await paymentDonePage.getOrderPlacedMessage()).toHaveText(text.paymentDonePage.orderPlacedMessage)
    await deleteUserAfterRegistration(page, userEmail)
  })

  test('Test Case 15: Place Order: Register before Checkout', async ({ page, homePage, cartPage, checkoutPage, paymentPage, paymentDonePage }) => {
    const userEmail = product.userEmail
    const firstProductName = await homePage.getFirstProductName()
    const firstProductPrice = await homePage.getFirstProductPrice()
    await registerUser(page, userEmail)
    await homePage.clickFirstProductAddToCartButton()
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1) 
    await cartPage.clickProceedToCheckoutButton()
    await expect(await checkoutPage.getActiveBreadcrumbs()).toHaveText(text.checkoutPage.breadCrumbs)
    await expect(await checkoutPage.getCartInfoSection()).toBeVisible()
    await expect(await checkoutPage.getPageTitle()).toBe(text.checkoutPage.pageTitle)
    await expect(await checkoutPage.getPageUrl()).toContain(text.checkoutPage.pageUrl)
    await expect(await checkoutPage.getCartProductDescription()).toHaveCount(1)
    await expect(await checkoutPage.getAddressDeliverySectionHeading()).toContain(text.checkoutPage.deliveryAddress)
    await expect(await checkoutPage.getAddressBillingSectionHeading()).toContain(text.checkoutPage.billingAddress)
    await checkoutPage.scrollToCartTableSection()
    await expect(await checkoutPage.getDeliveryGenderFirstNameLastName()).toContain(`${user.title}. ${user.firstname} ${user.lastname}`)
    await expect(await checkoutPage.getDeliveryCompany()).toHaveText(user.company)
    await expect(await checkoutPage.getDeliveryAddress()).toHaveText(user.address1)
    await expect(await checkoutPage.getDeliveryAddress2()).toHaveText( user.address2)
    await expect(await checkoutPage.getAllCartProductNameList()).toHaveText(firstProductName)
    await expect(await checkoutPage.getAllCartProductPriceList()).toHaveText(firstProductPrice)
    await checkoutPage.typeCommentOrderTextField(product.commentToOrder)
    await checkoutPage.clickPlaceOrderButton()
    await expect(await paymentPage.getActiveBreadcrumbs()).toHaveText(text.paymentPage.breadCrumbs)
    await expect(await paymentPage.getHeadingOfSection()).toHaveText(text.paymentPage.sectionHeading)
    await expect(await paymentPage.getPaymentInformation()).toBeVisible()
    await paymentPage.typeNameOnCardTextField(user.name, user.lastname)
    await paymentPage.typeCardNumberTextField(text.userCardNumber[0])
    await paymentPage.typeCardCvvTextField(text.userCardCvv[0])
    await paymentPage.typeCardExpiryMonthTextField(text.userCardExMonth[0])
    await paymentPage.typeCardExpiryYearTextField(text.userCardExYear[0])
    await paymentPage.clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    await expect(await paymentDonePage.getOrderPlacedHeading()).toHaveText(text.paymentDonePage.orderPlacedHeading)
    await expect(await paymentDonePage.getOrderPlacedMessage()).toHaveText(text.paymentDonePage.orderPlacedMessage)
    await deleteUserAfterRegistration(page, userEmail)
  })

  test('Test Case 16 + 23: Place Order: Login before Checkout + Verify address details in checkout', async ({ page, homePage, cartPage, checkoutPage, paymentPage, paymentDonePage }) => {
    await loginUser(page, registeredUser.email, registeredUser.password)
    const firstProductName = await homePage.getFirstProductName()
    const firstProductPrice = await homePage.getFirstProductPrice()
    await homePage.clickFirstProductAddToCartButton()
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1) 
    await cartPage.clickProceedToCheckoutButton()
    await expect(await checkoutPage.getActiveBreadcrumbs()).toHaveText(text.checkoutPage.breadCrumbs)
    await expect(await checkoutPage.getCartInfoSection()).toBeVisible()
    await expect(await checkoutPage.getPageTitle()).toBe(text.checkoutPage.pageTitle)
    await expect(await checkoutPage.getPageUrl()).toContain(text.checkoutPage.pageUrl)
    await expect(await checkoutPage.getCartProductDescription()).toHaveCount(1)
    await expect(await checkoutPage.getAddressDeliverySectionHeading()).toContain(text.checkoutPage.deliveryAddress)
    await expect(await checkoutPage.getAddressBillingSectionHeading()).toContain(text.checkoutPage.billingAddress)
    await checkoutPage.scrollToCartTableSection()
    await expect(await checkoutPage.getDeliveryGenderFirstNameLastName()).toContain(`${registeredUser.title}. ${registeredUser.firstname} ${registeredUser.lastname}`)
    await expect(await checkoutPage.getDeliveryCompany()).toHaveText(registeredUser.company)
    await expect(await checkoutPage.getDeliveryAddress()).toHaveText(registeredUser.address1)
    await expect(await checkoutPage.getDeliveryAddress2()).toHaveText(registeredUser.address2)
    await expect(await checkoutPage.getAllCartProductNameList()).toHaveText(firstProductName)
    await expect(await checkoutPage.getAllCartProductPriceList()).toHaveText(firstProductPrice)
    await checkoutPage.typeCommentOrderTextField(product.commentToOrder)
    await checkoutPage.clickPlaceOrderButton()
    await expect(await paymentPage.getActiveBreadcrumbs()).toHaveText(text.paymentPage.breadCrumbs)
    await expect(await paymentPage.getHeadingOfSection()).toHaveText(text.paymentPage.sectionHeading)
    await expect(await paymentPage.getPaymentInformation()).toBeVisible()
    await paymentPage.typeNameOnCardTextField(registeredUser.name, registeredUser.lastname)
    await paymentPage.typeCardNumberTextField(text.userCardNumber[0])
    await paymentPage.typeCardCvvTextField(text.userCardCvv[0])
    await paymentPage.typeCardExpiryMonthTextField(text.userCardExMonth[0])
    await paymentPage.typeCardExpiryYearTextField(text.userCardExYear[0])
    await paymentPage.clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    await expect(await paymentDonePage.getOrderPlacedHeading()).toHaveText(text.paymentDonePage.orderPlacedHeading)
    await expect(await paymentDonePage.getOrderPlacedMessage()).toHaveText(text.paymentDonePage.orderPlacedMessage)
    await loguotUser(page)
  })

  test.setTimeout(180000)
  test('Test Case 24: Download Invoice after purchase order', async ({ page, homePage, cartPage, checkoutPage, paymentPage, paymentDonePage }) => {
    await deleteUser(page)
    const firstProductName = await homePage.getFirstProductName()
    const firstProductPrice = await homePage.getFirstProductPrice()
    await homePage.clickFirstProductAddToCartButton()
    await homePage.clickViewCartModalButton()
    await expect(await cartPage.getCartProductsList()).toHaveCount(1) 
    await cartPage.clickProceedToCheckoutButton()
    await cartPage.clickRegisterLoginModalButton()
    await registerUserFromLoginPage(page, product.userEmail)
    await homePage.clickViewCartHeaderButton()
    await cartPage.clickProceedToCheckoutButton()
    await expect(await checkoutPage.getActiveBreadcrumbs()).toHaveText(text.checkoutPage.breadCrumbs)
    await expect(await checkoutPage.getCartInfoSection()).toBeVisible()
    await expect(await checkoutPage.getPageTitle()).toBe(text.checkoutPage.pageTitle)
    await expect(await checkoutPage.getPageUrl()).toContain(text.checkoutPage.pageUrl)
    await expect(await checkoutPage.getCartProductDescription()).toHaveCount(1)
    await expect(await checkoutPage.getAddressDeliverySectionHeading()).toContain(text.checkoutPage.deliveryAddress)
    await expect(await checkoutPage.getAddressBillingSectionHeading()).toContain(text.checkoutPage.billingAddress)
    await checkoutPage.scrollToCartTableSection()
    await expect(await checkoutPage.getDeliveryGenderFirstNameLastName()).toContain(`${user.title}. ${user.firstname} ${user.lastname}`)
    await expect(await checkoutPage.getDeliveryCompany()).toHaveText(user.company)
    await expect(await checkoutPage.getDeliveryAddress()).toHaveText(user.address1)
    await expect(await checkoutPage.getDeliveryAddress2()).toHaveText(user.address2)
    await expect(await checkoutPage.getAllCartProductNameList()).toHaveText(firstProductName)
    await expect(await checkoutPage.getAllCartProductPriceList()).toHaveText(firstProductPrice)
    await checkoutPage.typeCommentOrderTextField(product.commentToOrder)
    await checkoutPage.clickPlaceOrderButton()
    await expect(await paymentPage.getActiveBreadcrumbs()).toHaveText(text.paymentPage.breadCrumbs)
    await expect(await paymentPage.getHeadingOfSection()).toHaveText(text.paymentPage.sectionHeading)
    await expect(await paymentPage.getPaymentInformation()).toBeVisible()
    await paymentPage.typeNameOnCardTextField(user.name, user.lastname)
    await paymentPage.typeCardNumberTextField(text.userCardNumber[0])
    await paymentPage.typeCardCvvTextField(text.userCardCvv[0])
    await paymentPage.typeCardExpiryMonthTextField(text.userCardExMonth[0])
    await paymentPage.typeCardExpiryYearTextField(text.userCardExYear[0])
    await paymentPage.clickPayAndConfirmOrderButton()
    // paymentPage.getSuccessOrderMessage().should('include.text', text.paymentPage.successOrderMessage)
    await expect(await paymentDonePage.getOrderPlacedHeading()).toHaveText(text.paymentDonePage.orderPlacedHeading)
    await expect(await paymentDonePage.getOrderPlacedMessage()).toHaveText(text.paymentDonePage.orderPlacedMessage)

    // cy.intercept('GET', '/download_invoice/*').as('downloadInvoice')
    // paymentDonePage.clickDownloadInvoiceButton()
    // cy.watest('@downloadInvoice').its('response.statusCode').should('eq', 200)
    // paymentDonePage.clickContinuePlacedOrderButton()
    // homePage.clickDeleteAccountButton()
    // homePage.getAccountDeletedConfirmMessage().toContain(text.homePage.accountDeleted)

    await page.route('**/download_invoice/*', (route) => { 
      console.log('Intercepted request:', route.request().url());
      route.continue();
    })
    const [response] = await Promise.all([
      page.waitForResponse((response) =>
        response.url().includes('/download_invoice/') && response.status() === 200
      ),
      paymentDonePage.clickDownloadInvoiceButton(),
    ])
    expect(response.status()).toBe(200)
    
    await paymentDonePage.clickContinuePlacedOrderButton()
    await homePage.clickDeleteAccountButton()
    await expect(await homePage.getAccountDeletedConfirmMessageText()).toContain(text.homePage.accountDeleted);
  })
})