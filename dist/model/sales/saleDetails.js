"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleDetails {
    constructor(data) {
        this.sales_details_id = data.sales_details_id;
        this.product_id = data.product_id;
        this.name = data.name;
        this.item_qr_code = data.item_qr_code;
        this.articleNumber = data.articleNumber;
        this.image = data.image;
        this.quantity = data.quantity;
        this.item_price = data.item_price;
        this.discount = data.discount;
    }
    ;
}
exports.SaleDetails = SaleDetails;
