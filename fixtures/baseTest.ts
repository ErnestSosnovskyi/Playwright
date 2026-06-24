import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import testDataJson from './testData.json';

type RedmineFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    testData: typeof testDataJson;
};

export const test = baseTest.extend<RedmineFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    testData: async ({}, use) => {
        await use(testDataJson);
    }
});

export { expect } from '@playwright/test';