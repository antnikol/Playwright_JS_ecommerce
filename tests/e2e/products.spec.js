import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test';
import { newProductTestData } from '../../fixtures/genData.js'
import text from "../../fixtures/text.json" assert { type: "json" }
import jsonData from '../../fixtures/api.json' assert { type: 'json' }
import { loginUser, deleteUser, loguotUser } from '../../support/commands.js';


const product = newProductTestData()
const { user, searchTerms, registeredUser } = jsonData

test.describe('Tests for the sections: Products', ()=> {

  test('Test Case 8: Verify All Products and product detail page', async ({ page, homePage, productsPage, productDetailsPage }) => {
    await homePage.clickProductsHeaderButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.allProductsHeader)
    await expect(await productsPage.countAllProductsList()).toBeGreaterThan(0)
    await productsPage.clickFirstViewProductButton()
    await expect(await productDetailsPage.getProductInformationSection()).toBeVisible()
    await expect(await productDetailsPage.getProductName()).toBeVisible()
    await expect(await productDetailsPage.getProductPrice()).toBeVisible()
    await expect(await productDetailsPage.getProductAvailability()).toBeVisible()
    await expect(await productDetailsPage.getProductCondition()).toBeVisible()
    await expect(await productDetailsPage.getProductBrand()).toBeVisible()
  })

  test('Test Case 9: Search Product', async ({ page, homePage, productsPage }) => {
    await homePage.clickProductsHeaderButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.allProductsHeader)
    await productsPage.typeSearchProductField(searchTerms[2])
    await productsPage.clickSearchButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.searchedProductsHeader)
    await productsPage.checkSearchedProductsNames(searchTerms[2])
  })

  test('Test Case 20: Search Products and Verify Cart After Login', async ({ page, homePage, productsPage, cartPage }) => {
    await homePage.clickProductsHeaderButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.allProductsHeader)
    await expect(await productsPage.getPageUrl()).toContain(text.productsPage.pageUrl)
    await productsPage.typeSearchProductField(searchTerms[2])
    await productsPage.clickSearchButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.searchedProductsHeader)
    await expect(await productsPage.getPageUrl()).toContain(text.productsPage.searchedPageUrl)
    await productsPage.checkSearchedProductsNames(searchTerms[2])
    await productsPage.clickAllProductsAddToCartButton()
    await productsPage.clickViewCartHeaderButton()
    await expect(await cartPage.getActiveBreadcrumbs()).toHaveText(text.cartPage.breadCrumbs)
    await cartPage.checkSearchedProductNamesInCart(searchTerms[2])
    await cartPage.checkSearchedProductQuantityInCart(1)

    await loginUser(page, registeredUser.email, registeredUser.password)
    await homePage.clickViewCartHeaderButton()
    await expect(await cartPage.getActiveBreadcrumbs()).toHaveText(text.cartPage.breadCrumbs)
    await cartPage.checkSearchedProductNamesInCart(searchTerms[2])
    await cartPage.checkSearchedProductQuantityInCart(1)
    await loguotUser(page, registeredUser.name)
  })

  test('Test Case 18: View Category Products', async ({ page, homePage, productsPage }) => {
    await homePage.clickLeftSidebarCategory(text.category[0])
    await homePage.clickSubCategoryRopeCategory(text.subCategoryWomen[0], text.category[0])
    await expect(await productsPage.getAllProductsHeader()).toHaveText(`${text.category[0]} - ${text.subCategoryWomen[0]} Products`)
    await expect(await productsPage.getPageTitle()).toBe(`Automation Exercise - ${text.subCategoryWomen[0]} Products`)
    await expect(await productsPage.getPageUrl()).toContain(text.productsPage.categoryPageUrl)
    await productsPage.checkSearchedProductsNames(text.subCategoryWomen[0])

    await productsPage.clickLeftSidebarCategory(text.category[1])
    await productsPage.clickSubCategoryRopeCategory(text.subCategoryMen[1], text.category[1])
    await expect(await productsPage.getAllProductsHeader()).toHaveText(`${text.category[1]} - ${text.subCategoryMen[1]} Products`)
    await expect(await productsPage.getPageTitle()).toBe(`Automation Exercise - ${text.subCategoryMen[1]} Products`)
    await expect(await productsPage.getPageUrl()).toContain(text.productsPage.categoryPageUrl)
    await productsPage.checkSearchedProductsNames(text.subCategoryMen[1])
  })

  test('Test Case 21: Add review on product', async ({ page, homePage, productsPage, productDetailsPage }) => {
    await homePage.clickProductsHeaderButton()
    await expect(await productsPage.getAllProductsHeader()).toHaveText(text.productsPage.allProductsHeader)
    await expect(await productsPage.getPageUrl()).toContain(text.productsPage.pageUrl)
    await productsPage.clickFirstViewProductButton()
    await expect(await productDetailsPage.getWriteYourReviewHeader()).toHaveText(text.productDetailsPage.writeYourReviewHeader)
    await productDetailsPage.typeYourNameField(user.name)
    await productDetailsPage.typeYourEmailField(user.email)
    await productDetailsPage.typeReviewTextField(product.productReview)
    await productDetailsPage.clickSubmitReviewButton()
    await expect(await productDetailsPage.getReviewSuccessMessage()).toBeVisible()
    await expect(await productDetailsPage.getReviewSuccessMessage()).toHaveText(text.productDetailsPage.reviewSuccessMessage)     
  })

  test('Test Case 19: View & Cart Brand Products', async ({ page, homePage, productsPage }) => {
    await homePage.clickProductsHeaderButton()
    await expect(await productsPage.getLeftSidebarBrandsHeading()).toBeVisible()
    await expect(await productsPage.getLeftSidebarBrandsHeading()).toHaveText(text.productsPage.brandsHeading)
    await expect(await productsPage.countLeftSidebarBrandsList()).toBeGreaterThan(0)
    
    //'Saving the brand name and quantity of the brand to be selected'
    let brandCount = await homePage.getLeftSidebarRandomBrandCount(product.randomLeftSidebarBrandNumber)
    let brandName = await homePage.getBrandName(product.randomLeftSidebarBrandNumber, brandCount)

    //'Verifying user is navigated to brand page and brand products are displayed according to the selection'
    await homePage.clickLeftSidebarRandomBrandName(product.randomLeftSidebarBrandNumber)
    const hrefValue = await productsPage.getLeftSidebarRandomBrandHref(product.randomLeftSidebarBrandNumber)  
    await expect(await productsPage.getPageUrl()).toContain(hrefValue.replace(/ /g, '%20')) 
    await expect(await productsPage.getBrandPageSectionHeading()).toHaveText(`Brand - ${brandName} Products`)
    await expect(await productsPage.getAllSingleProductsSection().count()).toBe(parseInt(brandCount.replace(/[()]/g, ''), 10))

    //'Saving the brand name and quantity of the brand to be selected'
    let brandCount2 = await homePage.getLeftSidebarRandomBrandCount(product.anotherRandomLeftSidebarBrandNumber)
    let brandName2 = await homePage.getBrandName(product.anotherRandomLeftSidebarBrandNumber, brandCount2)
  
    //'Verifying user is navigated to another brand page and brand products are displayed according to the selection'
    await productsPage.clickLeftSidebarRandomBrandName(product.anotherRandomLeftSidebarBrandNumber)
    const hrefValue2 = await productsPage.getLeftSidebarRandomBrandHref(product.anotherRandomLeftSidebarBrandNumber)  
    await expect(await productsPage.getPageUrl()).toContain(hrefValue2.replace(/ /g, '%20')) 
    await expect(await productsPage.getBrandPageSectionHeading()).toHaveText(`Brand - ${brandName2} Products`)
    await expect(await productsPage.getAllSingleProductsSection().count()).toBe(parseInt(brandCount2.replace(/[()]/g, ''), 10))
  })

})