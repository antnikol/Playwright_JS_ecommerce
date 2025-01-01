import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test'
import jsonData from '../../fixtures/api.json' assert { type: "json" }
const { message, searchTerms, user, userUpdate } = jsonData

test.describe('API tests with mocked data', () => {

  test('API_ 1(3): __Mocked_DATA__ Get All Products List', async ({ page, request }) => {
    await page.route('**/api/productsList', route => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({ products: [{ name: 'mocked' }] })
      })
    })
  
    await page.goto('http://localhost:3000/mockPage.html')
    const response = await page.waitForResponse('**/api/productsList')
    const responseBody = await response.json()
    expect(response.status()).toBe(201)
    expect(responseBody.products[0].name).toBe('mocked')
  })
  
})
