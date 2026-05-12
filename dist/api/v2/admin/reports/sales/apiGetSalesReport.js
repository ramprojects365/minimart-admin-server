"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
const apiSalesEmail_1 = require("../email/apiSalesEmail");
exports.ApiGetSalesReport = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales...", req, res);
    const filters = new salesFilter_1.SalesGetFilters(req.query);
    var sqlQuery = "SELECT u.displayName, u.phoneNumber, u.email, s.sales_id, s.branch_id, b.branch_name, s.address_id, UNIX_TIMESTAMP(s.date) as date, s.total, s.discount, s.delivery_charge, s.users_vouchers_id, v.value as voucher_discount, COALESCE(sstat.status, s.sales_status, 'Ordered') AS status FROM sales as s INNER JOIN users as u ON s.uid = u.uid INNER JOIN branches as b ON s.branch_id = b.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON s.sales_id = sstat.sales_id LEFT JOIN users_vouchers as uv ON s.users_vouchers_id = uv.users_vouchers_id LEFT JOIN vouchers as v ON uv.voucher_id = v.voucher_id WHERE " + filters.getCondition() + " ORDER BY date desc";
    try {
        const sales = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Sales...", req, res);
        req.sales = sales;
        apiSalesEmail_1.apiSalesEmail(req, res, next);
        // res.json(PublicInfo.infoSendData({ sales: sales.map((item: dbModel.product) => new SaleSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
