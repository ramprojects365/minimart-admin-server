"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const shopFilters_1 = require("../../../../../model/shop/shopFilters");
const responseLogs_1 = require("../../../general/responseLogs");
const shopSummary_1 = require("../../../../../model/shop/shopSummary");
exports.apiUpdateShop = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Shop...", req, res);
    const shopID = req.params.shop_id;
    const filters = new shopFilters_1.ShopUpdateFilters(req.body);
    var sqlQuery = "UPDATE shops SET " + filters.getCondition() + " WHERE shop_id = ?";
    var queryData = [shopID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Shop But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT shop_id, shop_name, shop_addr FROM shops WHERE shop_id = ?";
            queryData = [shopID];
            const shop = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Shop...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ shop: new shopSummary_1.ShopSummary(shop[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
