const { test, expect } = require('@playwright/test');
const { EbayHomePage } = require('../pages/EbayHomePage');
const { EbaySearchResultsPage } = require('../pages/EbaySearchResultsPage');
const { EbayProductPage } = require('../pages/ebayProductPage');

test.describe('eBay Tests', () => {

    test.beforeEach(async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        await ebayHomePage.navigate();
    });

    test('Search for an item', async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);

        await ebayHomePage.searchForItem('Laptop');

        const items = await ebaySearchResultsPage.getItems();
        await items.first().waitFor();

        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('Add item to cart', async ({ page, context }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);
    
        await ebayHomePage.searchForItem('Laptop');
        const items = await ebaySearchResultsPage.getItems();
    
        await items.first().waitFor();
        
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            ebaySearchResultsPage.clickFirstProduct(),
        ]);
    
        const ebayProductPage = new EbayProductPage(newPage);
        await ebayProductPage.addToCart();
        
        const cartBucketLocator = newPage.locator('.cart-bucket').first();
        await expect(cartBucketLocator).toBeVisible();
    });    

    test('Verify Sorting Options', async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);

        await ebayHomePage.searchForItem('Laptop');
        await ebaySearchResultsPage.selectSortOption('Price + Shipping: highest first');

        const items = await ebaySearchResultsPage.getItems();
        const firstItemPrice = await items.first().locator('.s-item__price').textContent();
        
        await items.nth(1).locator('.s-item__price').waitFor();
        const secondItemPrice = await items.nth(1).locator('.s-item__price').textContent();
    
        expect(parseFloat(firstItemPrice.replace(/[^0-9.]/g, ''))).toBeGreaterThanOrEqual(parseFloat(secondItemPrice.replace(/[^0-9.]/g, '')));
    });

    test('Check Pagination Functionality', async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);

        await ebayHomePage.searchForItem('Laptop');
        await ebaySearchResultsPage.clickNextPage();

        const items = await ebaySearchResultsPage.getItems();
        await items.first().waitFor();

        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('Verify Item Details', async ({ page, context }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);

        await ebayHomePage.searchForItem('Laptop');
        const items = await ebaySearchResultsPage.getItems();

        await items.first().waitFor();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            ebaySearchResultsPage.clickFirstProduct(),
        ]);

        const ebayProductPage = new EbayProductPage(newPage);
        await expect(newPage.locator('//div[@data-testid="x-item-title"]')).toBeVisible();
        await expect(newPage.locator('//div[@class="x-price-primary"]')).toBeVisible();
    });

    test('Check filter persistence after navigating results pages', async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);
    
        await ebayHomePage.searchForItem('Laptop');
        await ebaySearchResultsPage.selectSortOption('Price + Shipping: Lowest First');
        await ebaySearchResultsPage.clickNextPage();
    
        const items = await ebaySearchResultsPage.getItems();
        await items.first().waitFor();
    
        const itemCount = await items.count();
        expect(itemCount).toBeGreaterThan(0);
    
        const currentFilter = await ebaySearchResultsPage.getCurrentFilter();
        expect(currentFilter).toContain('Sort: Price + Shipping: lowest first');
    });  

    test('Verify search with invalid query returns no results', async ({ page }) => {
        const ebayHomePage = new EbayHomePage(page);
        const ebaySearchResultsPage = new EbaySearchResultsPage(page);

        await ebayHomePage.searchForItem('918sds08981');

        const isNoResultsVisible = await ebaySearchResultsPage.isNoResultsFoundVisible();
        expect(isNoResultsVisible).toBe(true);
    });

});