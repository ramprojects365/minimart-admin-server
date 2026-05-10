"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const productFilters_1 = require("../../../../../model/product/productFilters");
const productSummary_1 = require("../../../../../model/product/productSummary");
exports.ApiUpdateProduct = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Product...", req, res);
    const productID = req.params.product_id;
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    responseLogs_1.responseLogger.print("Image..." + image, req, res);
    if (req.body.image_changed === false) {
        req.body.image = image;
        const filters = new productFilters_1.ProductUpdateFilters(req.body);
        var sqlQuery = "UPDATE products SET " + filters.getCondition() + " WHERE product_id = ?";
        var queryData = [productID];
        try {
            const rows = await db_1.executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogs_1.responseLogger.print("Completed Update Product But no row updated...", req, res);
                res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            }
            else {
                sqlQuery = "SELECT * FROM products WHERE product_id = ?";
                queryData = [productID];
                const product = await db_1.executeQuery(sqlQuery, queryData);
                responseLogs_1.responseLogger.print("Completed Update Product...", req, res);
                res.json(messages_1.PublicInfo.infoUpdated({ product: new productSummary_1.ProductSummary(product[0]) }));
            }
        }
        catch (error) {
            responseLogs_1.responseLogger.print("Error Update Product...", req, res);
            return next(messages_1.ApiError.errInDatabase(error));
        }
    }
    else {
        req.body.image = image;
        fs.copyFile('public/cache/' + image, 'public/product_images/' + image, async (err) => {
            if (err) {
                return next(messages_1.ApiError.errCopyImageFailed({ "details": "Image copy failed" }));
            }
            fs.unlink('public/cache/' + image, (err) => {
                if (err) {
                    responseLogs_1.responseLogger.print("Image Delete from cache failed...", req, res);
                    return;
                }
                responseLogs_1.responseLogger.print("Image Delete from cache sucess...", req, res);
            });
            responseLogs_1.responseLogger.print('Image was moved.........', req, res);
            const filters = new productFilters_1.ProductUpdateFilters(req.body);
            var sqlQuery = "UPDATE products SET " + filters.getCondition() + " WHERE product_id = ?";
            var queryData = [productID];
            try {
                const rows = await db_1.executeQuery(sqlQuery, queryData);
                if (rows.changedRows == 0) {
                    responseLogs_1.responseLogger.print("Completed Update Product But no row updated...", req, res);
                    res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
                }
                else {
                    sqlQuery = "SELECT * FROM products WHERE product_id = ?";
                    queryData = [productID];
                    const product = await db_1.executeQuery(sqlQuery, queryData);
                    responseLogs_1.responseLogger.print("Completed Update Product...", req, res);
                    res.json(messages_1.PublicInfo.infoUpdated({ product: new productSummary_1.ProductSummary(product[0]) }));
                }
            }
            catch (error) {
                responseLogs_1.responseLogger.print("Error Update Product...", req, res);
                return next(messages_1.ApiError.errInDatabase(error));
            }
        });
    }
};
