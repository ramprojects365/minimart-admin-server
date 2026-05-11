import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { SalesAmountFilters } from "../../../../../model/sales/salesFilter";

export const ApiGetSalesTotal: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Sales Total...", req, res);
    var receivedAmountQuery = "";
    var pendingAmountQuery = "";
    if (req.query.user_id == undefined && req.query.branch_id == undefined) {
        receivedAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS received_amount FROM sales as sal INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE sstat.status !="Cancelled" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
        pendingAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS pending_amount FROM sales as sal INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE sstat.status !="Cancelled" AND sstat.status !="Delivered"';
    } else {
        const filters = new SalesAmountFilters(req.query);
        receivedAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) AS received_amount FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND sstat.status ="Delivered" AND MONTH(sal.date) = MONTH(NOW()) AND YEAR(sal.date) = year(NOW())';
        pendingAmountQuery = 'SELECT SUM(sal.total - sal.discount + sal.delivery_charge) as pending_amount FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales AS sal ON brn.branch_id = sal.branch_id INNER JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON sal.sales_id = sstat.sales_id WHERE ' + filters.getCondition() + ' AND  sstat.status !="Cancelled" AND sstat.status !="Delivered"';
    }
    try {
        const receivedAmount = await executeQuery(receivedAmountQuery);
        const pendingAmount = await executeQuery(pendingAmountQuery);
        responseLogger.print("Completed Get Sales Total...", req, res);
        responseLogger.print("Completed Get Sales Total..." + JSON.stringify({ receivedAmount, pendingAmount }), req, res);
        res.json(PublicInfo.infoSendData({ received_amount: receivedAmount[0].received_amount, pending_amount: pendingAmount[0].pending_amount }));
    } catch (error) {
        responseLogger.print("Error Get Sales Total...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}
