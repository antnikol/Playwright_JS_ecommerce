import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test';

import text from "../../fixtures/text.json" assert { type: "json" }

test.describe('Tests for the sections: Other tests', () => {

  test('Test Case 7: Verify Test Cases Page', async ({ homePage, testCasesPage }) => {
    await homePage.clickTestCasesHeaderMenuButton()
    await expect(await testCasesPage.getHeaderTestCasePage()).toHaveText(text.testCasesPage.heading)
    await expect(await testCasesPage.getPageTitle()).toContain(text.testCasesPage.pageTitle)
    await expect(await testCasesPage.getAllPagePanelTitles().count()).toBeGreaterThan(0)
    await expect(await testCasesPage.getFeedbackForUsTitle()).toHaveText(text.testCasesPage.feedbackForUsTitle)
  })

  test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page, homePage }) => {
    await homePage.scrollToCopyright()
    await expect(await homePage.getCopyrightText()).toBeVisible()
    await expect(await homePage.getCopyrightText()).toHaveText(text.basePage.copyright)
    
    const rect = await homePage.getCopyrightText().boundingBox()
    const top = rect.y
    const bottom = rect.y + rect.height
    const viewportHeight = page.viewportSize().height
    expect(top).toBeGreaterThan(0)
    expect(bottom).toBeLessThan(viewportHeight)

    await homePage.clickScrollUpButton()
    await expect(await homePage.getHeaderSection()).toBeVisible()
    await expect(await homePage.getHeaderSection()).toContainText(text.homePage.headerSection)
    const rectUp = await homePage.getHeaderSection().boundingBox()
    const topUp = rectUp.y
    const bottomUp = rectUp.y + rectUp.height
    const viewportHeightUp = page.viewportSize().height
    expect(topUp).toBeGreaterThan(0)
    expect(bottomUp).toBeLessThan(viewportHeightUp)
})


  test('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ page, homePage }) => {
    await homePage.scrollToCopyright()
    await expect(await homePage.getCopyrightText()).toBeVisible()
    await expect(await homePage.getCopyrightText()).toHaveText(text.basePage.copyright)
    const rect = await homePage.getCopyrightText().boundingBox()
    const top = rect.y
    const bottom = rect.y + rect.height
    const viewportHeight = page.viewportSize().height
    expect(top).toBeGreaterThan(0)
    expect(bottom).toBeLessThan(viewportHeight)

    await homePage.scrollToTop()
    await expect(await homePage.getHeaderSection()).toBeVisible()
    await expect(await homePage.getHeaderSection()).toContainText(text.homePage.headerSection)
    const rectUp = await homePage.getHeaderSection().boundingBox()
    const topUp = rectUp.y
    const bottomUp = rectUp.y + rectUp.height
    const viewportHeightUp = page.viewportSize().height
    expect(topUp).toBeGreaterThan(0)
    expect(bottomUp).toBeLessThan(viewportHeightUp)
  })

})