import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',  
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter:[
    ['html'],
    ['allure-playwright']
  ],  
  use: {
    baseURL: 'https://www.redmine.org/',
    trace: 'on-first-retry',
    locale: 'ru-RU',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },    
  ],
});
