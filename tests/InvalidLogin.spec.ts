import { test,expect} from '@playwright/test'

test('Invalid login ',async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_use');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const err_msg = await page.locator('.error-message-container').textContent();
    await expect(err_msg).toEqual('Epic sadface: Username and password do not match any user in this service')

})