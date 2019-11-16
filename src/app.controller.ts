import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
