"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiGetProductsCount = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Products Count...", req, res);
    var sqlQuery = 'SELECT count(product_id) as products_count FROM products;';
    try {
        const productsCount = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Products Count...", req, res);
        responseLogs_1.responseLogger.print("Completed Get Products count..." + productsCount[0].products_count, req, res);
        res.json(messages_1.PublicInfo.infoSendData({ products_count: productsCount[0].products_count }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Products Count...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
