import { type Locator, type Page } from '@playwright/test';
export class propertyHomePage {
   
  readonly page: Page;
  propertyTab : Locator;
  createPropertyButton : Locator;
  fieldPropertyName : Locator;
  propertyType : Locator;
  emailField : Locator;
  saveButton : Locator;
  addressField: Locator;
  priceField: Locator;
  sizeField: Locator;
  companyField: Locator;
  
  

  constructor(page: Page) {
    this.page = page;
    this.propertyTab = this.page.getByRole('link', { name: 'propertys' });
    this.createPropertyButton = this.page.getByRole('link', { name: '+ Create Property' });
    this.fieldPropertyName = this.page.getByRole('textbox', { name: 'Property Name *' });
    this.addressField = this.page.getByRole('textbox', { name: 'Address *' });
    this.priceField = this.page.getByRole('spinbutton', { name: 'Price (USD) *' });
    this.sizeField = this.page.getByRole('textbox', { name: 'Size (optional)' });
    this.saveButton = this.page.getByRole('button', { name: 'Create Property' });
    this.companyField = this.page.getByLabel('Company *');
    
  }
  async navigateToListProperties() {
    await this.page.goto('http://127.0.0.1:5000/properties');
  }

  async createproperty(nameproperty:string, address: string, price: string, size:string, companyName:string) {
    await this.createPropertyButton.click();
    await this.fieldPropertyName.click();
    await this.fieldPropertyName.fill(nameproperty);
    await this.addressField.click();
    await this.addressField.fill(address);
    await this.priceField.click();
    await this.priceField.fill(price);
    await this.sizeField.click();
    await this.sizeField.fill(size);
    await this.companyField.click();
    await this.page.getByLabel('Company *').selectOption(companyName);
    await this.saveButton.click();
  }

  async deleteproperty(nameProperty: string) {
    await this.navigateToListProperties()
    const row = this.page.getByRole('row', { name: nameProperty });
    const deleteButton = row.locator('form >> button');
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await deleteButton.click();
  }

  async validateRejectPriceNegative (){
    await this. page.getByText('Price must be a positive').click();
  }

}