import { test } from '../../support/globalHooks.js'
import { expect } from '@playwright/test'
import jsonData from '../../fixtures/api.json' assert { type: "json" }
const { message, searchTerms, user, userUpdate } = jsonData
// const { message, searchTerms, user, userUpdate } = require('../../fixtures/api.json')

test.describe('API tests for the site automationexercise.com', ()=> {

  test('API_ 1: Get All Products List', async ({ request }) => {
    const response = await request.get('/api/productsList')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody).toHaveProperty('products')
    expect(Array.isArray(responseBody.products)).toBe(true)
    expect(responseBody.products.length).toBeGreaterThan(0)
  });

  test('API_ 2: POST To All Products List', async ({ request }) => {
    const response = await request.post('/api/productsList')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(405)
    expect(responseBody.message).toBe(message.methodNotSupported)
  })

  test('API_ 3: Get All Brands List', async ({ request }) => {
    const response = await request.get('/api/brandsList')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody).toHaveProperty('brands')
    expect(Array.isArray(responseBody.brands)).toBe(true)
    expect(responseBody.brands.length).toBeGreaterThan(0)
    expect(responseBody.brands[0]).toHaveProperty('brand')
  })

  test('API_ 4: PUT To All Brands List', async ({ request }) => {
    const response = await request.put('/api/brandsList')
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(405)
    expect(responseBody.message).toBe(message.requestNotSupported)
  })

  searchTerms.forEach((term) => {
    test(`API_ 5: POST To Search Product (Positive test + preconditions for term "${term}"`, async ({ request }) => {
      const response = await request.post('/api/searchProduct', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: `search_product=${encodeURIComponent(term)}`,
      })
      const responseBody = await response.json()
      expect(response.status()).toBe(200)
      expect(responseBody.responseCode).toBe(200)
      expect(responseBody).toHaveProperty('products')
      expect(Array.isArray(responseBody.products)).toBe(true)
      expect(responseBody.products[0].name).toMatch(new RegExp(term, 'i'))
    })
  })

  test('API_ 6: POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: ``,
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(400)
    expect(responseBody.message).toBe(message.badRequestSearchParametr)
  })

  test('API_ 11: POST To Create/Register User Account', async ({ request }) => {
    let formData = new URLSearchParams();
    for (let key in user) {
      if (user.hasOwnProperty(key)) {
        formData.append(key, user[key]);
      }
    }
    const response = await request.post('/api/createAccount', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString(),
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(201)
    expect(responseBody.message).toBe(message.userCreated)
  })

  test('API_ 7: POST To Verify Login with valid details', async ({ request }) => {
    let formData = new URLSearchParams()
    formData.append('email', user.email)
    formData.append('password', user.password)
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString()
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody.message).toBe(message.userExist)
	})

  test('API_ 8: POST To Verify Login without email parameter', async ({ request }) => {
    let formData = new URLSearchParams()
    formData.append('password', user.password)
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString()
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(400)
    expect(responseBody.message).toBe(message.badRequestEmaiOrPasswordParametr)
  })

  test('API_ 9: DELETE To Verify Login', async ({ request }) => {
    let formData = new URLSearchParams()
    formData.append('email', user.email)
    formData.append('password', user.password)
    const response = await request.delete('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString()
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(405)
    expect(responseBody.message).toBe(message.requestNotSupported)
  })

  test('API_ 10: POST To Verify Login with invalid details', async ({ request }) => {
    let formData = new URLSearchParams()
    formData.append('email', user.email)
    formData.append('password', "")
    const response = await request.post('/api/verifyLogin', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString()
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(404)
    expect(responseBody.message).toBe(message.userNotFound)
  })

  test('API_ 13: PUT METHOD To Update User Account', async ({ page, request }) => {
    let formData = new URLSearchParams();
    for (const key in userUpdate) {
      if (userUpdate.hasOwnProperty(key)) {
        formData.append(key, userUpdate[key]);
      }
    }
    const response = await request.put('/api/updateAccount', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString(),
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody.message).toBe(message.userUpdated)
  })

  test('API_ 14: GET user account detail by email', async ({ request }) => {
    const response = await request.get(`/api/getUserDetailByEmail?email=${user.email}`)
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody.user.name).toBe(userUpdate.name)
  })

  test('API_ 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    let formData = new URLSearchParams()
    formData.append('email', user.email)
    formData.append('password', user.password)
    const response = await request.delete('/api/deleteAccount', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      data: formData.toString()
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(200)
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody.message).toBe(message.accountDeleted)
  })
})