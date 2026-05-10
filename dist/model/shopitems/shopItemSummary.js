"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShopItemSummary {
    constructor(data) {
        this.item_id = data.item_id;
        this.branch_id = data.branch_id;
        this.product_id = data.product_id;
        this.max_items_per_order = data.max_items_per_order;
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.company = data.company;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.item_price = data.item_price;
        this.item_discount = data.item_discount;
        this.remarks = data.remarks;
        this.item_qr_code = data.item_qr_code;
        this.articleNumber = data.articleNumber;
        this.item_quantity = data.item_quantity;
        this.availability = data.availability;
        this.hidden = data.hidden;
    }
    ;
}
exports.ShopItemSummary = ShopItemSummary;
