const { SearchItem } = require('../components/SearchItem');

class EbaySearchResultsPage {
  constructor(page) {
    this.page = page;
    this.firstProductLink = page.locator('//a[@class="s-item__link" and not(@tabindex)]');
    this.sortByDropdown = page.locator('//button[contains(@aria-label, "Sort selector")]');
    this.currentSelectedSortOption =
      page.locator('//button[contains(@aria-label, "Sort selector")]//span[@class="btn__cell"]');
    this.paginationNextButton = page.locator('.pagination__next');
    this.noResultsFoundLabel = page.locator('//div[@class="srp-save-null-search"]');
    this.searchItem = new SearchItem(page);
  }

  async clickFirstProduct() {
    const firstProduct = this.firstProductLink.first();
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
  }

  async clickProductByName(name) {
    const regex = new RegExp(name, 'i');

    const currentProduct = await this.searchItem.itemName
      .filter({ hasText: regex })
      .first();

    await currentProduct.click();
  }

  async selectSortOption(option) {
    await this.sortByDropdown.click();
    const optionLocator = this.page.locator(`text=${option}`);
    await optionLocator.waitFor();
    await optionLocator.click();
  }

  async clickNextPage() {
    await this.paginationNextButton.click();
  }

  async getItems() {
    return this.page.locator('.s-item');
  }

  async getCurrentFilter() {
    return await this.currentSelectedSortOption.textContent();
  }

  async isNoResultsFoundVisible() {
    await this.noResultsFoundLabel.waitFor({ state: 'visible', timeout: 5000 });
    return await this.noResultsFoundLabel.isVisible();
  }
}

module.exports = { EbaySearchResultsPage };
