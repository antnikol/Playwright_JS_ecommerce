/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import CartPage from "../pageObjects/CartPage"
import genData from "../fixtures/genData"
import { searchTerms, user } from '../fixtures/api.json'
import text from "../fixtures/text.json"


const homePage = new HomePage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductDetailsPage()
const cartPage = new CartPage()

const product = genData.newProductTestData()

describe('Tests for the sections: Products', ()=> {

  it('Test Case 8: Verify All Products and product detail page', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', text.productsPage.allProductsHeader)
    productsPage.getAllProductsList().should('have.length.above', 0)
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getProductInformationSection().should('be.visible')
    productDetailsPage.getProductName().should('be.visible')
    productDetailsPage.getProductPrice().should('be.visible')
    productDetailsPage.getProductAvailability().should('be.visible')
    productDetailsPage.getProductCondition().should('be.visible')
    productDetailsPage.getProductBrand().should('be.visible')
  })

  it('Test Case 9: Search Product', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', text.productsPage.allProductsHeader)
    productsPage
      .typeSearchProductField(searchTerms[2])
      .clickSearchButton()
      .getAllProductsHeader().should('have.text', text.productsPage.searchedProductsHeader)
    productsPage.checkSearchedProductsNames(searchTerms[2])
  })

  it('Test Case 20: Search Products and Verify Cart After Login', () => {
    cy.registerUser()
    homePage.clickLogoutButton()

    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', text.productsPage.allProductsHeader)
    productsPage.getPageUrl().should('include', text.productsPage.pageUrl)
    productsPage
      .typeSearchProductField(searchTerms[2])
      .clickSearchButton()
      .getAllProductsHeader().should('have.text', text.productsPage.searchedProductsHeader)
    productsPage.getPageUrl().should('include', text.productsPage.searchedPageUrl)
    productsPage
      .checkSearchedProductsNames(searchTerms[2])
      .clickAllProductsAddToCartButton()
      .clickViewCartHeaderButton()
    cartPage.getActiveBreadcrumbs().should('have.text', text.cartPage.breadCrumbs)
    cartPage
      .checkSearchedProductNamesInCart(searchTerms[2])
      .checkSearchedProductQuantityInCart(2)

    cy.loginUser()
    homePage.clickViewCartHeaderButton()
    cartPage.getActiveBreadcrumbs().should('have.text', text.cartPage.breadCrumbs)
    cartPage
      .checkSearchedProductNamesInCart(searchTerms[2])
      .checkSearchedProductQuantityInCart(2)
  })

  it('Test Case 18: View Category Products', () => {
    homePage
      .clickLeftSidebarCategory(text.category[0])
      .clickLeftSidebarSubCategory(text.subCategoryWomen[0])
    productsPage.getAllProductsHeader().should('have.text', `${text.category[0]} - ${text.subCategoryWomen[0]} Products`)
    productsPage.getPageTitle().should('equal', `Automation Exercise - ${text.subCategoryWomen[0]} Products`)
    productsPage.getPageUrl().should('contain', text.productsPage.categoryPageUrl)
    productsPage.checkSearchedProductsNames(text.subCategoryWomen[0])

    productsPage
      .clickLeftSidebarCategory(text.category[1])
      .clickLeftSidebarSubCategory(text.subCategoryMen[1])
    productsPage.getAllProductsHeader().should('have.text', `${text.category[1]} - ${text.subCategoryMen[1]} Products`)
    productsPage.getPageTitle().should('equal', `Automation Exercise - ${text.subCategoryMen[1]} Products`)
    productsPage.getPageUrl().should('contain', text.productsPage.categoryPageUrl)
    productsPage.checkSearchedProductsNames(text.subCategoryMen[1])
  })

  it('Test Case 21: Add review on product', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', text.productsPage.allProductsHeader)
    productsPage.getPageUrl().should('include', text.productsPage.pageUrl)
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getWriteYourReviewHeader().should('have.text', text.productDetailsPage.writeYourReviewHeader)
    productDetailsPage
      .typeYourNameField(user.name)
      .typeYourEmailField(user.email)
      .typeReviewTextField(product.review)
      .clickSubmitReviewButton()
    productDetailsPage.getReviewSuccessMessage().should('be.visible')
    productDetailsPage.getReviewSuccessMessage().should('have.text', text.productDetailsPage.reviewSuccessMessage)     
  })

  it('Test Case 19: View & Cart Brand Products', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getLeftSidebarBrandsHeading().should('be.visible').and('have.text', text.productsPage.brandsHeading)
    productsPage.getLeftSidebarBrandsList().should('have.length.above', 0)
    
    cy.log('Saving the brand name and quantity of the brand to be selected')
    homePage.getLeftSidebarRandomBrandCount(product.randomLeftSidebarBrandNumber)
      .then((count) => cy.wrap(count).as('brandCount'))
    homePage.getBrandName(product.randomLeftSidebarBrandNumber, 'brandCount')
      .then((brandName) => cy.wrap(brandName).as('brandName'))

    cy.log('Verifying user is navigated to brand page and brand products are displayed according to the selection')
    homePage.clickLeftSidebarRandomBrandName(product.randomLeftSidebarBrandNumber)
    productsPage.getLeftSidebarRandomBrandHref(product.randomLeftSidebarBrandNumber)  
      .then((hrefValue) => productsPage.getPageUrl().should('include', hrefValue.replace(/ /g, '%20')) )
    productsPage.getSavedVariableAs('brandName').then((brandName) => { 
      productsPage.getBrandPageSectionHeading().should('have.text', `Brand - ${brandName} Products`)
    })
    productsPage.getSavedVariableAs('brandCount').then((brandCount) => { 
      productsPage.getAllSingleProductsSection().should('have.length', brandCount.replace(/[()]/g, ''))
    })

    cy.log('Saving the brand name and quantity of the brand to be selected')
    homePage.getLeftSidebarRandomBrandCount(product.anotherRandomLeftSidebarBrandNumber)
      .then((count) => cy.wrap(count).as('brandCount'))
    homePage.getBrandName(product.anotherRandomLeftSidebarBrandNumber, 'brandCount')
      .then((brandName) => cy.wrap(brandName).as('brandName'))
  
    cy.log('Verifying user is navigated to another brand page and brand products are displayed according to the selection')
    productsPage.clickLeftSidebarRandomBrandName(product.anotherRandomLeftSidebarBrandNumber)
    productsPage.getLeftSidebarRandomBrandHref(product.anotherRandomLeftSidebarBrandNumber)  
      .then((hrefValue) => productsPage.getPageUrl().should('include', hrefValue.replace(/ /g, '%20')) )
    productsPage.getSavedVariableAs('brandName').then((brandName) => { 
      productsPage.getBrandPageSectionHeading().should('have.text', `Brand - ${brandName} Products`)
    })
    productsPage.getSavedVariableAs('brandCount').then((brandCount) => { 
      productsPage.getAllSingleProductsSection().should('have.length', brandCount.replace(/[()]/g, ''))
    })
  })

})