import { test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test.beforeEach('Test Flight Search',async ({page})=>{
await page.goto("https://www.saucedemo.com/");
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.locator('#login-button').click();
})


test('Adding Product to Cart',async ({page})=>{
const TargetItemName = 'Sauce Labs Bolt T-Shirt'
const TargetElement = await page.locator(".inventory_item_description").filter({hasText:TargetItemName})
const TargetButton = await TargetElement.getByRole('button',{name:'Add to cart'})
await TargetButton.click();
await page.locator(".shopping_cart_container a").click();
await page.locator('.cart_footer').getByRole('button',{name:'Checkout'}).click();

const first_name = faker.person.firstName();
const last_name = faker.person.lastName();
const zipcode = faker.number.int({min:10000, max: 99999}).toString();

await page.locator('.checkout_buttons').getByRole('button',{name:'Continue'}).click()
let error_msg = await page.locator(".error-message-container h3").textContent()
await expect(error_msg).toEqual('Error: First Name is required');


await page.getByPlaceholder('First Name').fill(first_name);
await page.locator('.checkout_buttons').getByRole('button',{name:'Continue'}).click()
error_msg = await page.locator(".error-message-container h3").textContent()
await expect(error_msg).toEqual('Error: Last Name is required');


await page.getByPlaceholder('Last Name').fill(last_name);
await page.locator('.checkout_buttons').getByRole('button',{name:'Continue'}).click()
error_msg = await page.locator(".error-message-container h3").textContent()
await expect(error_msg).toEqual('Error: Postal Code is required');

await page.getByPlaceholder('Zip/Postal Code').fill(zipcode);
await page.locator('.checkout_buttons').getByRole('button',{name:'Continue'}).click()
await page.locator('.cart_footer').getByRole('button',{name:'Finish'}).click();






const ConfirmationMessage =  await page.locator('#checkout_complete_container h2').textContent();
//validation that order has successfully been placed
await expect(ConfirmationMessage).toEqual('Thank you for your order!');

})