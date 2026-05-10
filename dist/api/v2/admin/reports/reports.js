"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_1 = require("./sales/sales");
exports.reportsRouter = express_1.Router();
exports.reportsRouter.use("/sales", sales_1.salesReportRouter);
