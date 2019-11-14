import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('http://localhost:4200/start', 302)
  async getParsed(@Res() res) {
    const browser = await puppeteer.launch({ headless: false, userDataDir: './user_data' });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/in/sakibur-rahaman-chowdhury-77359b132/');
    const content = await page.content();
    await page.close();
    return content;
    // await page.goto('https://www.facebook.com/freakinsakib');
    // // await page.screenshot({ path: 'my-profile-screen-shot.png' });
    // const result = await page.evaluate((node) => {
    //   // console.log(node);
    //   // const name = document.querySelector('.ember-view');
    //   // let title = document.querySelector('.headline').innerText;
    //   // let summary = document.querySelector('.headline').childNodes[0].innerText;
    //
    //   console.log(name);
    // });
  }
}
