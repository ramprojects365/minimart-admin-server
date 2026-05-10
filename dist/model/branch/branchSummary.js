"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BranchSummary {
    constructor(data) {
        this.shop_id = data.shop_id;
        this.branch_id = data.branch_id;
        this.branch_cat_id = data.branch_cat_id;
        this.branch_name = data.branch_name;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.landmark = data.landmark;
        this.image = data.image;
        this.active = data.active;
    }
    ;
}
exports.BranchSummary = BranchSummary;
class BranchCategorySummary {
    constructor(data) {
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.category_icon = data.category_icon;
    }
    ;
}
exports.BranchCategorySummary = BranchCategorySummary;
