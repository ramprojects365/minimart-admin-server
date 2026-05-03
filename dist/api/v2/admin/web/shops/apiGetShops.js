"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const shopSummary_1 = require("../../../../../model/shop/shopSummary");
const shopFilters_1 = require("../../../../../model/shop/shopFilters");
const responseLogs_1 = require("../../../general/responseLogs");
exports.apiGetShops = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Shops...", req, res);
    const filters = new shopFilters_1.ShopGetFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT s.shop_id, s.user_id, s.shop_name, s.shop_addr FROM shops as s INNER JOIN adminusers as a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE ' + filters.getCondition() + ' group by s.shop_id, s.user_id, s.shop_name, s.shop_addr;';
    try {
        const shops = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Shops...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ shops: shops.map((item) => new shopSummary_1.ShopSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Shops...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
