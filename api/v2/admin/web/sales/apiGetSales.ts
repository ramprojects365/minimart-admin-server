import { RequestHandler } from "express";

import * as dbModel from "../../../../../db/model_created";
import { responseLogger } from "../../../general/responseLogs";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { SaleSummary } from "../../../../../model/sales/salesSummary";
import { SalesGetFilters } from "../../../../../model/sales/salesFilter";
import * as moment from 'moment';

export const ApiGetSales: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Sales...", req, res);


    console.log(moment.isDate(req.query.from));
    // console.log(moment(req.body.from).format('DD/MM/YYYY').toString())
    var sqlQuery = '';
    var queryData: any[] = [];
    const currentUser = (req as any).user;
    console.log("Current user:", JSON.stringify(currentUser));
    console.log("Query params:", JSON.stringify(req.query));
    
    const isSuperAdmin = currentUser && (currentUser.user_type === "sadmin" || currentUser.user_type === "padmin");
    console.log("Is Super Admin:", isSuperAdmin);
    
    const query = { ...req.query };
    const requestedAdminId = req.query.admin_id || req.query.user_id;
    const scopedAdminId = currentUser && !isSuperAdmin && !currentUser.branch_id ? currentUser.id : requestedAdminId;
    console.log("Scoped Admin ID:", scopedAdminId);
    
    if (currentUser && !isSuperAdmin && currentUser.branch_id) {
        query.branch_id = currentUser.branch_id;
        console.log("Added branch_id filter:", currentUser.branch_id);
    }
    
    if (scopedAdminId != undefined) {
        console.log("Using admin-scoped query");
        const filters = new SalesGetFilters(query);
        // Fixed query: More flexible admin filtering - check both direct admin association and branch assignments
        sqlQuery = "SELECT COALESCE(u.displayName, 'Walk-in Customer') AS displayName, u.phoneNumber, u.email, s.sales_id, s.salesIdString, s.branch_id, s.remarks, brn.branch_name, s.address_id, UNIX_TIMESTAMP(s.date) as date, s.total, s.discount, s.delivery_charge, s.users_vouchers_id, v.value as voucher_discount, COALESCE(sstat.status, s.sales_status, 'Ordered') AS status FROM adminusers AS adm LEFT JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) LEFT JOIN branches AS brn ON (shp.shop_id = brn.shop_id OR brn.branch_id = adm.branch_id) INNER JOIN sales as s ON s.branch_id = brn.branch_id LEFT JOIN users as u ON s.uid = u.uid LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON s.sales_id = sstat.sales_id LEFT JOIN users_vouchers as uv ON s.users_vouchers_id = uv.users_vouchers_id LEFT JOIN vouchers as v ON uv.voucher_id = v.voucher_id WHERE adm.id = ? AND " + filters.getCondition() + " ORDER BY date desc";
        queryData.push(scopedAdminId);
    } else {
        console.log("Using super admin query");
        const filters = new SalesGetFilters(query);
        sqlQuery = "SELECT COALESCE(u.displayName, 'Walk-in Customer') AS displayName, u.phoneNumber, u.email, s.sales_id, s.salesIdString, s.branch_id, s.remarks, b.branch_name, s.address_id, UNIX_TIMESTAMP(s.date) as date, s.total, s.discount, s.delivery_charge, s.users_vouchers_id, v.value as voucher_discount, COALESCE(sstat.status, s.sales_status, 'Ordered') AS status FROM sales as s LEFT JOIN users as u ON s.uid = u.uid INNER JOIN branches as b ON s.branch_id = b.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON s.sales_id = sstat.sales_id LEFT JOIN users_vouchers as uv ON s.users_vouchers_id = uv.users_vouchers_id LEFT JOIN vouchers as v ON uv.voucher_id = v.voucher_id WHERE " + filters.getCondition() + " ORDER BY date desc";
    }
    
    console.log("Final SQL Query:", sqlQuery);
    console.log("Query Data:", queryData);
    try {
        const sales: dbModel.product[] = await executeQuery(sqlQuery, queryData);
        responseLogger.print("Completed Get Sales...", req, res);
        res.json(PublicInfo.infoSendData({ sales: sales.map((item: dbModel.product) => new SaleSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Sales...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}
