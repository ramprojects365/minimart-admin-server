"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const productSummary_1 = require("../../../../../model/product/productSummary");
const productFilters_1 = require("../../../../../model/product/productFilters");
const static_1 = require("../../../general/static");
exports.ApiGetProducts = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Products...", req, res);
    const filters = new productFilters_1.ProductGetFilters(req.query);
    var sqlQuery = 'SELECT p.product_id, p.name, p.company, p.weight, p.sku, p.category_id, c.category_name, image, description FROM products as p INNER JOIN product_category as c ON c.category_id = p.category_id WHERE ' + filters.getCondition();
    try {
        const products = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Products...", req, res);
        // To change image to full image path
        products.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        res.json(messages_1.PublicInfo.infoSendData({ products: products.map((item) => new productSummary_1.ProductSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Products...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
