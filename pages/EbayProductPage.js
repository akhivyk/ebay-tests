const { expect } = require("@playwright/test");

class EbayProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('//a[@id="atcBtn_btn_1"]');
        this.buyItNowButton = page.locator('#binBtn_btn');
        this.productTitle = page.locator('//div[@data-testid="x-item-title"]');
        this.productPrice = page.locator( '//div[@class="x-price-primary"]');
        this.productDescription = page.locator('#dItemDesc');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async buyItNow() {
        await this.buyItNowButton.click();
    }

    async getProductTitle() {
        return await this.productTitle.textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async getProductDescription() {
        return await this.productDescription.textContent();
    }
}

module.exports = { EbayProductPage };