import { test } from '../../support/globalHooks'
import { expect } from '@playwright/test';

import ProductsPage from "../pageObjects/ProductsPage"
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"

import jsonData from '../../fixtures/api.json' assert { type: "json" }
import text from "../../fixtures/text.json" assert { type: "json" }
import HomePage from '../../pageObjects/HomePage';
import TestCasesPage from '../../pageObjects/TestCasesPage';


const homePage = new HomePage(page)
const testCasesPage = new TestCasesPage(page)
const { user } = jsonData


test.describe('Tests for the sections: Other tests', ()=> {

  test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    homePage.clickTestCasesHeaderMenuButton()
    testCasesPage.getHeaderTestCasePage().should('have.text', text.testCasesPage.heading)
    testCasesPage.getPageTitle().should('include', text.testCasesPage.pageTitle)
    testCasesPage.getAllPagePanelTitles().should('have.length.above', 0)
    testCasesPage.getFeedbackForUsTitle().should('have.text', text.testCasesPage.feedbackForUsTitle)
  })

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page }) => {
    homePage.scrollToBottom()
    homePage.getCopyrightText().should('be.visible')
    homePage.getCopyrightText().should('have.text', text.basePage.copyright)
    homePage.getCopyrightText().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
    homePage.clickScrollUpButton()
    homePage.getSliderCarouselSection().should('be.visible')
    homePage.getSliderCarouselSection().should('contain', text.homePage.sliderCarouselSection)
    homePage.getSliderCarouselSection().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
  })

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ page }) => {
    homePage.scrollToBottom()
    homePage.getCopyrightText().should('be.visible')
    homePage.getCopyrightText().should('have.text', text.basePage.copyright)
    homePage.getCopyrightText().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
    homePage.scrollToTop()
    homePage.getSliderCarouselSection().should('be.visible')
    homePage.getSliderCarouselSection().should('contain', text.homePage.sliderCarouselSection)
    homePage.getSliderCarouselSection().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
  })

})