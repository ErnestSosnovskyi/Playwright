import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import testData from '../fixtures/testData.json';

test.describe('Redmine.org Test Suite', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    // TC001 - Checking if the home page has loaded successfully
    test('TC001: Home page successfully loaded', async({ page }) => {
        await expect(homePage.header).toBeVisible();
        await expect(homePage.mainBlock).toBeVisible();
        await expect(homePage.mainBlock).not.toBeEmpty();
    });

    // TC002 - Checking if the site search works
    test('TC002: Site search works', async({ page }) => {
        await homePage.fillSearch(testData.searchQuery);
        await expect(homePage.searchInput).toHaveValue(testData.searchQuery);

        await homePage.submitSearch();

        await expect(page).toHaveURL(/.*\/projects\/redmine\/search.*/);
        const resultsBlock = page.locator('dl#search-results');
        await expect(resultsBlock).toBeVisible();
        const firstSearchResult = resultsBlock.locator('dt').first();
        await expect(firstSearchResult).toBeVisible();
    });

    // TC003 - Checking whether login with incorrect data is blocked
    test('TC003: Login with incorrect data is blocked', async({ page }) => {
        const loginPage = new LoginPage(page);
        
        await homePage.goToSignIn();
        await expect(page).toHaveURL(/.*\/login/);

        const username = process.env.REDMINE_USERNAME!;
        const password = process.env.REDMINE_PASSWORD!;
        const expectedError = testData.loginErrorMessage;

        await loginPage.fillCredentials(username, password);
        
        await expect(loginPage.loginInput).toHaveValue(username);
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
        await expect(loginPage.passwordInput).toHaveValue(password);

        await loginPage.submitLogin();
        await expect(loginPage.flashError).toBeVisible();
        await expect(loginPage.flashError).toContainText(expectedError);
    });

    // TC004 - Checking if the transition to the "Проекты" page is successful
    test('TC004: Transition to Projects page', async({ page }) => {
        await homePage.goToProjects();

        await expect(page).toHaveURL(/.*\projects/);
        await expect(page.locator('h2')).toContainText('Проекты');

        const filterBlock = page.locator('div#projects-index');
        await expect(filterBlock).toBeVisible();
    });

    // TC005 - Checking file downloads from the "Download" page
    test('TC005: File downloads from Download page', async({ page }) => {
        await homePage.goToDownload();
        await expect(page).toHaveURL(/.*\/projects\/redmine\/wiki\/Download/);
        
        const heading = page.locator('h1').filter({ hasText: 'Download' });
        await expect(heading).toBeVisible();
        const downloadLink = page.locator('a[href$=".tar.gz"]').first();

        const downloadPromise = page.waitForEvent('download');
        await downloadLink.click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toContain('.tar.gz');
        await download.saveAs('./downloads/' + download.suggestedFilename());
    });
});