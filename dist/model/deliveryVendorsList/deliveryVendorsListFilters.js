"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class deliveryvendorsListFilters {
    constructor(data) {
        this.country = data.country;
    }
    getCondition() {
        const filterCondition = [
            this.country ? "country = " + db_1.mySqlPool.escape(this.country) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.deliveryvendorsListFilters = deliveryvendorsListFilters;
