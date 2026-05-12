import { RequestHandler } from "express";

import { responseLogger } from "../../../general/responseLogs";
import { executeQuery } from "../../../../../db/db";
import { PublicInfo, ApiError } from "../../../../../model/shared/messages";

export const ApiDeleteSale: RequestHandler = async (req, res, next) => {
    responseLogger.print("Calling Delete Sale...", req, res);
    const salesID = req.params.sales_id;
    try {
        const sales: any[] = await executeQuery("SELECT sales_id FROM sales WHERE sales_id = ? LIMIT 1", [salesID]);
        if (sales.length === 0) {
            responseLogger.print("Completed Delete Sale But sale was not found...", req, res);
            return next(ApiError.errNotFound({ deleted_id: salesID }));
        }
        await executeQuery("UPDATE sales SET sales_status = 'Cancelled' WHERE sales_id = ?", [salesID]);
        await executeQuery(
            "INSERT INTO sales_status(sales_id, status) VALUES(?, 'Cancelled') ON DUPLICATE KEY UPDATE status = VALUES(status)",
            [salesID]
        );
        responseLogger.print("Completed Delete Sale...", req, res);
        res.json(PublicInfo.infoDeleted({ deleted_id: salesID }));
    } catch (error) {
        responseLogger.print("Error Delete Sale...", req, res);
        return next(ApiError.errInDatabase(error));
    }
}
