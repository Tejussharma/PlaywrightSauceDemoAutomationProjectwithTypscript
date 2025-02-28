import { test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test.beforeEach('Test Flight Search',async ({page})=>{
await page.goto("https://www.saucedemo.com/");
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.locator('#login-button').click();
})


test('Adding Product to Cart',async ({page})=>{
    await page.locator('.product_sort_container').click();
    await page.locator('.product_sort_container').selectOption('Price (low to high)')
    const firstItemPrice = await page.locator(".inventory_item_description .inventory_item_price").first().allTextContents();
    await expect(firstItemPrice).toContain('$7.99')


})