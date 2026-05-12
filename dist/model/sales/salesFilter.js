"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class SalesGetFilters {
    constructor(data) {
        this.branch_id = data.branch_id;
        this.sales_id = data.sales_id;
        this.status = data.status;
        this.from = data.from;
        this.to = data.to;
        this.exactDate = data.exact_date;
    }
    getCondition() {
        const currentStatus = "LOWER(COALESCE(sstat.status, s.sales_status, 'Ordered'))";
        const filterCondition = [
            this.branch_id ? "s.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
            this.sales_id ? "s.sales_id = " + db_1.mySqlPool.escape(this.sales_id) : true,
            this.from ? "s.date > " + db_1.mySqlPool.escape(this.from) : true,
            this.to ? "s.date <= " + db_1.mySqlPool.escape(this.to) : true,
            this.exactDate ? "DATE(s.date) = " + db_1.mySqlPool.escape(this.exactDate) : true,
            this.status === 'active' ? "(" + currentStatus + " != 'delivered' AND " + currentStatus + " != 'cancelled')" : true,
            this.status === 'billing' ? "(" + currentStatus + " = 'delivered' OR " + currentStatus + " = 'ordered')" : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.SalesGetFilters = SalesGetFilters;
class SaleDetailsFilters {
    constructor(data) {
        this.sales_id = data.sales_id;
    }
    getCondition() {
        const filterCondition = [
            this.sales_id ? "sales_id = " + db_1.mySqlPool.escape(this.sales_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.SaleDetailsFilters = SaleDetailsFilters;
class SalesItemUpdateFilters {
    constructor(data) {
        this.quantity = data.quantity;
    }
    getCondition() {
        const filterCondition = [
            this.quantity ? "quantity = " + db_1.mySqlPool.escape(this.quantity) : ""
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.SalesItemUpdateFilters = SalesItemUpdateFilters;
class SalesCountFilters {
    constructor(data) {
        this.user_id = data.user_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "adm.id = " + db_1.mySqlPool.escape(this.user_id) : true,
            this.branch_id ? "brn.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.SalesCountFilters = SalesCountFilters;
class SalesAmountFilters {
    constructor(data) {
        this.user_id = data.user_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "adm.id = " + db_1.mySqlPool.escape(this.user_id) : true,
            this.branch_id ? "brn.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.SalesAmountFilters = SalesAmountFilters;
