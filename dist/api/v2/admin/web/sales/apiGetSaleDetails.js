"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
const saleDetails_1 = require("../../../../../model/sales/saleDetails");
const static_1 = require("../../../general/static");
exports.ApiGetSaleDetails = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales Details...", req, res);
    const filters = new salesFilter_1.SaleDetailsFilters(req.params);
    var sqlQuery = 'SELECT d.sales_details_id, d.product_id, d.quantity, d.item_price, d.discount, p.name, p.sku AS item_qr_code, si.articleNumber, p.image FROM sales_details as d INNER JOIN products as p ON d.product_id = p.product_id INNER JOIN shop_items as si ON d.item_id = si.item_id WHERE ' + filters.getCondition();
    try {
        const saledetails = await db_1.executeQuery(sqlQuery);
        // To change image to full image path
        saledetails.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'product_images').toString());
        responseLogs_1.responseLogger.print("Completed Get Sales Details...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ saledetails: saledetails.map((item) => new saleDetails_1.SaleDetails(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales Details...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
