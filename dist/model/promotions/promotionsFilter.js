"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
const moment = require('moment');
class PromotionsGetFilters {
    constructor(data) {
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.branch_id ? " branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.PromotionsGetFilters = PromotionsGetFilters;
class PromotionUpdateFilters {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.start_date = moment(data.start_date, 'YYYY-MM-DD').unix();
        this.end_date = moment(data.end_date, 'YYYY-MM-DD').unix();
        this.picture = data.picture;
        this.discount = data.discount;
        this.status = data.status;
    }
    getCondition() {
        const filterCondition = [
            this.title ? "title = " + db_1.mySqlPool.escape(this.title) : "",
            this.description ? "description = " + db_1.mySqlPool.escape(this.description) : true,
            this.start_date ? "start_date = " + db_1.mySqlPool.escape(this.start_date) : true,
            this.end_date ? "end_date = " + db_1.mySqlPool.escape(this.end_date) : true,
            this.picture ? "picture = " + db_1.mySqlPool.escape(this.picture) : true,
            "all_discount_percentage = " + db_1.mySqlPool.escape(this.discount),
            this.status ? "status = " + db_1.mySqlPool.escape(this.status) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.PromotionUpdateFilters = PromotionUpdateFilters;
class PromotionItemsGetFilters {
    constructor(data) {
        this.promo_id = data.promo_id;
    }
    getCondition() {
        const filterCondition = [
            this.promo_id ? " promo_id = " + db_1.mySqlPool.escape(this.promo_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.PromotionItemsGetFilters = PromotionItemsGetFilters;
