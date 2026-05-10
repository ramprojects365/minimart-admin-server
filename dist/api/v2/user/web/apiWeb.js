"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../general/bodyParser");
const contactUs_1 = require("./contactus/contactUs");
exports.userWebRouter = express_1.Router();
// userWebRouter.use("/contactus", apiContactUs);
exports.userWebRouter.route("/:sales_id")
    .post(bodyParser_1.jsonParser, contactUs_1.apiContactUs);
