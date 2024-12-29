import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test';

import text from "../../fixtures/text.json" assert { type: "json" }

test.describe('Tests for the sections: Other tests', ()=> {

  test('Test Case 7: Verify Test Cases Page', async ({ homePage, testCasesPage }) => {
    await homePage.clickTestCasesHeaderMenuButton()
    expect(await testCasesPage.getHeaderTestCasePage()).toHaveText(text.testCasesPage.heading)
    expect(await testCasesPage.getPageTitle()).toContain(text.testCasesPage.pageTitle)
    expect(await testCasesPage.getAllPagePanelTitles().count()).toBeGreaterThan(0)
    expect(await testCasesPage.getFeedbackForUsTitle()).toHaveText(text.testCasesPage.feedbackForUsTitle)
  })

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page, homePage }) => {
    await homePage.scrollToCopyright()
    expect(await homePage.getCopyrightText()).toBeVisible()
    expect(await homePage.getCopyrightText()).toHaveText(text.basePage.copyright)
    
    const rect = await homePage.getCopyrightText().boundingBox()
    const viewportHeight = (page.viewportSize()).height
    expect(rect.top).toBeGreaterThan(0);
    expect(rect.bottom).toBeLessThan(viewportHeight);
    
    await homePage.clickScrollUpButton()
    expect(await homePage.getSliderCarouselSection()).toBeVisible()
    expect(await homePage.getSliderCarouselSection()).toContain(text.homePage.sliderCarouselSection)

    const rectUp = await homePage.getSliderCarouselSection().boundingBox()
    const viewportHeightUp = (page.viewportSize()).height
    expect(rectUp.top).toBeGreaterThan(0)
    expect(rectUp.bottom).toBeLessThan(viewportHeightUp)
  })

  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ page, homePage }) => {
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