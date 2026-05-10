"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleItem {
    constructor(data) {
        this.sales_details_id = data.sales_details_id;
        this.sales_id = data.sales_id;
        this.product_id = data.product_id;
        this.item_id = data.item_id;
        this.quantity = data.quantity;
        this.item_price = data.item_price;
        this.discount = data.discount;
    }
    ;
}
exports.SaleItem = SaleItem;
