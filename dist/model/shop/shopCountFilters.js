"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class ShopGetCountFilters {
    constructor(data) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "s.shop_id = " + db_1.mySqlPool.escape(this.shop_id) : true,
            this.branch_id ? "b.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
            this.user_id ? "a.id = " + db_1.mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.ShopGetCountFilters = ShopGetCountFilters;
