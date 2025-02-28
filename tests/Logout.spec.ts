import { test,expect} from '@playwright/test'
import {faker} from '@faker-js/faker'



test('Adding Product to Cart',async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('.bm-burger-button').click();
    await page.locator('.bm-item-list #logout_sidebar_link').click()
    const loginText = await page.locator('.login_logo').textContent()
    await expect(loginText).toEqual('Swag Labs')

    })
