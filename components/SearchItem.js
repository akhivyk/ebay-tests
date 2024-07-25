
class SearchItem {
    

    constructor(page){
        this.page = page;
        this.item = page.locator("//div[@class='s-item__wrapper clearfix']");
        this.itemPrice = this.item.locator("//span[@class='s-item__price']")
        this.itemName = this.item.locator("//div[@class='s-item__title']//span")
    }

    async getNameValue() {
        return await itemName.innerText();
    }
    
    async getPriceValue() {
        return await this.itemPrice.innerText();
    }
}


module.exports = { SearchItem };
