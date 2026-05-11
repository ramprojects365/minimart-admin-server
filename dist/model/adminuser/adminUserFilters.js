"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class AdminUserGetFilters {
    constructor(data) {
        this.user_id = data.user_id;
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
    }
    getCondition() {
        const filterCondition = [
            this.user_id ? "a.id = " + db_1.mySqlPool.escape(this.user_id) : true,
            this.shop_id ? "a.shop_id in (" + db_1.mySqlPool.escape(this.shop_id.split(',')) + ")" : true,
            this.branch_id ? "a.branch_id = " + db_1.mySqlPool.escape(this.branch_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.AdminUserGetFilters = AdminUserGetFilters;
class UserUpdateFilters {
    constructor(data, plain_pass, hash) {
        this.display_name = data.display_name;
        this.user_type = data.user_type;
        this.plain_pass = plain_pass;
        this.hash = hash;
        this.status = data.status;
    }
    getCondition() {
        const filterCondition = [
            this.display_name ? "displayName = " + db_1.mySqlPool.escape(this.display_name) : "",
            (this.user_type && this.user_type == 'sadmin') ? "user_type = 'sadmin', shop_id = 0, branch_id = 0" : "",
            (this.user_type && this.user_type == 'nadmin') ? "user_type = 'nadmin', shop_id = 0, branch_id = 0" : "",
            (this.user_type && this.user_type == 'manager') ? "user_type = 'manager'" : "",
            (this.user_type && this.user_type == 'employee') ? "user_type = 'employee'" : "",
            (this.user_type && this.user_type == 'padmin') ? "user_type = 'padmin', shop_id = 0, branch_id = 0" : "",
            (this.plain_pass && this.plain_pass != "" ? "password = '" + this.hash + "'" : ""),
            this.status ? "status = " + db_1.mySqlPool.escape(this.status) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.UserUpdateFilters = UserUpdateFilters;
