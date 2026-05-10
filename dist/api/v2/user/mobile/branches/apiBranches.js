"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetBranches_1 = require("./apiGetBranches");
const apiGetBranchDetails_1 = require("./apiGetBranchDetails");
exports.branchRouter = express_1.Router();
exports.branchRouter.route("/")
    .get(apiGetBranches_1.apiGetBranches);
exports.branchRouter.route("/:branch_id")
    .get(apiGetBranchDetails_1.apiGetBranchDetails);
