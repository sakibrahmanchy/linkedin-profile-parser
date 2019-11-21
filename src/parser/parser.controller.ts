import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { ParserService } from './parser.service';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

@Controller()
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/parse')
  async getParsed(@Req() req, @Res() res) {
      const linkedinUrl = req.query.url ? req.query.url : 'https://www.linkedin.com/in/sakibur-rahaman-chowdhury-77359b132/';
      const data = await this.parserService.parse(linkedinUrl);
      console.log(data);
      res.redirect('http://192.168.0.102:4200/');
      console.log("Data has been parsed");
    }
}
