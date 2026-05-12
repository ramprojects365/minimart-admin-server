"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
exports.ApiGetSalesTotal = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales Total...", req, res);
    var receivedAmountQuery = "";
    var pendingAmountQuery = "";
    const currentUser = req.user;
    const query = Object.assign({}, req.query);
    if (currentUser && currentUser.user_type !== "sadmin" && currentUser.user_type !== "padmin") {
        if (currentUser.branch_id) {
            query.branch_id = currentUser.branch_id;
        }
        else {
            query.user_id = currentUser.id;
        }
    }
    if (query.user_id == undefined && query.branch_id == undefined) {
        receivedAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS received_amount FROM sales as sal LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
        pendingAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS pending_amount FROM sales as sal LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "delivered"';
    }
    else {
        const filters = new salesFilter_1.SalesAmountFilters(query);
        receivedAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS received_amount FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) = "delivered" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
        pendingAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) as pending_amount FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "delivered"';
    }
    try {
        const receivedAmount = await db_1.executeQuery(receivedAmountQuery);
        const pendingAmount = await db_1.executeQuery(pendingAmountQuery);
        responseLogs_1.responseLogger.print("Completed Get Sales Total...", req, res);
        responseLogs_1.responseLogger.print("Completed Get Sales Total..." + JSON.stringify({ receivedAmount, pendingAmount }), req, res);
        res.json(messages_1.PublicInfo.infoSendData({ received_amount: receivedAmount[0].received_amount, pending_amount: pendingAmount[0].pending_amount }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales Total...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
