import { test } from './support/globalHooks'
import { liveServerUrl, searchTerms, user, userUpdate, message } from '../fixtures/api.json'

test.describe('API tests for the site automationexercise.com', ()=> {

  test('API 1: Get All Products List', async ({ page }) => {
    cy.request('GET', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body)).to.have.property('products')
      expect(JSON.parse(response.body).products).to.be.an('array') 
      expect(JSON.parse(response.body).products).to.have.length.above(0)
    })
  })

  test('API 1(2): Get All Products List (with @alias)', async ({ page }) => {
    cy.request('GET', '/api/productsList').as('prodList')
    
    cy.get('@prodList').then((response) => {
      expect(response.status).to.eq(200)
    })
  })  

  test('API 2: POST To All Products List', async ({ page }) => {
    cy.request('POST', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq(message.methodNotSupported)
    })
  })

  test('API 3: Get All Brands List', async ({ page }) => {
    cy.request('GET', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body)).to.have.property('brands')
      expect(JSON.parse(response.body).brands).to.be.an('array')
      expect(JSON.parse(response.body).brands).to.have.length.above(0)
      expect(JSON.parse(response.body).brands[0]).to.have.property('brand')
    })
  })

  test('API 4: PUT To All Brands List', async ({ page }) => {
    cy.request('PUT', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq(message.requestNotSupported)
    })
  })

  searchTerms.forEach((term) => {
    test('API 5: POST To Search Product (Positive test + preconditions(at least one item that contain "top"-word in name is present)', async ({ page }) => {
      cy.request({
        method: 'POST',
        url: '/api/searchProduct',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: { search_product: term }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(JSON.parse(response.body).responseCode).to.eq(200)
        expect(JSON.parse(response.body)).to.have.property('products')
        expect(JSON.parse(response.body).products).to.be.an('array')
        expect(JSON.parse(response.body).products[0].name).to.match(new RegExp(term, 'i'));
      })
    })
  })

  test('API 6: POST To Search Product without search_product parameter', async ({ page }) => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: '' 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(400)
      expect(JSON.parse(response.body).message).to.eq(message.badRequestSearchParametr)
    })
  })

  test('API 11: POST To Create/Register User Account', async ({ page }) => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: user
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(201)
      expect(JSON.parse(response.body).message).to.eq(message.userCreated)
    })
  })

  test('API 7: POST To Verify Login with valid details', async ({ page }) => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        email: user.email,
        password: user.password
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq(message.userExist)
    })
  })

  test('API 8: POST To Verify Login without email parameter', async ({ page }) => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: { password: user.password } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(400)
      expect(JSON.parse(response.body).message).to.eq(message.badRequestEmaiOrPasswordParametr)
    })
  })

  test('API 9: DELETE To Verify Login', async ({ page }) => {
    cy.request({
      method: 'DELETE',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        email: user.email,
        password: user.password
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq(message.requestNotSupported)
    })
  })

  test('API 10: POST To Verify Login with invalid details', async ({ page }) => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        email: user.email,
        password: "" 
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(404)
      expect(JSON.parse(response.body).message).to.eq(message.userNotFound)
    })
  })

  test('API 13: PUT METHOD To Update User Account', async ({ page }) => {
    cy.request({
      method: 'PUT',
      url: '/api/updateAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: userUpdate
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq(message.userUpdated)
    })
  })

  test('API 14: GET user account detail by email', async ({ page }) => {
    cy.request('GET', `/api/getUserDetailByEmail?email=${user.email}`)   
      .then((response) => {
        console.log(response)
        expect(response.status).to.eq(200)
        expect(JSON.parse(response.body).responseCode).to.eq(200)
        expect(JSON.parse(response.body).user.name).to.eq(userUpdate.name)
      })
  })

  test('API 12: DELETE METHOD To Delete User Account', async ({ page }) => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        email: user.email,
        password: user.password,
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq(message.accountDeleted)
    })
  })
})