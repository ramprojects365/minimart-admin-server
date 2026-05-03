"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class BranchGetFilters {
    constructor(data) {
        this.shop_id = data.shop_id;
    }
    getCondition() {
        const filterCondition = [
            this.shop_id ? "shop_id = " + db_1.mySqlPool.escape(this.shop_id) : true,
        ].join(" AND ");
        return filterCondition;
    }
}
exports.BranchGetFilters = BranchGetFilters;
class BranchUpdateFilters {
    constructor(data) {
        this.branch_cat_id = data.branch_cat_id;
        this.branch_name = data.branch_name;
        this.branch_addr = data.branch_addr;
        this.phone_no = data.phone_no;
        this.currency = data.currency;
        this.maximum_distance = data.maximum_distance;
        this.minimum_sale = data.minimum_sale;
        this.open_time = data.open_time;
        this.close_time = data.close_time;
        this.isAdminDelivery = data.isAdminDelivery;
        this.isPosEnabled = data.isPosEnabled;
        this.track_stock = data.track_stock;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.home_screen_theme = data.home_screen_theme;
        this.welcomeMessage = data.welcomeMessage;
        this.landmark = data.landmark;
        this.image = data.image;
        this.rad_three_rate = data.rad_three_rate;
        this.rad_five_rate = data.rad_five_rate;
        this.rad_ten_rate = data.rad_ten_rate;
        this.rad_fifteen_rate = data.rad_fifteen_rate;
        this.rad_twenty_rate = data.rad_twenty_rate;
    }
    getCondition() {
        const filterCondition = [
            this.branch_cat_id ? "branch_cat_id = " + db_1.mySqlPool.escape(this.branch_cat_id) : "",
            this.branch_name ? "branch_name = " + db_1.mySqlPool.escape(this.branch_name) : "",
            this.branch_addr ? "branch_addr = " + db_1.mySqlPool.escape(this.branch_addr) : "",
            this.phone_no ? "phone_no = " + db_1.mySqlPool.escape(this.phone_no) : "",
            this.currency ? "currency = " + db_1.mySqlPool.escape(this.currency) : "",
            this.maximum_distance ? "maximum_distance = " + db_1.mySqlPool.escape(this.maximum_distance) : "",
            this.minimum_sale ? "minimum_sale = " + db_1.mySqlPool.escape(this.minimum_sale) : "",
            this.open_time ? "open_time = " + db_1.mySqlPool.escape(this.open_time) : "",
            this.close_time ? "close_time = " + db_1.mySqlPool.escape(this.close_time) : "",
            this.isAdminDelivery !== undefined ? "isAdminDelivery = " + db_1.mySqlPool.escape(this.isAdminDelivery) : "",
            this.isPosEnabled !== undefined ? "isPosEnabled = " + db_1.mySqlPool.escape(this.isPosEnabled) : "",
            this.track_stock !== undefined ? "track_stock = " + db_1.mySqlPool.escape(this.track_stock) : "",
            this.latitude ? "latitude = " + db_1.mySqlPool.escape(this.latitude) : "",
            this.longitude ? "longitude = " + db_1.mySqlPool.escape(this.longitude) : "",
            this.home_screen_theme ? "home_screen_theme = " + db_1.mySqlPool.escape(this.home_screen_theme) : "",
            this.welcomeMessage !== undefined ? "welcomeMessage = " + db_1.mySqlPool.escape(this.welcomeMessage) : "",
            this.landmark ? "landmark = " + db_1.mySqlPool.escape(this.landmark) : "",
            this.image ? "image = " + db_1.mySqlPool.escape(this.image) : "",
            this.rad_three_rate ? "rad_three_rate = " + db_1.mySqlPool.escape(this.rad_three_rate) : "",
            this.rad_five_rate ? "rad_five_rate = " + db_1.mySqlPool.escape(this.rad_five_rate) : "",
            this.rad_ten_rate ? "rad_ten_rate = " + db_1.mySqlPool.escape(this.rad_ten_rate) : "",
            this.rad_fifteen_rate ? "rad_fifteen_rate = " + db_1.mySqlPool.escape(this.rad_fifteen_rate) : "",
            this.rad_twenty_rate ? "rad_twenty_rate = " + db_1.mySqlPool.escape(this.rad_twenty_rate) : "",
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.BranchUpdateFilters = BranchUpdateFilters;
