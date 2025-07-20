import { test, expect } from '@playwright/test';
import { companiesHomePage } from '../pages/companiesPage';
import { propertyHomePage } from '../pages/propertyPage';

test.describe('Leasey.AI Edge Cases and Validation Tests', () => {

  test('Create a company with invalid email', async ({ page }) => {
    const companyPage = new companiesHomePage(page);
    await companyPage.navigate();
    await companyPage.createCompanie('Invalid Email Company', 'Broker', 'invalid-email');
    const emailField = companyPage.emailField;
    const isValid = await emailField.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBeFalsy();
  });

  test('Create a property with negative price', async ({ page }) => {
    const companyPage = new companiesHomePage(page);
    const propertyPage = new propertyHomePage(page);

    await companyPage.navigate();
    await companyPage.createCompanie('Negative Price Inc.', 'Construction', 'test@gmail.com');

    await propertyPage.navigateToListProperties();
    await propertyPage.createproperty('Negative Price Property', 'Main Street', '-1000', '500', 'Negative Price Inc.');
    await propertyPage.validateRejectPriceNegative()
  });

  test('Submit property form with required fields left blank', async ({ page }) => {
    const propertyPage = new propertyHomePage(page);
    await propertyPage.navigateToListProperties();

    await propertyPage.createPropertyButton.click();
    await propertyPage.saveButton.click();

    const propertyField = propertyPage.fieldPropertyName;
    const isValid = await propertyField.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBeFalsy();
  });

  test('Verify handling of long strings in company creation', async ({ page }) => {
    const companyPage = new companiesHomePage(page);
    const longName = 'A'.repeat(2000);

    await companyPage.navigate();
    await companyPage.createCompanie(longName, 'Real Estate', 'longname@gmail.com');
  });

  test('Check that property creation fails when no company is selected', async ({ page }) => {
    const propertyPage = new propertyHomePage(page);

    await propertyPage.navigateToListProperties();
    await propertyPage.createPropertyButton.click();

    await propertyPage.fieldPropertyName.fill('No Company Selected');
    await propertyPage.addressField.fill('Main Street');
    await propertyPage.priceField.fill('5000');
    await propertyPage.saveButton.click();
    const companyField = propertyPage.companyField;
    const isValid = await companyField.evaluate((input: HTMLInputElement) => input.validity.valid);
    expect(isValid).toBeFalsy();
  });

  test('Exploratory: Attempt to create property with special characters', async ({ page }) => {
    const companyPage = new companiesHomePage(page);
    const propertyPage = new propertyHomePage(page);

    await companyPage.navigate();
    await companyPage.createCompanie('Special Char Inc.', 'Real Estate', 'special@gmail.com');

    await propertyPage.navigateToListProperties();
    await propertyPage.createproperty('!@#$%^&*()', '123 Main St', '1000', '200', 'Special Char Inc.');

    await expect(page.locator('text=!@#$%^&*()')).toBeVisible();
  });

  test('Exploratory: Attempt SQL injection in company creation', async ({ page }) => {
    const companyPage = new companiesHomePage(page);

    await companyPage.navigate();
    await companyPage.createCompanie("'; DROP TABLE companies;--", 'Broker', 'sqlinjection@gmail.com');

    await expect(page.locator("text='; DROP TABLE companies;--")).toBeVisible();
  });

  test('Edge Case: Create property with zero price', async ({ page }) => {
    const companyPage = new companiesHomePage(page);
    const propertyPage = new propertyHomePage(page);

    await companyPage.navigate();
    await companyPage.createCompanie('Zero Price Inc.', 'Broker', 'zero@gmail.com');

    await propertyPage.navigateToListProperties();
    await propertyPage.createproperty('Zero Price Property', 'Zero Street', '0', '300', 'Zero Price Inc.');

    await propertyPage.validateRejectPriceNegative()
  });

  test('Edge Case: Create company with extremely short name', async ({ page }) => {
    const companyPage = new companiesHomePage(page);

    await companyPage.navigate();
    await companyPage.createCompanie('xx', 'Construction', 'shortname@gmail.com');

    await expect(page.locator('text=xx')).toBeVisible();
  });

});
