"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminUserSummary {
    constructor(data) {
        console.log(JSON.stringify(data));
        this.admin_id = data.id;
        this.display_name = data.displayName;
        this.user_type = data.user_type;
        this.email = data.email;
        this.status = data.status;
        this.branch_name = data.branch_name;
    }
    ;
}
exports.AdminUserSummary = AdminUserSummary;
