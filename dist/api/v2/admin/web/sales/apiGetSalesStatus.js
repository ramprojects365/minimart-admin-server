"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const saleStatus_1 = require("../../../../../model/sales/saleStatus");
exports.ApiGetSalesStatus = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales Status...", req, res);
    // const filters = new SalesGetFilters(req.query);
    const salesId = req.params.sales_id;
    // console.log(moment.isDate(req.query.from));
    // console.log(moment(req.body.from).format('DD/MM/YYYY').toString())
    var sqlQuery = 'SELECT * FROM sales_status  WHERE sales_id = ? ORDER BY date desc';
    var queryData = [salesId];
    try {
        const status = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get Sales Status...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ status: status.map((item) => new saleStatus_1.SaleStatus(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales Status...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
