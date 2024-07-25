class EbayHomePage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.locator('#gh-ac');
        this.searchButton = page.locator('#gh-btn');
        this.signInLink = page.locator('a[title="Sign in"]');
        this.accountLink = page.locator('#gh-ug a');
    }

    async navigate() {
        await this.page.goto('https://www.ebay.com/');
    }

    async searchForItem(item) {
        await this.searchInput.fill( item);
        await this.searchButton.click();
    }

    async clickSignIn() {
        await this.signInLink.click();
    }

    async goToAccount() {
        await this.accountLink.click();
    }

    async checkIfItemExists(item) {
        await this.searchForItem(item);
        return await this.page.locator('.s-item').count() > 0;
    }
}

module.exports = { EbayHomePage };