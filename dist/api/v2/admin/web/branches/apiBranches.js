"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiGetBranches_1 = require("./apiGetBranches");
const apiGetBranchesCount_1 = require("./apiGetBranchesCount");
const apiCreateBranch_1 = require("./apiCreateBranch");
const apiGetBranchDetails_1 = require("./apiGetBranchDetails");
const apiUpdateBranch_1 = require("./apiUpdateBranch");
const apiChangeBranchesStatus_1 = require("./apiChangeBranchesStatus");
const apiGetMyBranchDetails_1 = require("./apiGetMyBranchDetails");
const apiGetBranchesCategories_1 = require("./apiGetBranchesCategories");
exports.branchesRouter = express_1.Router();
exports.branchesRouter.route("/count")
    .get(apiGetBranchesCount_1.ApiGetBranchesCount);
exports.branchesRouter.route("/status/:branch_id")
    .patch(bodyParser_1.jsonParser, apiChangeBranchesStatus_1.ApiChangeBranchesStatus);
exports.branchesRouter.route("/categories")
    .get(apiGetBranchesCategories_1.ApiGetBranchesCategories);
exports.branchesRouter.route("/")
    .get(apiGetBranches_1.ApiGetBranches)
    .post(bodyParser_1.jsonParser, apiCreateBranch_1.ApiCreateBranch);
exports.branchesRouter.route("/:branch_id")
    .get(apiGetBranchDetails_1.ApiGetBranchDetails)
    // .delete(apiDeleteShop)
    .patch(bodyParser_1.jsonParser, apiUpdateBranch_1.ApiUpdateBranch);
exports.branchesRouter.route("/mybranch/:user_id")
    .get(apiGetMyBranchDetails_1.ApiGetMyBranchDetails);
