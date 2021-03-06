import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { Experience } from '../interfaces/experience.interface';
import { Education } from '../interfaces/education.interface';
import { Project } from '../interfaces/project.interface';

@Injectable()
export class ParserService {
  async parse(url: string) {
    const browser = await puppeteer.launch({ headless: true, userDataDir: './user_data', args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    const profileUrl = url;
    const loginUrl = 'https://www.linkedin.com/login';
    const notPreviouslyLoggedIn = false;
    await page.goto(profileUrl);
    await page.screenshot({ path: 'screenshot.jpg'});
    await page.setUserAgent
    ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    const cookiesObject = await page.cookies();
    const pathCookie = cookiesObject.filter(cookie => {
      return cookie.name === 'fid';
    });
    if (pathCookie.path === '/') {
      await page.goto(loginUrl);
    } else {
      const $ = cheerio.load(await page.content());
      const experiences: Experience[] = [];
      $('.experience li').each((ex, item) => {
        const experience: Experience = {
          title: $(item).find('.experience-item__title').text(),
          subTitle: $(item).find('.experience-item__subtitle-link').text(),
          startDate: $(item).find('.date-range__start-date').text(),
          endDate: $(item).find('.date-range__end-date').text(),
          duration: $(item).find('.date-range__duration').text(),
          location: $(item).find('.experience-item__location').text(),
          description: $(item).find('.show-more-less-text__text--less').text(),
          imageUrl: $(item).find('img').attr('data-delayed-url'),
        };
        experiences.push(experience);
      });

      const educations: Education[] = [];
      $('.education li').each((ex, item) => {
        const education: Education = {
          title: $(item).find('.result-card__title').text(),
          subTitle: $(item).find('.result-card__subtitle-link').text(),
          startDate: $(item).find('.date-range__start-date').text(),
          endDate: $(item).find('.date-range__end-date').text(),
          duration: $(item).find('.date-range__duration').text(),
          location: $(item).find('.experience-item__location').text(),
          activities: $(item).find('.education__item--activities-and-societies').text(),
          description: $(item).find('.show-more-less-text__text--less').text(),
          imageUrl: $(item).find('img').attr('data-delayed-url'),
        };
        educations.push(education);
      });

      const projects: Project[] = [];
      $('.projects li').each((ex, item) => {
        const project: Project = {
          title: $(item).find('.result-card__title-link').text(),
          startDate: $(item).find('.date-range__start-date').text(),
          endDate: $(item).find('.date-range__end-date').text(),
          duration: $(item).find('.date-range__duration').text(),
          description: $(item).find('.show-more-less-text__text--less').text(),
          link: $(item).find('.personal-project__button').attr('href'),
        };
        projects.push(project);
      });
      const data = {
        name:  $('.top-card-layout__title').text(),
        headline: $('.top-card-layout__headline').text(),
        about: $('.summary > p').text(),
        experiences,
        educations,
        projects,
      };
      await page.close();
      await browser.close();
      return data;
    }
  }
}
