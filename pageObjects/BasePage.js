class BasePage {
  constructor(page) {
    this.page = page
  }


  getSignupLoginButton = () => this.page.locator('.nav a[href="/login"]')
  getListHeaderButtons = () => this.page.locator('.nav.navbar-nav')
  getDeleteAccountButton = () => this.page.locator('a[href="/delete_account"]')
  getAccountDeletedConfirmMessage = () => this.page.locator('h2[data-qa="account-deleted"] b')
  getLogoutButton = () => this.page.locator('a[href="/logout"]')
  getHeaderHomeIcon = () => this.page.locator(".fa-home")
  getContactUsButton = () => this.page.locator('a[href="/contact_us"]')
  getProductsHeaderButton = () => this.page.locator('.shop-menu a[href="/products"]')
  getSubscriptionFooterSection = () => this.page.locator('.single-widget h2')
  getSubscriptionFooterEmailField = () => this.page.locator('#susbscribe_email')
  getSubscribeButton = () => this.page.locator('button#subscribe')
  getSuccessSubscribeMessage = () => this.page.locator('.alert-success.alert')
  getViewCartHeaderButton = () => this.page.locator('.shop-menu a[href="/view_cart"]')
  getTestCasesHeaderMenuButton = () => this.page.locator('.nav a[href="/test_cases"]')

  getPageUrl = () => this.page.url()
  getScrollUpButton = () => this.page.locator('#scrollUp')
  getCopyrightText = () => this.page.locator('.footer-bottom .pull-left')
  getActiveBreadcrumbs = () => this.page.locator('.breadcrumb .active')
  getRegisterLoginModalButton = () => this.page.locator('.modal-body a[href="/login"]')
  getHeaderHomeButton = () => this.page.locator('.shop-menu a[href="/"]')

  //Left-Sidebar
  getLeftSidebarCategoryList = () => this.page.locator('a[data-parent="#accordian"]')
  getLeftSidebarSubCategoryList = () => this.page.locator('.panel-body a')
  getLeftSidebarBrandsHeading = () => this.page.locator('.brands_products h2')
  getLeftSidebarBrandsList = () => this.page.locator('.brands-name li')
  getLeftSidebarBrandNameList = () => this.page.locator('.brands-name li a')
  getLeftSidebarBrandCountList = () => this.page.locator('.brands-name li a span')

  async getAccountDeletedConfirmMessageText(){
    return this.getAccountDeletedConfirmMessage().innerText()
  }

  async getPageTitle() {
    return await this.page.title();
  }
   
  async countLeftSidebarBrandsList() {
    return await this.getLeftSidebarBrandsList().count()
  }

  async open() {
    await this.page.goto("/");
  }

  getSavedVariableAs(variable) {
    return variable
  }

  async getLeftSidebarRandomBrandNameAndCount(randomNumber) {
    return (await this.getLeftSidebarBrandNameList().nth(randomNumber).textContent()).trim();
  }

  async getLeftSidebarRandomBrandCount(randomNumber) {
    return (await this.getLeftSidebarBrandCountList().nth(randomNumber).textContent())
  }

  async getBrandName(brandNumber, brandCount) {
    // const brandName = await this.page.locator('.brands-name ul li a').nth(brandNumber).locator(`text=${}`).evaluate(element => {
    //   return element.textContent.replace(/\(.*\)/, '').trim();
    // })
    const nameAndCount = await this.getLeftSidebarRandomBrandNameAndCount(brandNumber)
    return nameAndCount.replace(brandCount, '').trim()
  }
  
  async clickLeftSidebarRandomBrandName(randomNumber) {
    await this.getLeftSidebarBrandNameList().nth(randomNumber).click()
    return this
  }

  async getLeftSidebarRandomBrandHref(randomNumber) {
    return await this.getLeftSidebarBrandNameList().nth(randomNumber).getAttribute('href');
  }

  async clickSignupLoginButton() {
    await this.getSignupLoginButton().click();
    return this;
  }

  async clickDeleteAccountButton() {
    await this.getDeleteAccountButton().click()
    return this
  }

  async clickLogoutButton() {
    await this.getLogoutButton().click()
    return this
  }

  async clickContactUsButton() {
    await this.getContactUsButton().click()
    return this
  }

  async clickProductsHeaderButton() {
    await this.getProductsHeaderButton().click()
    return this
  }

  async typeSubscriptionFooterEmailField(subscriptionEmail) {
    await this.getSubscriptionFooterEmailField().type(subscriptionEmail);
    return this;
  }  

  async clickSubscribeButton() {
    await this.getSubscribeButton().click()
    return this
  }

  async clickViewCartHeaderButton() {
    await this.getViewCartHeaderButton().click()
    return this
  }

  async scrollToBottom() {
    const scrollHeight = await this.page.evaluate(() => document.body.scrollHeight);
    const innerHeight = await this.page.evaluate(() => window.innerHeight);
    if (scrollHeight > innerHeight) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
    return this;
  }
  // async scrollToBottom() {
  //   await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //   return this;
  // }

  async scrollToCopyright() {
    await this.getCopyrightText().scrollIntoViewIfNeeded();
    return this;
  }
  
  async scrollToHeaderHomeButton() {
    await this.getHeaderHomeButton().scrollIntoViewIfNeeded()
    return this;
  }

  async scrollToTop() {
    const scrollHeight = await this.page.evaluate(() => document.body.scrollHeight);
    const innerHeight = await this.page.evaluate(() => window.innerHeight);
    if (scrollHeight > innerHeight) {
      await this.page.evaluate(() => window.scrollTo(0, 0));
    }
    return this;
  }
  // async scrollToTop() {
  //   await this.page.evaluate(() => window.scrollTo(0, 0));
  //   return this;
  // }
  
  async clickTestCasesHeaderMenuButton() {
    await this.getTestCasesHeaderMenuButton().click()
    return this
  }

  async clickLeftSidebarCategory(categoryName) {
    await this.page.locator(`a[href="#${categoryName}"]`).click();
    return this;
  }

  // async clickSubCategoryRopeCategory(subCategoryName, categoryName) {
  //   const categoryLocator = this.getLeftSidebarCategoryList().locator(`#${categoryName}`)
  //   const subCategoryLocator = categoryLocator.locator(`text=${subCategoryName}`)
  //   await subCategoryLocator.click();
  //   return this;
  // }

  async clickSubCategoryRopeCategory(subCategoryName, categoryName) {
    const categoryPanelLocator = await this.page.locator(`#${categoryName}`);
    // await categoryPanelLocator.waitFor({ state: 'visible' });
    const subCategoryLocator = categoryPanelLocator.locator('a').locator(`text=${subCategoryName}`);
    await subCategoryLocator.click();
    return this;
  }

  async clickLeftSidebarSubCategory(subCategoryName) {
    await this.getLeftSidebarSubCategoryList().locator(`text=${subCategoryName}`).click()
    return this
  }

  async clickScrollUpButton() {
    await this.getScrollUpButton().click({force: true})
    await this.page.waitForTimeout(3000)
    return this
  }

  async clickRegisterLoginModalButton() {
    await this.getRegisterLoginModalButton().click()
    return this
  }

}

export default BasePage;