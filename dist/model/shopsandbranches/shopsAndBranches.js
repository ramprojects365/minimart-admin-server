"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShopsAndBranches {
    constructor(data) {
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
        this.shop_name = data.shop_name;
        this.image = data.image;
        this.branch_name = data.branch_name;
        this.currency = data.currency;
        this.isPosEnabled = data.isPosEnabled;
        this.active = data.active;
    }
    ;
}
exports.ShopsAndBranches = ShopsAndBranches;
