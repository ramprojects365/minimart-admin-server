"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const shopSummary_1 = require("../../../../../model/shop/shopSummary");
exports.apiCreateShop = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Create Shop...", req, res);
    const requiredFields = ["user_id", "shop_name"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newShop = {
        shop_id: 0,
        user_id: req.body.user_id || 0,
        shop_name: req.body.shop_name || "",
        shop_addr: req.body.shop_addr || ""
    };
    var sqlQuery = "INSERT INTO shops (user_id, shop_name, shop_addr) VALUES (?, ?, ?)";
    var queryData = [newShop.user_id, newShop.shop_name, newShop.shop_addr];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        newShop.shop_id = rows.insertId;
        responseLogs_1.responseLogger.print("Completed Create Shop...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ shop: new shopSummary_1.ShopSummary(newShop) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Create Shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
