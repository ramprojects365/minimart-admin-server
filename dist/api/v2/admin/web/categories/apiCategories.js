"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiGetCategories_1 = require("./apiGetCategories");
const apiCreateCategory_1 = require("./apiCreateCategory");
const apiDeleteCategory_1 = require("./apiDeleteCategory");
const apiUpdateCategory_1 = require("./apiUpdateCategory");
exports.categoriesRouter = express_1.Router();
exports.categoriesRouter.route("/")
    .get(apiGetCategories_1.ApiGetCategories)
    .post(bodyParser_1.jsonParser, apiCreateCategory_1.ApiCreateCategory);
exports.categoriesRouter.route("/:category_id")
    .delete(apiDeleteCategory_1.ApiDeleteCategory)
    .patch(bodyParser_1.jsonParser, apiUpdateCategory_1.ApiUpdateCategory);
