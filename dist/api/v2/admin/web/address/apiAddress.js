"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetAddress_1 = require("./apiGetAddress");
exports.addressRouter = express_1.Router();
exports.addressRouter.route("/")
    .get(apiGetAddress_1.ApiGetAddress);
