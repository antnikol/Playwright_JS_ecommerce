import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test'
import jsonData from '../../fixtures/api.json' assert { type: "json" }
const { message, searchTerms, user, userUpdate } = jsonData

test.describe('API tests with mocked data', () => {

  test('API_ 1(3): __Mocked_DATA__ Get All Products List', async ({ page, request }) => {
    console.log("Test is running...");

    await page.route('**/api/productsList', (route) => {
      console.log('Intercepted request:', route.request().url())
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ products: [{ name: 'mocked' }] }),
      });
    });

    await page.goto('http://localhost:3000/mockPage.html');
    const response = await page.waitForResponse((response) => {
      console.log('Response URL:', response.url());
      console.log('Response status:', response.status());
      return response.url().includes('/api/productsList');
    });

    const responseBody = await response.json()
    expect(response.status()).toBe(201)
    expect(responseBody.products[0].name).toBe('mocked')
  })
  
})
