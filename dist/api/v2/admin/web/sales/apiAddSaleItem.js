"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const saleItem_1 = require("../../../../../model/sales/saleItem");
exports.ApiAddSaleItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Add Sale Item...", req, res);
    const requiredFields = ["product_id", "item_id", "quantity", "item_price", "discount"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newSaleItem = {
        sales_details_id: v4_1.default(),
        sales_id: req.params.sales_id || "",
        product_id: req.body.product_id || "",
        item_id: req.body.item_id || "",
        quantity: req.body.quantity || "",
        item_price: req.body.item_price || "",
        discount: req.body.discount || "",
    };
    var sqlQuery = "INSERT INTO sales_details (sales_details_id, sales_id, product_id, item_id, quantity, item_price, discount) VALUES (?, ?, ?, ?, ?, ?, ?); UPDATE sales SET total = total + ? WHERE sales_id = ?;";
    var queryData = [newSaleItem.sales_details_id, newSaleItem.sales_id, newSaleItem.product_id, newSaleItem.item_id, newSaleItem.quantity, newSaleItem.item_price, newSaleItem.discount, ((newSaleItem.item_price * newSaleItem.quantity) - newSaleItem.discount), newSaleItem.sales_id.toString()];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Add Sale Item...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ saleItem: new saleItem_1.SaleItem(newSaleItem) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Add Sale Item...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
