import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<void> {
    const browser = await puppeteer.launch({ headless: false, userDataDir: './user_data' });
    const page = await browser.newPage();
    const profileUrl = 'https://www.linkedin.com/in/sakibur-rahaman-chowdhury-77359b132/';
    const loginUrl = 'https://www.linkedin.com/login';
    const notPreviouslyLoggedIn = false;
    await page.goto(profileUrl);
    const cookiesObject = await page.cookies();
    const pathCookie = cookiesObject.filter(cookie => {
      return cookie.name === 'fid';
    });
    if (pathCookie.path === '/') {
      await page.goto(loginUrl);
    } else {
      const $ = cheerio.load(await page.content());
      console.log($('.top-card-layout__title').text());
    }
    // await page.close();
    // await browser.close();
    // const $ = cheerio.load(await page.content());

    // await page.waitFor(1000);
    // await page.screenshot({ path: 'my-profile-screen-shot.png' });
    // const result = await page.evaluate((node) => {
    //   // console.log(node);
    //   const name = document.querySelector('.ember-view');
    //   // let title = document.querySelector('.headline').innerText;
    //   // let summary = document.querySelector('.headline').childNodes[0].innerText;
    //
    //   console.log(name);
    // });
  }
}
