import { test,expect} from '@playwright/test'

test('Invalid login ',async({page})=>{

   const creds = [
    { user: 'standard_use', password : 'secret_Sauce'} ,{ user: 'standard_use', password : 'secret_Sauc'},  
    { user: 'standard_user', password : 'secret_Sauc'}  ,{ user: 'standard_user', password : 'secret_sauce'}  
                 ]

    for ( const cred in creds){             

    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill(creds[cred].user);
    await page.getByPlaceholder('Password').fill(creds[cred].password);
    await page.locator('#login-button').click();
    if(creds[cred].user == 'standard_user' && creds[cred].password=='secret_sauce'){
        expect(await page.locator('.app_logo')).toContainText('Swag Labs')
         }

     else{    
    const err_msg = await page.locator('.error-message-container').textContent();
    await expect(err_msg).toEqual('Epic sadface: Username and password do not match any user in this service')
     }
   

    }

})