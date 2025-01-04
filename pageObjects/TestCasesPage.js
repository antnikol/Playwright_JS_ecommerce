import BasePage from "./BasePage.js";

class TestCasesPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page;
}

getHeaderTestCasePage = () => this.page.getByRole('heading', { level: 2, name: 'Test Cases' })
getAllPagePanelTitles = () => this.page.locator('.panel-title')
getFeedbackForUsTitle = () => this.page.locator('.panel-title a').last()

// css.locators:
// getHeaderTestCasePage = () => this.page.locator('h2.title')
  
}

export default TestCasesPage;