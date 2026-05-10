"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const productSummary_1 = require("../../../../../model/product/productSummary");
const static_1 = require("../../../general/static");
exports.ApiCreateProduct = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Create Product...", req, res);
    const requiredFields = ["category_id", "company", "name", "image"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    // console.log("IMMAGEEEEEEEEE " + req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length))
    const newProduct = {
        product_id: 0,
        category_id: req.body.category_id || 0,
        company: req.body.company || "",
        name: req.body.name || "",
        image: image || "",
        description: req.body.description || "",
        weight: req.body.weight || 0.00,
        sku: req.body.sku || null,
    };
    try {
        await static_1.moveImageFromCache(image, "product_images");
        responseLogs_1.responseLogger.print('Image was moved.........', req, res);
        var sqlQuery = "INSERT INTO products (category_id, company, name, image, description, weight, sku) VALUES (?, ?, ?, ?, ?, ?, ?)";
        var queryData = [newProduct.category_id, newProduct.company, newProduct.name, newProduct.image, newProduct.description, newProduct.weight, newProduct.sku];
        try {
            const rows = await db_1.executeQuery(sqlQuery, queryData);
            newProduct.product_id = rows.insertId;
            responseLogs_1.responseLogger.print("Completed Create Product...", req, res);
            res.json(messages_1.PublicInfo.infoCreated({ product: new productSummary_1.ProductSummary(newProduct) }));
        }
        catch (error) {
            responseLogs_1.responseLogger.print("Error Create Product...", req, res);
            return next(messages_1.ApiError.errInDatabase(error));
        }
    }
    catch (error) {
        return next(messages_1.ApiError.errCopyImageFailed({ "details": "Image copy failed", error }));
    }
};
