"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class ShopItemGetFilters {
    constructor(data) {
        this.branch_id = data.branch_id;
        this.product_id = data.product_id;
        this.category_id = data.category_id;
    }
    getCondition() {
        const filterCondition = [
            this.branch_id ? "si.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
            this.product_id ? "si.product_id = " + db_1.mySqlPool.escape(this.product_id) : true,
            this.category_id ? "p.category_id = " + db_1.mySqlPool.escape(this.category_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.ShopItemGetFilters = ShopItemGetFilters;
class ShopItemUpdateFilters {
    constructor(data) {
        this.item_price = data.item_price;
        this.item_discount = data.item_discount;
        this.remarks = data.remarks;
        this.max_items_per_order = data.max_quantity;
        this.item_qr_code = data.item_qr_code;
        this.articleNumber = data.articleNumber;
        this.max_quantity = data.max_quantity;
        this.item_quantity = data.item_quantity;
        this.availability = data.availability;
        this.hidden = data.hidden;
    }
    getCondition() {
        const filterCondition = [
            this.item_price ? "item_price = " + db_1.mySqlPool.escape(this.item_price) : "",
            this.item_discount ? "item_discount = " + db_1.mySqlPool.escape(this.item_discount) : "",
            this.remarks ? "remarks = " + db_1.mySqlPool.escape(this.remarks) : "",
            this.item_qr_code ? "item_qr_code = " + db_1.mySqlPool.escape(this.item_qr_code) : "",
            this.item_qr_code ? "item_qr_code = " + db_1.mySqlPool.escape(this.item_qr_code) : "",
            this.articleNumber ? "articleNumber = " + db_1.mySqlPool.escape(this.articleNumber) : "",
            this.max_items_per_order ? "max_items_per_order = " + db_1.mySqlPool.escape(this.max_quantity) : "",
            (this.availability == true || this.availability === false) ? "availability = " + db_1.mySqlPool.escape(this.availability) : "",
            (this.hidden == true || this.hidden === false) ? "hidden = " + db_1.mySqlPool.escape(this.hidden) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.ShopItemUpdateFilters = ShopItemUpdateFilters;
