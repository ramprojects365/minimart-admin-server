"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const promotionsFilter_1 = require("../../../../../model/promotions/promotionsFilter");
const promotionSummary_1 = require("../../../../../model/promotions/promotionSummary");
exports.ApiGetPromotions = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Promotions...", req, res);
    const filters = new promotionsFilter_1.PromotionsGetFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM promotions WHERE ' + filters.getCondition();
    try {
        const promotions = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Promotions...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ promotions: promotions.map((item) => new promotionSummary_1.PromotionSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Promotions...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
