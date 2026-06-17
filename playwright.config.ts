import { defineConfig, devices } from '@playwright/test';

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
