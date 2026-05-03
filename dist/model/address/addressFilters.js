"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class AddressGetFilters {
    constructor(data) {
        this.address_id = data.address_id;
    }
    getCondition() {
        const filterCondition = [
            this.address_id ? "address_id = " + db_1.mySqlPool.escape(this.address_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.AddressGetFilters = AddressGetFilters;
