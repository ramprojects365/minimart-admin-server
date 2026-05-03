"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetAccount_1 = require("./apiGetAccount");
exports.accountDeleteRouter = express_1.Router();
exports.accountDeleteRouter.route("/user")
    .get(apiGetAccount_1.apiGetAccount);
