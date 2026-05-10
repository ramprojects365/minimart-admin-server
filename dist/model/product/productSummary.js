"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductSummary {
    constructor(data) {
        this.product_id = data.product_id;
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.company = data.company;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.weight = data.weight;
        this.sku = data.sku;
    }
    ;
}
exports.ProductSummary = ProductSummary;
