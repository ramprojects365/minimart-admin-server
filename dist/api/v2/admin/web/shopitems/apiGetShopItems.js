"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const shopItemFilters_1 = require("../../../../../model/shopitems/shopItemFilters");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const static_1 = require("../../../general/static");
const shopItemSummary_1 = require("../../../../../model/shopitems/shopItemSummary");
exports.ApiGetShopItems = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Shop Items...", req, res);
    const requiredFields = ["branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.query);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const filters = new shopItemFilters_1.ShopItemGetFilters(req.query);
    var sqlQuery = 'SELECT si.item_id, si.branch_id, p.category_id, c.category_name, si.product_id, si.max_items_per_order, p.name, si.item_price, p.image, p.description, p.company, si.item_discount, si.remarks, p.sku AS item_qr_code, si.articleNumber, si.item_quantity, si.availability, si.hidden FROM shop_items as si INNER JOIN products as p ON si.product_id = p.product_id INNER JOIN product_category as c ON p.category_id = c.category_id WHERE ' + filters.getCondition();
    try {
        const products = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Shop Items...", req, res);
        // To change image to full image path
        products.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        res.json(messages_1.PublicInfo.infoSendData({ products: products.map((item) => new shopItemSummary_1.ShopItemSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Shop Items...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
