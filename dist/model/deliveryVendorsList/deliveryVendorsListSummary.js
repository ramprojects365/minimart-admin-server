"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class deliveryVendorsListSummary {
    constructor(data) {
        this.delivery_vendor_id = data.delivery_vendor_id;
        this.del_ven_name = data.del_ven_name;
        this.del_ven_endpoint = data.del_ven_endpoint;
        this.key = data.key;
        this.secret = data.secret;
        this.country = data.country;
    }
    ;
}
exports.deliveryVendorsListSummary = deliveryVendorsListSummary;
class deliveryVendorsOfBranch {
    constructor(data) {
        this.delivery_vendor_id = data.delivery_vendor_id;
        this.del_ven_name = data.del_ven_name;
        this.del_ven_endpoint = data.del_ven_endpoint;
        this.key = data.key;
        this.secret = data.secret;
        this.country = data.country;
        this.delivery_shop_id = data.delivery_shop_id;
        this.vendor_id = data.vendor_id;
        this.branch_id = data.branch_id;
        this.status = data.status;
    }
    ;
}
exports.deliveryVendorsOfBranch = deliveryVendorsOfBranch;
