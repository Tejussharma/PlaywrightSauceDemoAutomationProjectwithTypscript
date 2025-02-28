import { test,expect} from '@playwright/test';

test.beforeEach('Test Flight Search',async ({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    })

test('visual testing ',async ({page})=>{
const root = await page.locator('#root');
await page.locator('.product_sort_container').click();
await expect(root).toHaveScreenshot()
})










