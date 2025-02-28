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
const ButtonAfterClick = await page.locator(".inventory_item_description").filter({hasText:TargetItemName}).getByRole('button');
//validation of button label change
expect(ButtonAfterClick).toContainText('Remove')
await page.locator(".shopping_cart_container a").click();
const title = await page.locator('.title').textContent();
//validation that we are on Cart Page
await expect(title).toEqual('Your Cart');
const ItemNameOnCart= await page.locator('.cart_list .cart_item .cart_item_label').locator('#item_1_title_link').textContent();
const NumberOfItems= await page.locator('.cart_list .cart_quantity').textContent();
//validation that the product name is matching with target product
await expect(ItemNameOnCart).toEqual(TargetItemName);
console.log(ItemNameOnCart)
//validation the quantity of product
await expect(NumberOfItems).toEqual("1");
console.log(NumberOfItems)

await page.locator('.cart_footer').getByRole('button',{name:'Checkout'}).click();
const titleOnCheckout = await page.locator('.title').textContent();
//validation we are on checkout page
await expect(titleOnCheckout).toEqual("Checkout: Your Information");
const first_name = faker.person.firstName();
const last_name = faker.person.lastName();
const zipcode = faker.number.int({min:10000, max: 99999}).toString();
await page.getByPlaceholder('First Name').fill(first_name);
await page.getByPlaceholder('Last Name').fill(last_name);
await page.getByPlaceholder('Zip/Postal Code').fill(zipcode);
await page.locator('.checkout_buttons').getByRole('button',{name:'Continue'}).click()
const ItemNameOnCheckout= await page.locator('.cart_list .cart_item .cart_item_label').locator('#item_1_title_link').textContent();
//validation that the product name is matching with target product
await expect(ItemNameOnCheckout).toEqual(TargetItemName);
await page.locator('.cart_footer').getByRole('button',{name:'Finish'}).click();
const ConfirmationMessage =  await page.locator('#checkout_complete_container h2').textContent();
//validation that order has successfully been placed
await expect(ConfirmationMessage).toEqual('Thank you for your order!');

})