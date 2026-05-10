"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const promotionsFilter_1 = require("../../../../../model/promotions/promotionsFilter");
const promotionSummary_1 = require("../../../../../model/promotions/promotionSummary");
exports.ApiGetPromotionItems = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Promotion Items...", req, res);
    const filters = new promotionsFilter_1.PromotionItemsGetFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT pi.*, si.item_price, p.name, p.image FROM promotion_items AS pi INNER JOIN shop_items as si ON pi.shop_items_id = si.item_id INNER JOIN products as p ON si.product_id = p.product_id WHERE ' + filters.getCondition();
    try {
        const promotions = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Promotion Items...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ promotions: promotions.map((item) => new promotionSummary_1.PromotionItemSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Promotions Items..", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
