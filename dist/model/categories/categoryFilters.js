"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/db");
class CategoryUpdateFilters {
    constructor(data) {
        this.category_name = data.category_name;
        this.category_icon = data.category_icon;
    }
    getCondition() {
        const filterCondition = [
            this.category_name ? "category_name = " + db_1.mySqlPool.escape(this.category_name) : "",
            this.category_icon ? "category_icon = " + db_1.mySqlPool.escape(this.category_icon) : true,
        ];
        return filterCondition.filter(Boolean).join(" , ");
    }
}
exports.CategoryUpdateFilters = CategoryUpdateFilters;
