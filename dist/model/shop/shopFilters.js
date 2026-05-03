"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class ShopGetFilters {
    constructor(data) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "s.shop_id = " + db_1.mySqlPool.escape(this.shop_id) : true,
            this.user_id ? "a.id = " + db_1.mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.ShopGetFilters = ShopGetFilters;
class ShopUpdateFilters {
    constructor(data) {
        this.shop_name = data.shop_name;
        this.shop_addr = data.shop_addr;
    }
    getCondition() {
        const filterCondition = [
            this.shop_name ? "shop_name = " + db_1.mySqlPool.escape(this.shop_name) : "",
            this.shop_addr ? "shop_addr = " + db_1.mySqlPool.escape(this.shop_addr) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.ShopUpdateFilters = ShopUpdateFilters;
