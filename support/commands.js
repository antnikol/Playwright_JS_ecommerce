import { user } from '../fixtures/api.json';
import HomePage from '../pageObjects/HomePage';
import LoginPage from '../pageObjects/LoginPage';
import BasePage from '../pageObjects/BasePage';
import SignUpPage from '../pageObjects/SignUpPage';

const homePage = new HomePage();
const loginPage = new LoginPage();
const basePage = new BasePage();
const signupPage = new SignUpPage();

const USEREMAIL = user.email;
const PASSWORD = user.password;
const ErrorLoginMessageLocator = 'form[action="/login"] > p';

export async function deleteUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  await homePage.clickSignupLoginButton(page);
  await loginPage.typeEmailLoginTextField(page, userEmail);
  await loginPage.typePasswordLoginTextField(page, pass);
  await loginPage.clickLoginButton(page);

  const errorMessageVisible = await page.locator(ErrorLoginMessageLocator).isVisible();

  if (errorMessageVisible) {
    console.log('Error message found.');
    await loginPage.getErrorLoginMessage(page).toHaveText('Your email or password is incorrect!');
  } else {
    console.log('Error message does not exist in the DOM.');
    await homePage.clickDeleteAccountButton(page);
    await basePage.getAccountDeletedConfirmMessage(page).toContainText('Account Deleted!');
  }
}

export async function registerUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  await deleteUser(page); 
  await homePage.clickSignupLoginButton(page);
  
  await loginPage.typeNameSignupTextField(page, user.name);
  await loginPage.typeEmailSignupTextField(page, user.email);
  await loginPage.clickSignupButton(page);
  
  await signupPage.checkTitleMrRadioButton(page);
  await signupPage.typePasswordTextField(page, user.password);
  await signupPage.selectBirthDay(page, user.birth_date);
  await signupPage.selectBirthMonth(page, user.birth_month);
  await signupPage.selectBirthYear(page, user.birth_year);
  await signupPage.checkNewsletterCheckbox(page);
  await signupPage.checkSpecialOffersCheckbox(page);
  
  await signupPage.typeFirstNameTextField(page, user.firstname);
  await signupPage.typeLastNameTextField(page, user.lastname);
  await signupPage.typeCompanyTextField(page, user.company);
  await signupPage.typeAddressTextField(page, user.address1);
  await signupPage.typeAddress2TextField(page, user.address2);
  await signupPage.selectCountryList(page, user.country);
  await signupPage.typeStateTextField(page, user.state);
  await signupPage.typeCityTextField(page, user.city);
  await signupPage.typeZipCodeTextField(page, user.zipcode);
  await signupPage.typeMobileNumberTextField(page, user.mobile_number);
  
  await signupPage.clickCreateAccountButton(page);
  await signupPage.clickContinueButton(page);
  
  await homePage.getListHeaderButtons(page).toContainText(user.name);
}

export async function loginUser(page, userEmail = USEREMAIL, pass = PASSWORD) {
  await basePage.clickSignupLoginButton(page);
  await loginPage.getLoginFormHeader(page).toHaveText('Login to your account');
  
  await loginPage.typeEmailLoginTextField(page, user.email);
  await loginPage.typePasswordLoginTextField(page, user.password);
  await loginPage.clickLoginButton(page);
  
  await homePage.getListHeaderButtons(page).toContainText(user.name);
}

export async function deleteUserAfterRegistration(page) {
  await homePage.clickDeleteAccountButton(page);
  await basePage.getAccountDeletedConfirmMessage(page).toContainText('Account Deleted!');
}

