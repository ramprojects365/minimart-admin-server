"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const shopsAndBranches_1 = require("../../../../../model/shopsandbranches/shopsAndBranches");
const static_1 = require("../../../general/static");
exports.apiGetShopsAndBranches = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Shops and Branches...", req, res);
    // const filters = new deliveryvendorsListFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT s.shop_id, b.branch_id, s.shop_name, b.branch_name, b.image, b.currency, b.isPosEnabled, b.active FROM shops AS s INNER JOIN branches AS b WHERE s.shop_id = b.shop_id;';
    try {
        const services = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Shops and Branches...", req, res);
        // To change image to full image path
        services.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(messages_1.PublicInfo.infoSendData({ shops: services.map((item) => new shopsAndBranches_1.ShopsAndBranches(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Shops and Branches...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
