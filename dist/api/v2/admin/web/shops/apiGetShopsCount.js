"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const shopCountFilters_1 = require("../../../../../model/shop/shopCountFilters");
exports.ApiGetShopsCount = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Shops Count...", req, res);
    const filters = new shopCountFilters_1.ShopGetCountFilters(req.query);
    var sqlQuery = 'SELECT count(s.shop_id) as shops_count FROM shops AS s INNER JOIN adminusers AS a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE ' + filters.getCondition();
    try {
        const shopsCount = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Shops Count...", req, res);
        responseLogs_1.responseLogger.print("Completed Get Shops count..." + shopsCount[0].shops_count, req, res);
        res.json(messages_1.PublicInfo.infoSendData({ shops_count: shopsCount[0].shops_count }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Shops Count...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
