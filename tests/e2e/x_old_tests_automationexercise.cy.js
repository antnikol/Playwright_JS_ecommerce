/// <reference types="cypress" />

describe('Old tests for the site automationexercise.com', ()=> {
  let new_brach = 'new_branch'
  let userName = 'test-AQA user'
  let userEmail = 'test-AQA@gmail.com'
  let userEmailDelete = 'delete-AQA@gmail.com'
  let userPassword = '123456'
  let first_name = 'Anton'
  let last_name = 'K'
  let company = 'test_company_name'
  let address = 'Yavornitskogo str., build 100,'
  let address2 = 'US, FL'
  let country = 'United States'
  let state = 'FL'
  let city = 'Miami'
  let zipcode = '33101'
  let mobile_number = '1-703-555-567'
  let birth_year = '1999'
  let birth_month = 'January'
  let birth_day = '1'
  let gender = 'Mr'
  beforeEach( () => {
    cy.visit('/')
    this.page.locator('a[href="/login"]').as('loginButton')
  })

  it('Test Case 1: Register User', () => {
    cy.deleteUser()
    this.page.locator('@loginButton').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmail)
    this.page.locator('button[data-qa="signup-button"]').click()

    // Checking for an already registered user and error message "Email Address already exist!"
    this.page.locator('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        this.page.locator('input[data-qa="login-email"]').type(userEmailDelete)
        this.page.locator('input[data-qa="login-password"]').type(userPassword)
        this.page.locator('button[data-qa="login-button"]').click()
        this.page.locator('a[href="/delete_account"]').click()
        this.page.locator('@loginButton').click()
        this.page.locator('input[data-qa="signup-name"]').type(userName)
        this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
        this.page.locator('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get(`input[value="${gender}"]`).click()
    this.page.locator('input[data-qa="password"]').type(userPassword)
    this.page.locator('select[data-qa="days"]').select(1)
    this.page.locator('select[data-qa="months"]').select(birth_month)
    this.page.locator('select[data-qa="years"]').select(birth_year)
    this.page.locator('#newsletter').check()
    this.page.locator('#optin').check()
    this.page.locator('input[data-qa="first_name"]').type(first_name)
    this.page.locator('input[data-qa="last_name"]').type(last_name)
    this.page.locator('input[data-qa="company"]').type(company)
    this.page.locator('input[data-qa="address"]').type(address)
    this.page.locator('input[data-qa="address2"]').type(address2)
    this.page.locator('select[data-qa="country"]').select(country)
    this.page.locator('input[data-qa="state"]').type(state)
    this.page.locator('input[data-qa="city"]').type(city)
    this.page.locator('input[data-qa="zipcode"]').type(zipcode)
    this.page.locator('input[data-qa="mobile_number"]').type(mobile_number)
    this.page.locator('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    this.page.locator('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
  })

  it('Test Case 2: Login User with correct email and password', () => {
    this.page.locator('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    this.page.locator('input[data-qa="login-email"]').type(userEmail)
    this.page.locator('input[data-qa="login-password"]').type(userPassword)
    this.page.locator('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    this.page.locator('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    this.page.locator('input[data-qa="login-email"]').type(userEmail+'1')
    this.page.locator('input[data-qa="login-password"]').type(userPassword+'1')
    this.page.locator('button[data-qa="login-button"]').click()
    cy.contains(/Your email or password is incorrect!/i).should('be.visible')
    this.page.locator('form[action="/login"]>p')
      .should('have.text', 'Your email or password is incorrect!')
  })

  it('Test Case 4: Logout User', () => {
    this.page.locator('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    this.page.locator('input[data-qa="login-email"]').type(userEmail)
    this.page.locator('input[data-qa="login-password"]').type(userPassword)
    this.page.locator('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')
    this.page.locator('a[href="/logout"]').click()
    cy.contains(/Login to your account/i).should('be.visible')
  })

  it('Test Case 5: Register User with existing email', () => {
    this.page.locator('@loginButton').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmail)
    this.page.locator('button[data-qa="signup-button"]').click()
    cy.contains(/Email Address already exist!/i).should('be.visible')
    this.page.locator('form[action="/signup"]>p')
      .should('have.text', 'Email Address already exist!')
  })

  it('Test Case 6: Contact Us Form', () => {
    this.page.locator('a[href="/contact_us"]').click()
    cy.contains(/Get In Touch/i).should('be.visible')
    this.page.locator('h2[class="title text-center"]').eq(1)
      .should('have.text', 'Get In Touch')
    cy.contains('h2.title.text-center', 'Get In Touch')
    this.page.locator('input[data-qa="name"]').type('test Name')
    this.page.locator('input[data-qa="email"]').type('test@email.com')
    this.page.locator('input[data-qa="subject"]').type('Subject text for test')
    this.page.locator('textarea[data-qa="message"]').type('Message text for test')
    this.page.locator('input[type="file"]').attachFile('/text.json')
    cy.on('window:alert', () => {})
    this.page.locator('input[data-qa="submit-button"]').click()
    cy.contains(/Success! Your details have been submitted successfully./i).should('be.visible')
    this.page.locator('.status.alert.alert-success')
      .should('have.text', 'Success! Your details have been submitted successfully.')
    this.page.locator('.btn.btn-success').click()
  })  

  it('Test Case 7: Verify Test Cases Page', () => {
  this.page.locator('a[href="/test_cases"]').contains(' Test Cases').click()
  this.page.locator('a[href="/test_cases"]').contains(/\s*Test Cases\s*/).click()
  this.page.locator('h2.title').should('have.text', 'Test Cases')
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    this.page.locator('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    this.page.locator('h2.title').should('have.text', 'All Products')
    this.page.locator('.product-overlay').should('have.length.above', 0)
    this.page.locator('.choose').eq(0).contains('View Product').click()
    this.page.locator('.product-information').should('be.visible')
  })

  it('Test Case 9: Search Product', () => {
    this.page.locator('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    this.page.locator('h2.title').should('have.text', 'All Products')
    this.page.locator('input#search_product').type('saree')
    this.page.locator('button#submit_search').click()
    this.page.locator('h2.title').should('have.text', 'Searched Products')
    this.page.locator('.overlay-content p').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Saree/i);
    })
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.scrollTo('bottom')
    this.page.locator('.single-widget').should('include.text', 'Subscription')
    this.page.locator('#susbscribe_email').type('test@email.com')
    this.page.locator('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })

  it('Test Case 11: Verify Subscription in Cart page', () => {
    this.page.locator('.shop-menu a[href="/view_cart"]').click()
    cy.window().then((win) => {
      if (win.document.body.scrollHeight > win.innerHeight) {
        cy.scrollTo('bottom')
      }
    })
    this.page.locator('.single-widget').should('include.text', 'Subscription')
    this.page.locator('#susbscribe_email').type('test@email.com')
    this.page.locator('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })

  it('Test Case 12: Add Products in Cart', () => {
    let qtyCartTrimed, totalPriceSliced
    let price1psc, price1pscNum, goodName
    this.page.locator('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    this.page.locator('.overlay-content h2').eq(0).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    this.page.locator('.overlay-content p').eq(0).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    this.page.locator('.single-products').eq(0).scrollIntoView()
      .realHover().find('.product-overlay a.btn')
      .click({ animationDistanceThreshold: 40 })
    this.page.locator('.btn-success').contains('Continue Shopping').click()
    this.page.locator('.single-products').eq(1).scrollIntoView()
      .realHover().find('.product-overlay a.btn')
      .click({ animationDistanceThreshold: 40 })
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 2)
    this.page.locator('.disabled').first().should('have.text', '1')
    this.page.locator('.disabled').last().should('have.text', '1')
    this.page.locator('.cart_price').first().invoke('text')
      .then((cartPriceText) => {
        this.page.locator('.cart_total_price').first().invoke('text')
        .should('equal', cartPriceText.trim());
      })
    this.page.locator('.cart_price').last().invoke('text')
    .then((cartPriceText) => {
      this.page.locator('.cart_total_price').last().invoke('text')
      .should('equal', cartPriceText.trim());
    })
    cy.then(() => {
      this.page.locator('.cart_description a').eq(0).should('have.text', goodName)
    })
    cy.then(() => {
      this.page.locator('.cart_price p').eq(0).should('have.text', price1psc)
    })
    this.page.locator('.disabled').first().invoke('text')
      .then((text) => {
        qtyCartTrimed = text.trim()
    })
    this.page.locator('.cart_total_price').first().invoke('text')
      .then((text) => {
        totalPriceSliced = text.slice(4)
    })
    cy.then(() => {
      expect(totalPriceSliced/qtyCartTrimed).to.equal(parseFloat(price1pscNum))
    })
  })

  it('Test Case 13: Verify Product quantity in Cart', () => {
    this.page.locator('.choose').eq(0).contains('View Product').click()
    this.page.locator('.product-information').should('be.visible')
    this.page.locator('#quantity').clear().type('4')
    this.page.locator('.btn.btn-default.cart').click()
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    this.page.locator('.disabled').first().should('have.text', '4')
  })

  it('Test Case 14: Place Order: Register while Checkout', () => {
    let price1psc, price1pscNum, goodName
    this.page.locator('.overlay-content h2').eq(0).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    this.page.locator('.overlay-content p').eq(0).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    
    this.page.locator('.choose').eq(0).contains('View Product').click()
    this.page.locator('.product-information').should('be.visible')
    this.page.locator('#quantity').clear().type('4')
    this.page.locator('.btn.btn-default.cart').click()
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.table-responsive').should('exist')
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('.cart_product').should('have.length', 1)
    this.page.locator('.breadcrumbs').should('include.text', 'Shopping Cart')
    this.page.locator('.btn.btn-default.check_out').contains('Proceed To Checkout').click()
    this.page.locator('.modal-body a[href="/login"]').click()

    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
    this.page.locator('button[data-qa="signup-button"]').click()

    // Checking for an already registered user and error message "Email Address already exist!"
    this.page.locator('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        this.page.locator('input[data-qa="login-email"]').type(userEmailDelete)
        this.page.locator('input[data-qa="login-password"]').type(userPassword)
        this.page.locator('button[data-qa="login-button"]').click()
        this.page.locator('a[href="/delete_account"]').click()
        this.page.locatorget('@loginButton').click()
        this.page.locator('input[data-qa="signup-name"]').type(userName)
        this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
        this.page.locator('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    this.page.locator('#id_gender1').click()
    this.page.locator('input[data-qa="password"]').type(userPassword)
    this.page.locator('select[data-qa="days"]').select(1)
    this.page.locator('select[data-qa="months"]').select(1)
    this.page.locator('select[data-qa="years"]').select('1999')
    this.page.locator('#newsletter').check()
    this.page.locator('#optin').check()
    this.page.locator('input[data-qa="first_name"]').type('Anton')
    this.page.locator('input[data-qa="last_name"]').type('K')
    this.page.locator('input[data-qa="company"]').type('test_company_name')
    this.page.locator('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    this.page.locator('input[data-qa="address2"]').type('US, FL')
    this.page.locator('select[data-qa="country"]').select('United States')
    this.page.locator('input[data-qa="state"]').type('FL')
    this.page.locator('input[data-qa="city"]').type('Miami')
    this.page.locator('input[data-qa="zipcode"]').type('33101')
    this.page.locator('input[data-qa="mobile_number"]').type('1-703-555-567')
    this.page.locator('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    this.page.locator('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    this.page.locator('.shop-menu a[href="/view_cart"]').click()
    this.page.locator('.btn.btn-default.check_out').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    this.page.locator('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      this.page.locator('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      this.page.locator('.cart_price p').should('have.text', price1psc)
    })
    
    this.page.locator('textarea[class="form-control"]').type('...some comment to order...')
    this.page.locator('a[href="/payment"]').click()
    this.page.locator('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    this.page.locator('input[data-qa="card-number"]').type('1234567890123456')
    this.page.locator('input[data-qa="cvc"]').type('111')
    this.page.locator('input[data-qa="expiry-month"]').type('12')
    this.page.locator('input[data-qa="expiry-year"]').type('2025')
    this.page.locator('button[data-qa="pay-button"]').click()

    this.page.locator('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    this.page.locator('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    let price1psc, price1pscNum, goodName
    this.page.locator('.overlay-content h2').eq(2).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    this.page.locator('.overlay-content p').eq(2).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })

    this.page.locator('.shop-menu a[href="/login"]').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
    this.page.locator('button[data-qa="signup-button"]').click()

    // Checking for an already registered user and error message "Email Address already exist!"
    this.page.locator('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        this.page.locator('input[data-qa="login-email"]').type(userEmailDelete)
        this.page.locator('input[data-qa="login-password"]').type(userPassword)
        this.page.locator('button[data-qa="login-button"]').click()
        this.page.locator('a[href="/delete_account"]').click()
        this.page.locator('@loginButton').click()
        this.page.locator('input[data-qa="signup-name"]').type(userName)
        this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
        this.page.locator('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    this.page.locator('#id_gender1').click()
    this.page.locator('input[data-qa="password"]').type(userPassword)
    this.page.locator('select[data-qa="days"]').select(1)
    this.page.locator('select[data-qa="months"]').select(1)
    this.page.locator('select[data-qa="years"]').select('1999')
    this.page.locator('#newsletter').check()
    this.page.locator('#optin').check()
    this.page.locator('input[data-qa="first_name"]').type('Anton')
    this.page.locator('input[data-qa="last_name"]').type('K')
    this.page.locator('input[data-qa="company"]').type('test_company_name')
    this.page.locator('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    this.page.locator('input[data-qa="address2"]').type('US, FL')
    this.page.locator('select[data-qa="country"]').select('United States')
    this.page.locator('input[data-qa="state"]').type('FL')
    this.page.locator('input[data-qa="city"]').type('Miami')
    this.page.locator('input[data-qa="zipcode"]').type('33101')
    this.page.locator('input[data-qa="mobile_number"]').type('1-703-555-567')
    this.page.locator('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    this.page.locator('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    this.page.locator('a[data-product-id]').eq(5).click({force:true})
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('#do_action a').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    this.page.locator('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      this.page.locator('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      this.page.locator('.cart_price p').should('have.text', price1psc)
    })
    this.page.locator('textarea[class="form-control"]').type('...some comment to order...')
    this.page.locator('a[href="/payment"]').click()
    this.page.locator('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    this.page.locator('input[data-qa="card-number"]').type('1234567890123456')
    this.page.locator('input[data-qa="cvc"]').type('111')
    this.page.locator('input[data-qa="expiry-month"]').type('12')
    this.page.locator('input[data-qa="expiry-year"]').type('2025')
    this.page.locator('button[data-qa="pay-button"]').click()
    this.page.locator('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    this.page.locator('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 16: Place Order: Login before Checkout', () => {
    let price1psc, price1pscNum, goodName
    this.page.locator('.overlay-content h2').eq(7).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    this.page.locator('.overlay-content p').eq(7).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    this.page.locator('a[href="/login"]').click()
    cy.contains(/Login to your account/i).should('be.visible')
    this.page.locator('input[data-qa="login-email"]').type(userEmail)
    this.page.locator('input[data-qa="login-password"]').type(userPassword)
    this.page.locator('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')

    this.page.locator('a[data-product-id]').eq(15).click({force:true})
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('#do_action a').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    this.page.locator('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      this.page.locator('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      this.page.locator('.cart_price p').should('have.text', price1psc)
    })
    this.page.locator('textarea[class="form-control"]').type('...some comment to order...')
    this.page.locator('a[href="/payment"]').contains('Place Order').click()
    this.page.locator('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    this.page.locator('input[data-qa="card-number"]').type('1234567890123456')
    this.page.locator('input[data-qa="cvc"]').type('111')
    this.page.locator('input[data-qa="expiry-month"]').type('12')
    this.page.locator('input[data-qa="expiry-year"]').type('2025')
    this.page.locator('button[data-qa="pay-button"]').click()

    this.page.locator('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    this.page.locator('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 17: Remove Products From Cart', () => {
    this.page.locator('a[data-product-id]').eq(1).click({force:true})
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('.cart_quantity_delete').click()
    this.page.locator('#empty_cart').contains('Cart is empty!').should('be.visible')
  })


  it('Test Case 18: View Category Products', () => {
    let categoryHrefWomen, categoryHrefMen
    this.page.locator('a[href="#Women"]').click()
    this.page.locator('.panel-body a').eq(0).invoke('attr', 'href').then((hrefValue) => {
      categoryHrefWomen = hrefValue.trim()
      this.page.locator('.panel-body a').eq(0).click()
      cy.url().should('include', categoryHrefWomen)
    })
    this.page.locator('a[href="#Men"]').click()
    this.page.locator('div#Men li a').eq(1).invoke('attr', 'href').then((hrefValue) => {
      categoryHrefMen = hrefValue
      this.page.locator('div#Men li a').eq(1).click()
      cy.url().should('include', categoryHrefMen)
    })
    this.page.locator('.features_items h2').should('contain', 'Men')
  })

  it('Test Case 19: View & Cart Brand Products', () => {
    let brandName, brandCount, brand, categoryHrefBrand
    this.page.locator('.shop-menu a[href="/products"]').click()
    this.page.locator('.brands_products h2').should('be.visible').and('have.text','Brands')
    this.page.locator('.brands-name li').should('have.length.above', 0)
    this.page.locator('.brands-name li a').eq(1).invoke('text').then((text) => {
      brandName = text.trim()
      this.page.locator('.brands-name li a span').eq(1).invoke('text').then((text2) => {
        brandCount = text2.trim()
        brand = brandName.replace(brandCount, '').trim()
        })
      })
    this.page.locator('.brands-name li a').eq(1).invoke('attr','href').then((hrefValue) => {
      categoryHrefBrand = hrefValue.trim() 
      this.page.locator('.brands-name li a').eq(1).click()
      cy.url().should('include', categoryHrefBrand)
    })
    cy.then(() => {
      this.page.locator('div.features_items h2').should('include.text', brand)
    })
    this.page.locator('.single-products').should('have.length.above', 0)
    this.page.locator('.brands-name li a').eq(0).invoke('attr','href').then((hrefValue) => {
      categoryHrefBrand = hrefValue.trim() 
      this.page.locator('.brands-name li a').eq(0).click()
      cy.url().should('include', categoryHrefBrand)
    })
    this.page.locator('.brands-name li a').eq(0).invoke('text').then((text) => {
      brandName = text.trim()
      this.page.locator('.brands-name li a span').eq(0).invoke('text').then((text2) => {
        brandCount = text2.trim()
        brand = brandName.replace(brandCount, '').trim()
        })
      })
    cy.then(() => {
      this.page.locator('div.features_items h2').should('include.text', brand)
    })
    this.page.locator('.single-products').should('have.length.above', 0)
  })

  it('Test Case 20: Search Products and Verify Cart After Login', () => {
    this.page.locator('a[href="/products"]').click()
    this.page.locator('.features_items').children().first().should('have.text', 'All Products')
    cy.url().should('include', '/products')
    this.page.locator('input#search_product').type('Saree')
    this.page.locator('button#submit_search').click()
    cy.url().should('include', '?search')
    this.page.locator('h2.title').should('have.text', 'Searched Products')
    this.page.locator('.product-image-wrapper').should('have.length.above', 0)
    this.page.locator('.product-image-wrapper')

    this.page.locator('.overlay-content p').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Saree/i);
    })
  })

  it('Test Case 21: Add review on product', () => {
    this.page.locator('a[href="/products"]').click()
    this.page.locator('.features_items').children().first().should('have.text', 'All Products')
    cy.url().should('include', '/products')
    this.page.locator('.choose a').eq(5).contains('View Product').click()
    this.page.locator('li.active').invoke('text').should('match', /Write Your Review/i)
    this.page.locator('input#name').type(first_name)
    this.page.locator('input#email').type(userEmail)
    this.page.locator('textarea#review').type('...some review text...')
    this.page.locator('#button-review').click()
    this.page.locator('div#review-section').contains('Thank you for your review.')
      .should('be.visible')
  })

  it('Test Case 22: Add to cart from Recommended items', () => {
    let goodName
    cy.scrollTo('bottom')
    this.page.locator('.recommended_items').contains('recommended items')
      .should('be.visible')
    this.page.locator('div.item.active').last().find('p').eq(1)
      .invoke('text').then((text) => {
      goodName = text.trim()
    })
    this.page.locator('div.item.active').last().find('a.add-to-cart').eq(1).click()
    this.page.locator('.modal-body').find('a[href="/view_cart"]').click()
    cy.then(() => {
      this.page.locator('.cart_description a').should('have.text', goodName)
    })
  })

  it('Test Case 23: Verify address details in checkout page', () => {
    this.page.locator('@loginButton').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
    this.page.locator('button[data-qa="signup-button"]').click()

    // Checking for an already registered user and error message "Email Address already exist!"
    this.page.locator('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        this.page.locator('input[data-qa="login-email"]').type(userEmailDelete)
        this.page.locator('input[data-qa="login-password"]').type(userPassword)
        this.page.locator('button[data-qa="login-button"]').click()
        this.page.locator('a[href="/delete_account"]').click()
        this.page.locator('@loginButton').click()
        this.page.locator('input[data-qa="signup-name"]').type(userName)
        this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
        this.page.locator('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    this.page.locator('#id_gender1').click()
    this.page.locator('input[data-qa="password"]').type(userPassword)
    this.page.locator('select[data-qa="days"]').select(1)
    this.page.locator('select[data-qa="months"]').select(1)
    this.page.locator('select[data-qa="years"]').select('1999')
    this.page.locator('#newsletter').check()
    this.page.locator('#optin').check()
    this.page.locator('input[data-qa="first_name"]').type('Anton')
    this.page.locator('input[data-qa="last_name"]').type('K')
    this.page.locator('input[data-qa="company"]').type('test_company_name')
    this.page.locator('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    this.page.locator('input[data-qa="address2"]').type('US, FL')
    this.page.locator('select[data-qa="country"]').select('United States')
    this.page.locator('input[data-qa="state"]').type('FL')
    this.page.locator('input[data-qa="city"]').type('Miami')
    this.page.locator('input[data-qa="zipcode"]').type('33101')
    this.page.locator('input[data-qa="mobile_number"]').type('1-703-555-567')
    this.page.locator('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    this.page.locator('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')

    this.page.locator('a[data-product-id]').eq(1).click({force:true})
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('.btn.btn-default.check_out').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    this.page.locator('#address_delivery h3').should('have.text', 'Your delivery address')
    this.page.locator('#address_invoice h3').should('have.text', 'Your billing address')
    this.page.locator('#address_delivery .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    this.page.locator('#address_invoice .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('#address_invoice .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('#address_invoice .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('#address_invoice .address_address1.address_address2').eq(2)
      .should('have.text', address2)

    this.page.locator('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 24: Download Invoice after purchase order', () => {
    let price1psc, price1pscNum, goodName
    this.page.locator('.overlay-content h2').eq(0).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    this.page.locator('.overlay-content p').eq(0).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    this.page.locator('a[data-product-id]').eq(1).click({force:true})
    this.page.locator('.modal-body a[href="/view_cart"]').click()
    this.page.locator('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    this.page.locator('.btn.btn-default.check_out').contains('Proceed To Checkout').click()
    this.page.locator('.modal-body a[href="/login"]').click()

    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    this.page.locator('input[data-qa="signup-name"]').type(userName)
    this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
    this.page.locator('button[data-qa="signup-button"]').click()

    // Checking for an already registered user and error message "Email Address already exist!"
    this.page.locator('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        this.page.locator('input[data-qa="login-email"]').type(userEmailDelete)
        this.page.locator('input[data-qa="login-password"]').type(userPassword)
        this.page.locator('button[data-qa="login-button"]').click()
        this.page.locator('a[href="/delete_account"]').click()
        this.page.locator('@loginButton').click()
        this.page.locator('input[data-qa="signup-name"]').type(userName)
        this.page.locator('input[data-qa="signup-email"]').type(userEmailDelete)
        this.page.locator('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    this.page.locator('#id_gender1').click()
    this.page.locator('input[data-qa="password"]').type(userPassword)
    this.page.locator('select[data-qa="days"]').select(1)
    this.page.locator('select[data-qa="months"]').select(1)
    this.page.locator('select[data-qa="years"]').select('1999')
    this.page.locator('#newsletter').check()
    this.page.locator('#optin').check()
    this.page.locator('input[data-qa="first_name"]').type('Anton')
    this.page.locator('input[data-qa="last_name"]').type('K')
    this.page.locator('input[data-qa="company"]').type('test_company_name')
    this.page.locator('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    this.page.locator('input[data-qa="address2"]').type('US, FL')
    this.page.locator('select[data-qa="country"]').select('United States')
    this.page.locator('input[data-qa="state"]').type('FL')
    this.page.locator('input[data-qa="city"]').type('Miami')
    this.page.locator('input[data-qa="zipcode"]').type('33101')
    this.page.locator('input[data-qa="mobile_number"]').type('1-703-555-567')
    this.page.locator('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    this.page.locator('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    cy.contains('li', 'Logged in as').find('b').should('have.text', userName)
    this.page.locator('.shop-menu a[href="/view_cart"]').click()
    this.page.locator('a.btn.btn-default.check_out').click()
    
    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    this.page.locator('[data-qa="checkout-info"] #address_delivery h3').should('have.text', 'Your delivery address')
    this.page.locator('[data-qa="checkout-info"] #address_invoice h3').should('have.text', 'Your billing address')
    this.page.locator('#address_delivery .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    this.page.locator('[data-qa="checkout-info"] #address_invoice .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    this.page.locator('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(0)
      .should('have.text', company)
    this.page.locator('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(1)
      .should('have.text', address)
    this.page.locator('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    
    cy.then(() => {
      this.page.locator('.cart_description h4 a').should('have.text', goodName)
    })
    cy.then(() => {
      this.page.locator('.cart_price p').should('have.text', price1psc)
    })

    this.page.locator('textarea[class="form-control"]').type('...some comment to order...')
    this.page.locator('a[href="/payment"]').click()
    this.page.locator('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    this.page.locator('input[data-qa="card-number"]').type('1234567890123456')
    this.page.locator('input[data-qa="cvc"]').type('111')
    this.page.locator('input[data-qa="expiry-month"]').type('12')
    this.page.locator('input[data-qa="expiry-year"]').type('2025')
    this.page.locator('button[data-qa="pay-button"]').click()
    
    this.page.locator('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    cy.intercept('GET', '/download_invoice/*').as('downloadInvoice')
    cy.contains('.btn', 'Download Invoice').click()
    cy.wait('@downloadInvoice').its('response.statusCode').should('eq', 200)
    this.page.locator('a[data-qa="continue-button"]').click()

    this.page.locator('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })
  
  it('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
    this.page.locator('.footer-widget .single-widget h2').scrollIntoView()
    this.page.locator('.single-widget h2').contains('Subscription').should('be.visible')
    this.page.locator('.single-widget h2')
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect()
        try {
          expect(rect.top).to.be.greaterThan(0)
          expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
        } catch (error) {
          Cypress.log({
            name: 'Visibility check',
            message: 'Subscription section is not visible within the viewport',
            consoleProps: () => {
                return {
                    rect,
                    errorMessage: error.message,
                };
            },
          });
          throw error;
        }
      })
    this.page.locator('#scrollUp').click()
    this.page.locator('div.carousel-inner div.item.active').eq(0)
      .contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible')
    this.page.locator('div.carousel-inner div.item.active').eq(0) 
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect()
        expect(rect.top).to.be.greaterThan(0)
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
      })
  })

  it('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
    this.page.locator('.footer-widget .single-widget h2').scrollIntoView()
    this.page.locator('.single-widget h2').contains('Subscription').should('be.visible')
    this.page.locator('.single-widget h2')
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect()
        expect(rect.top).to.be.greaterThan(0)
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
      })
      cy.scrollTo('top')
    this.page.locator('div.carousel-inner div.item.active').eq(0)
      .contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible')
    this.page.locator('div.carousel-inner div.item.active').eq(0) 
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect()
        expect(rect.top).to.be.greaterThan(0)
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
      })
  })
})