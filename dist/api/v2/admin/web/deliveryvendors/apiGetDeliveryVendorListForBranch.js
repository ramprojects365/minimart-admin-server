"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const deliveryVendorsListSummary_1 = require("../../../../../model/deliveryVendorsList/deliveryVendorsListSummary");
exports.apiGetDeliveryVendorListForBranch = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Delivery Vendor List for shop...", req, res);
    // const filters = new deliveryvendorsListFilters(req.query);
    const branchId = req.params.branch_id;
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM delivery_vendors AS dv LEFT JOIN delivery_shops AS ds ON dv.delivery_vendor_id = ds.vendor_id WHERE branch_id = ?;';
    var queryData = [branchId];
    try {
        const services = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get Delivery Vendor List for shop...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ vendors: services.map((item) => new deliveryVendorsListSummary_1.deliveryVendorsOfBranch(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Delivery Vendor List for shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
// curl --include --header 'X-DV-Auth-Token: 01231C99DE895659ED6C7B7F8CFB3FCE259525D4' --data '{"matter":"Documents","points":[{"address":"PL-10, Perdana (Tropics) Shopping Centre, Jalan PJU 8/1, Damansara Perdana, 47820 Petaling Jaya, Selangor"},{"address":"7,7-1 &amp; 7-2, Dinasti Sentral, Jalan Kuchai Maju 18, Off Jalan Kuchai Lama, 58200, Kuala Lumpur, Wilayah Persekutuan"}]}' 'https://robotapitest.mrspeedy.my/api/business/1.1/calculate-order' 
