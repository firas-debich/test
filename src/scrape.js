import puppeteer from "puppeteer";
import scroll from '@pierreminiggio/puppeteer-page-scroller'
export default async function (show) {
  const browser = await puppeteer.launch({
    headless: !show,
    args: ["--disable-notifications"],
  });
  const page = await browser.newPage();
  // go to the facebook page
  await page.goto("https://www.facebook.com/");
  const loginInput = "#email";
  const passwordInput = "#pass";
  await page.waitForSelector(loginInput);
  await page.waitForSelector(passwordInput);
  await page.evaluate(
    (login, password, loginInput, passwordInput) => {
      document.querySelector(loginInput).value = login;
      document.querySelector(passwordInput).value = password;
    },
    "facebook adress",
    "facbook mpds",
    loginInput,
    passwordInput
  );
  await page.waitForTimeout(1000);
  const loginButton = "button[type='submit']";
  await page.waitForSelector(loginButton);
  await page.click(loginButton);
  await page.waitForTimeout(5000);
  await page.goto("https://www.facebook.com/firas.debbich/friends")
 scroll(page,3000)
  // scraping the names of the friends list on facebook and their profile picture
    const friends = await page.evaluate(() => {
        const friends = document.querySelectorAll(
            "a"
        );
        const friendNames = [];
        const friendPictures = [];
        for (let i = 0; i < friends.length; i++) {
            friendNames.push(friends[i].innerText);
           
        }
        return { friendNames, friendPictures };
        }
    );
  console.log(friends);
  await page.waitForTimeout(10000);
    await browser.close();
    console.log(friends);
}
