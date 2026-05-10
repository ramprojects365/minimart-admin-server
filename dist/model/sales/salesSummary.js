"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaleSummary {
    constructor(data) {
        this.displayName = data.displayName;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.sales_id = data.sales_id;
        this.salesIdString = data.salesIdString;
        this.remarks = data.remarks;
        this.branch_id = data.branch_id;
        this.branch_name = data.branch_name;
        this.address_id = data.address_id;
        this.date = data.date;
        this.total = data.total;
        this.discount = data.discount;
        this.delivery_charge = data.delivery_charge;
        this.users_vouchers_id = data.users_vouchers_id;
        this.voucher_discount = data.voucher_discount;
        this.status = data.status;
    }
    ;
}
exports.SaleSummary = SaleSummary;
