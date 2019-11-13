import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import cheerio from 'cheerio';
const puppeteer = require('puppeteer');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/in/sakibur-rahaman-chowdhury-77359b132/');
    await page.waitFor(1000);
    await page.screenshot({ path: 'my-profile-screen-shot.png' });
    const result = await page.evaluate((node) => {
      // console.log(node);
      const name = document.querySelector('.ember-view');
      // let title = document.querySelector('.headline').innerText;
      // let summary = document.querySelector('.headline').childNodes[0].innerText;

      console.log(name);
    });
  }
}
