import { type Locator, type Page } from '@playwright/test';
export class companiesHomePage {
   
  readonly page: Page;
  companieTab : Locator;
  createCompanieButton : Locator;
  fieldCompanieName : Locator;
  companieType : Locator;
  emailField : Locator;
  saveButton : Locator;
  
  

  constructor(page: Page) {
    this.page = page;
    this.companieTab = this.page.getByRole('link', { name: 'Companies' });
    this.createCompanieButton = this.page.getByRole('link', { name: '+ Create Company' });
    this.fieldCompanieName = this.page.getByRole('textbox', { name: 'Company Name *' });
    this.companieType = this.page.getByText('Company Type * Select type');
    this.emailField = this.page.getByRole('textbox', { name: 'Email (optional)' });
    this.saveButton = this.page.getByRole('button', { name: 'Create Company' });
    
  }
  

  async navigate() {
    await this.page.goto('http://127.0.0.1:5000/properties');
  }

  async navigateToListCompanies() {
    await this.page.goto('http://127.0.0.1:5000/companies');
  }

  async createCompanie(nameCompanie:string, type: string, email: string) {
    await this.companieTab.click();
    await this.createCompanieButton.click();
    await this.fieldCompanieName.click();
    await this.fieldCompanieName.fill(nameCompanie);
    await this.companieType.click();
    await this.page.getByLabel('Company Type *').selectOption(type);
    await this.emailField.click();
    await this.emailField.fill(email);
    await this.saveButton.click();
  }

  async deleteCompanie(nameCompanie: string) {
    await this.navigateToListCompanies();
    const row = this.page.getByRole('row', { name: nameCompanie });
    const deleteButton = row.locator('form >> button');
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await deleteButton.click();
  }

}