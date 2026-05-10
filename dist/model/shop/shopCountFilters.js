"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class ShopGetCountFilters {
    constructor(data) {
        this.user_id = data.user_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "a.id = " + db_1.mySqlPool.escape(this.user_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.ShopGetCountFilters = ShopGetCountFilters;
