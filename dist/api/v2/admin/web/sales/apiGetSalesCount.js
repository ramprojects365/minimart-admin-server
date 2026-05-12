"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
exports.ApiGetSalesCount = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales Count...", req, res);
    var ordersCountQuery = "";
    var activeCountQuery = "";
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
        ordersCountQuery = 'SELECT COUNT(total) AS orders_count FROM sales as sal LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
        activeCountQuery = 'SELECT COUNT(total) AS active_count FROM sales as sal LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "delivered"';
    }
    else {
        const filters = new salesFilter_1.SalesCountFilters(query);
        ordersCountQuery = 'SELECT count(sal.sales_id) AS orders_count FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id WHERE MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW()) AND ' + filters.getCondition();
        activeCountQuery = 'SELECT count(sal.sales_id) AS active_count FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "delivered" AND LOWER(COALESCE(sstat.status, sal.sales_status, "Ordered")) != "cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
    }
    try {
        const ordersCount = await db_1.executeQuery(ordersCountQuery);
        const activeCount = await db_1.executeQuery(activeCountQuery);
        responseLogs_1.responseLogger.print("Completed Get Sales count...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ orders_count: ordersCount[0].orders_count, active_count: activeCount[0].active_count }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales Count...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
