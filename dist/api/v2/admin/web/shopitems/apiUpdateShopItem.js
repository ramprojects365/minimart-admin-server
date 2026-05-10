"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const shopItemSummary_1 = require("../../../../../model/shopitems/shopItemSummary");
const shopItemFilters_1 = require("../../../../../model/shopitems/shopItemFilters");
exports.ApiUpdateShopItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Shop Items...", req, res);
    const itemID = req.params.item_id;
    const branchIds = req.body.branch_ids;
    const productId = req.body.product_id;
    const filters = new shopItemFilters_1.ShopItemUpdateFilters(req.body);
    var sqlQuery = "UPDATE shop_items SET " + filters.getCondition() + " WHERE product_id = ? AND branch_id in (?);";
    var queryData = [productId, branchIds];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Shop Items But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM shop_items WHERE item_id = ?";
            queryData = [itemID];
            const product = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Shop Items...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ product: new shopItemSummary_1.ShopItemSummary(product[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Shop Items...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
