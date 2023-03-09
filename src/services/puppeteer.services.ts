import puppeteer from "puppeteer-extra";
// import * as fs from 'fs'


import StealthPlugin from "puppeteer-extra-plugin-stealth"
puppeteer.use(StealthPlugin())

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// @ts-ignore
export async function Start(usuario: string):Array<any> {
    // @ts-ignore
    return puppeteer.launch({ headlesss: true })
      .then(async browser => {
        
        console.log(`Running tests on ${usuario}`)
        const page = await browser.newPage();
        await page.goto(`https://www.picuki.com/profile/${usuario}`);
        //const element = await page.waitForSelector('body')
        
        const selector = await page.evaluate(() => {
            // @ts-ignore
            return Array.from(document.querySelectorAll("img.post-image")).map(x => x.currentSrc)
        })

        //await fs.writeFile("names.txt", selector.join("\r\n"), a => console.log(a))
                
        const toJson =JSON.stringify(selector)        
        console.log(toJson) 

        await browser.close()
        console.log("All done.")
        return selector
      })
      .catch(error=>{
        console.log(error);
        return []
      })
}



