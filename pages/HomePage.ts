import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly header: Locator;
    readonly mainBlock: Locator;
    readonly searchInput: Locator;
    readonly signInLink: Locator;
    readonly projectsLink: Locator;
    readonly downloadTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('#header');
        this.mainBlock = page.locator('#main');
        this.searchInput = page.locator('input#q');
        this.signInLink = page.locator('a.login');
        this.projectsLink = page.locator('a.projects');
        this.downloadTab = page.locator('a.download');
    }

    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}