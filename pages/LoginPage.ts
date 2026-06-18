import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly flashError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator('input#username');
        this.passwordInput = page.locator('input#password');
        this.loginButton = page.locator('input[name="login"]');
        this.flashError = page.locator('#flash_error');
    }

    async fillCredentials(username: string, pass: string) {
        await this.loginInput.fill(username);
        await this.passwordInput.fill(pass);
    }

    async submitLogin() {
        await this.loginButton.click();
    }
}