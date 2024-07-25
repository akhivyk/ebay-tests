const { expect } = require("@playwright/test");

class EbayProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = '//a[@id="atcBtn_btn_1"]';
        this.buyItNowButton = '#binBtn_btn';
        this.productTitle = page.locator('//div[@data-testid="x-item-title"]');
        this.productPrice = page.locator( '//div[@class="x-price-primary"]');
        this.productDescription = '#dItemDesc';
    }

    async addToCart() {
        await this.page.click(this.addToCartButton);
    }

    async buyItNow() {
        await this.page.click(this.buyItNowButton);
    }

    async getProductTitle() {
        return await this.page.locator(this.productTitle).textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async getProductDescription() {
        return await this.page.locator(this.productDescription).textContent();
    }
}

module.exports = { EbayProductPage };