"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const categorySummary_1 = require("../../../../../model/categories/categorySummary");
exports.ApiCreateCategory = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Create Category...", req, res);
    const requiredFields = ["category_name"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newCategory = {
        category_id: 0,
        category_name: req.body.category_name || "",
        category_icon: req.body.category_icon || "FontAwsomeIcons.heart"
    };
    var sqlQuery = "INSERT INTO product_category (category_name, category_icon) VALUES (?, ?)";
    var queryData = [newCategory.category_name, newCategory.category_icon];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        newCategory.category_id = rows.insertId;
        responseLogs_1.responseLogger.print("Completed Create Category...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ category: new categorySummary_1.CategorySummary(newCategory) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Create Category...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
