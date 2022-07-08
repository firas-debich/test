export default function(page){
    return new Promise(async(resolve=>{
        await page.goto("https://www.facebook.com/");
        const loginInput = "#email"
        const passwordInput = "#pass"
        await page.waitForSelector(loginInput);
        await page.waitForSelector(passwordInput);
        await page.evaluate((login,password,loginInput,passwordInput)=>{
          document.querySelector(loginInput).value = login;
          document.querySelector(passwordInput).value = password;
        },"firasdebich06@gmail.com","Hovcu3378#@",loginInput,passwordInput);
        await page.waitForTimeout(1000);
        const loginButton = "button[type='submit']" 
        await page.waitForSelector(loginButton);
          await page.click(loginButton);
        resolve()
    }))
}