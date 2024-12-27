import BasePage from "./BasePage.js";

class TestCasesPage extends BasePage {

constructor(page) {
  super(page)
  this.page = page;
}

getHeaderTestCasePage = () => this.page.locator('h2.title')
getAllPagePanelTitles = () => this.page.locator('.panel-title')
getFeedbackForUsTitle = () => this.page.locator('.panel-title a').last()
  
}

export default TestCasesPage;