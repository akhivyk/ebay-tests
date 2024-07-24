class EbayHomePage {
    constructor(page) {
        this.page = page;
        this.searchInput = '#gh-ac';
        this.searchButton = '#gh-btn';
        this.signInLink = 'a[title="Sign in"]';
        this.accountLink = '#gh-ug a';
    }

    async navigate() {
        await this.page.goto('https://www.ebay.com/');
    }

    async searchForItem(item) {
        await this.page.fill(this.searchInput, item);
        await this.page.click(this.searchButton);
    }

    async clickSignIn() {
        await this.page.click(this.signInLink);
    }

    async goToAccount() {
        await this.page.click(this.accountLink);
    }

    async checkIfItemExists(item) {
        await this.searchForItem(item);
        return await this.page.locator('.s-item').count() > 0;
    }
}

module.exports = { EbayHomePage };