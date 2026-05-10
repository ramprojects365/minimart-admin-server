"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const shopItemSummary_1 = require("../../../../../model/shopitems/shopItemSummary");
exports.ApiCreateShopItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Create ShopItem...", req, res);
    console.log(req.body);
    const requiredFields = ["branch_ids", "product_id", "item_price", "item_discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        responseLogs_1.responseLogger.print("Missing Required Fields..." + requiredFields, req, res);
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newShopItem = {
        item_id: '',
        branch_ids: req.body.branch_ids || [],
        product_id: req.body.product_id || "",
        item_price: req.body.item_price || "",
        item_discount: req.body.item_discount || 0,
        remarks: req.body.remarks || "",
        item_qr_code: req.body.item_qr_code || "",
        articleNumber: req.body.articleNumber || "",
        item_quantity: req.body.item_quantity || 0,
        max_items_per_order: req.body.max_quantity || 0,
        availability: req.body.availability || 1,
        hidden: req.body.histor || 0,
    };
    var sqlQuery = "";
    var queryData = [];
    for (var i = 0; i < newShopItem.branch_ids.length; i++) {
        sqlQuery += "INSERT INTO shop_items(item_id, branch_id, product_id, item_price, item_discount, remarks, articleNumber, item_quantity, max_items_per_order, availability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        queryData.push(v4_1.default(), newShopItem.branch_ids[i], newShopItem.product_id, newShopItem.item_price, newShopItem.item_discount, newShopItem.remarks, newShopItem.articleNumber, newShopItem.item_quantity, newShopItem.max_items_per_order, newShopItem.availability);
    }
    // var sqlQuery = "INSERT INTO shop_items(item_id, branch_id, product_id, item_price, item_discount, item_qr_code, articleNumber, item_quantity, availability) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
    // queryData = [newShopItem.item_id, newShopItem.branch_ids, newShopItem.product_id
    //     , newShopItem.item_price, newShopItem.item_discount, newShopItem.item_qr_code, newShopItem.articleNumber
    //     , newShopItem.item_quantity, newShopItem.availability];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Create ShopItem...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ category: new shopItemSummary_1.ShopItemSummary(newShopItem) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Create ShopItem..." + error, req, res);
        if (error.toString().indexOf('Duplicate') !== -1) {
            return next(messages_1.ApiError.errInDatabaseDuplicate(error));
        }
        else {
            return next(messages_1.ApiError.errInDatabase(error));
        }
    }
};
