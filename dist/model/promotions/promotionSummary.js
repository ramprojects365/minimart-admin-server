"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PromotionSummary {
    // products: { id: number, percentage: string }[]
    constructor(data) {
        this.promo_id = data.promo_id;
        this.branch_id = data.branch_id;
        this.picture = data.picture;
        this.title = data.title;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.description = data.description;
        this.discount = data.all_discount_percentage;
        this.created_date = data.created_date;
        this.status = data.status;
        // this.products = data.products;
    }
    ;
}
exports.PromotionSummary = PromotionSummary;
class PromotionItemSummary {
    constructor(data) {
        this.promo_items_id = data.promo_items_id;
        this.promo_id = data.promo_id;
        this.shop_items_id = data.shop_items_id;
        this.discount_percentage = data.discount_percentage;
        this.price = data.item_price;
        this.name = data.name;
        this.image = data.image;
    }
    ;
}
exports.PromotionItemSummary = PromotionItemSummary;
