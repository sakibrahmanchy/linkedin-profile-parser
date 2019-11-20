import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { ParserService } from './parser.service';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

@Controller()
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/parse')
  // @Redirect('http://192.168.0.102:4200/start', 302)
  async getParsed(@Req() req, @Res() res) {
      const linkedinUrl = req.query.url ? req.query.url : 'https://www.linkedin.com/in/sakibur-rahaman-chowdhury-77359b132/';
      const data = await this.parserService.parse(linkedinUrl);
      console.log("Data has been parsed");
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
