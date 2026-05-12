import { RequestHandler } from "express-serve-static-core";

import { ApiError, PublicInfo } from "../../../../../model/shared/messages";
import { executeQuery } from "../../../../../db/db";
import { ShopSummary } from "../../../../../model/shop/shopSummary";
import { ShopGetFilters } from "../../../../../model/shop/shopFilters";
import { responseLogger } from "../../../general/responseLogs";
import * as dbModel from "../../../../../db/model_created";

export const apiGetShops: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Get Shops...", req, res);
    const currentUser = (req as any).user;
    const query = { ...req.query };
    if (currentUser && currentUser.user_type !== "sadmin" && currentUser.user_type !== "padmin" && !query.user_id && !query.shop_id) {
        if (currentUser.branch_id) {
            query.branch_id = currentUser.branch_id;
        } else if (currentUser.shop_id) {
            query.shop_id = currentUser.shop_id;
        } else {
            query.user_id = currentUser.id;
        }
    }
    const filters = new ShopGetFilters(query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT s.shop_id, s.user_id, s.shop_name, s.shop_addr FROM shops as s LEFT JOIN branches as b ON s.shop_id = b.shop_id LEFT JOIN adminusers as a ON (s.user_id = a.id OR s.shop_id = a.shop_id OR b.branch_id = a.branch_id) WHERE ' + filters.getCondition() + ' group by s.shop_id, s.user_id, s.shop_name, s.shop_addr;';
    try {
        const shops: dbModel.shops[] = await executeQuery(sqlQuery);
        responseLogger.print("Completed Get Shops...", req, res);
        res.json(PublicInfo.infoSendData({ shops: shops.map((item: dbModel.shops) => new ShopSummary(item)) }));
    } catch (error) {
        responseLogger.print("Error Get Shops...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}
