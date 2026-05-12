"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const salesSummary_1 = require("../../../../../model/sales/salesSummary");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
const moment = __importStar(require("moment"));
exports.ApiGetSales = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Sales...", req, res);
    console.log(moment.isDate(req.query.from));
    // console.log(moment(req.body.from).format('DD/MM/YYYY').toString())
    var sqlQuery = '';
    var queryData = [];
    const currentUser = req.user;
    const isSuperAdmin = currentUser && (currentUser.user_type === "sadmin" || currentUser.user_type === "padmin");
    const query = Object.assign({}, req.query);
    const scopedAdminId = currentUser && !isSuperAdmin && !currentUser.branch_id ? currentUser.id : req.query.admin_id;
    if (currentUser && !isSuperAdmin && currentUser.branch_id) {
        query.branch_id = currentUser.branch_id;
    }
    if (scopedAdminId != undefined) {
        const filters = new salesFilter_1.SalesGetFilters(query);
        sqlQuery = "SELECT u.displayName, u.phoneNumber, u.email, s.sales_id, s.salesIdString, s.branch_id, s.remarks, brn.branch_name, s.address_id, UNIX_TIMESTAMP(s.date) as date, s.total, s.discount, s.delivery_charge, s.users_vouchers_id, v.value as voucher_discount, COALESCE(sstat.status, s.sales_status, 'Ordered') AS status FROM adminusers AS adm INNER JOIN shops AS shp ON (adm.id = shp.user_id OR adm.shop_id = shp.shop_id) INNER JOIN branches AS brn ON shp.shop_id = brn.shop_id INNER JOIN sales as s ON s.branch_id = brn.branch_id INNER JOIN users as u ON s.uid = u.uid LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON s.sales_id = sstat.sales_id LEFT JOIN users_vouchers as uv ON s.users_vouchers_id = uv.users_vouchers_id LEFT JOIN vouchers as v ON uv.voucher_id = v.voucher_id WHERE adm.id = ? AND " + filters.getCondition() + " ORDER BY date desc";
        queryData.push(scopedAdminId);
    }
    else {
        const filters = new salesFilter_1.SalesGetFilters(query);
        sqlQuery = "SELECT u.displayName, u.phoneNumber, u.email, s.sales_id, s.salesIdString, s.branch_id, s.remarks, b.branch_name, s.address_id, UNIX_TIMESTAMP(s.date) as date, s.total, s.discount, s.delivery_charge, s.users_vouchers_id, v.value as voucher_discount, COALESCE(sstat.status, s.sales_status, 'Ordered') AS status FROM sales as s INNER JOIN users as u ON s.uid = u.uid INNER JOIN branches as b ON s.branch_id = b.branch_id LEFT JOIN (select s1.sales_id, s1.status, s1.date from sales_status s1 INNER JOIN(select max(date) maxdate, sales_id from sales_status group by sales_id) s2 on s1.date = s2.maxdate and s1.sales_id = s2.sales_id) AS sstat ON s.sales_id = sstat.sales_id LEFT JOIN users_vouchers as uv ON s.users_vouchers_id = uv.users_vouchers_id LEFT JOIN vouchers as v ON uv.voucher_id = v.voucher_id WHERE " + filters.getCondition() + " ORDER BY date desc";
    }
    try {
        const sales = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get Sales...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ sales: sales.map((item) => new salesSummary_1.SaleSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Sales...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
