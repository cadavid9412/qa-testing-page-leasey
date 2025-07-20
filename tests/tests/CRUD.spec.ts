import { test } from "@playwright/test";
import {companiesHomePage} from "../pages/companiesPage";
import { propertyHomePage } from "../pages/propertyPage";


test.describe('given a user with access to leasey page', () =>{

   test ('when I try to create a companie', async ({page})=>{
    const companyPage = new companiesHomePage(page);
    await companyPage.navigate();
    await companyPage.createCompanie('sebastian companie', 'Real Estate','sebastian@gmail.com')
    const propertyPage = new propertyHomePage(page);
    await propertyPage.navigateToListProperties();
    await propertyPage.createproperty('sebastian property','calle 60','10','20','sebastian companie')
    await companyPage.deleteCompanie('sebastian companie')
    await propertyPage.deleteproperty('sebastian property')
  })

  test ('when I try to list a companies', async ({page})=>{
    const homePage = new companiesHomePage(page);
    await homePage.navigateToListCompanies();
  })

  test ('when I try to list a properties', async ({page})=>{
    const propertyPage = new propertyHomePage(page);
    await propertyPage.navigateToListProperties();
  })

 
})

