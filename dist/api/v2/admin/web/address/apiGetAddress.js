"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const addressSummary_1 = require("../../../../../model/address/addressSummary");
const addressFilters_1 = require("../../../../../model/address/addressFilters");
exports.ApiGetAddress = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Address...", req, res);
    const filters = new addressFilters_1.AddressGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM users_addresses WHERE ' + filters.getCondition();
    try {
        const address = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Address...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ address: address.map((item) => new addressSummary_1.AddressSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Address...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
