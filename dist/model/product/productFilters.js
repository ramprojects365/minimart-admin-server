"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class ProductGetFilters {
    constructor(data) {
        this.product_id = data.product_id;
        this.category_id = data.category_id;
    }
    getCondition() {
        const filterCondition = [
            this.product_id ? "p.product_id = " + db_1.mySqlPool.escape(this.product_id) : true,
            this.category_id ? "p.category_id = " + db_1.mySqlPool.escape(this.category_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.ProductGetFilters = ProductGetFilters;
class ProductUpdateFilters {
    constructor(data) {
        this.category_id = data.category_id;
        this.company = data.company;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.weight = data.weight;
        this.sku = data.sku;
    }
    getCondition() {
        const filterCondition = [
            this.category_id ? "category_id = " + db_1.mySqlPool.escape(this.category_id) : true,
            this.company ? "company = " + db_1.mySqlPool.escape(this.company) : true,
            this.name ? "name = " + db_1.mySqlPool.escape(this.name) : true,
            this.image ? "image = " + db_1.mySqlPool.escape(this.image) : "",
            this.description ? "description = " + db_1.mySqlPool.escape(this.description) : "",
            this.weight ? "weight = " + db_1.mySqlPool.escape(this.weight) : "",
            this.sku ? "sku = " + db_1.mySqlPool.escape(this.sku) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.ProductUpdateFilters = ProductUpdateFilters;
