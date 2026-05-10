"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.uploadRouter = express_1.Router();
const bodyParser_1 = require("../../../general/bodyParser");
const apiUploadImage_1 = require("./apiUploadImage");
exports.uploadRouter.route("/image")
    .post(bodyParser_1.jsonParser, apiUploadImage_1.ApiUploadImage);
