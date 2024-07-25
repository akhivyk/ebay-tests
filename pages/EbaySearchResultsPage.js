const { SearchItem } = require('../components/SearchItem');

class EbaySearchResultsPage {
  constructor(page) {
    this.page = page;
    this.firstProductLink = '//a[@class="s-item__link" and not(@tabindex)]';
    this.sortByDropdown = '//button[contains(@aria-label, "Sort selector")]';
    this.currentSelectedSortOption =
      '//button[contains(@aria-label, "Sort selector")]//span[@class="btn__cell"]';
    this.paginationNextButton = '.pagination__next';
    this.noResultsFoundLabel = '//div[@class="srp-save-null-search"]';
    this.searchItem = new SearchItem(page);
  }

  async clickFirstProduct() {
    const firstProduct = this.page.locator(this.firstProductLink).first();
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
  }

  async clickProductByName(name) {
    const allProducts = this.searchItem.item;

    const regex = new RegExp(name, 'i');

    const currentProduct = await allProducts.filter({ hasText: regex }).first();
    
    console.log("name value "+ await currentProduct.locator())
    
    await currentProduct.click()
  }

  async selectSortOption(option) {
    await this.page.click(this.sortByDropdown);
    const optionLocator = this.page.locator(`text=${option}`);
    await optionLocator.waitFor();
    await optionLocator.click();
  }

  async clickNextPage() {
    await this.page.click(this.paginationNextButton);
  }

  async getItems() {
    return this.page.locator('.s-item');
  }

  async getCurrentFilter() {
    const filterLocator = this.page.locator(this.currentSelectedSortOption);
    return await filterLocator.textContent();
  }

  async isNoResultsFoundVisible() {
    const noResultsFoundLocator = this.page.locator(this.noResultsFoundLabel);
    await noResultsFoundLocator.waitFor({ state: 'visible', timeout: 5000 });
    return await noResultsFoundLocator.isVisible();
  }
}

module.exports = { EbaySearchResultsPage };
