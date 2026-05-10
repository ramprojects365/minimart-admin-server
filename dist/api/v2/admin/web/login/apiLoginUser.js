"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const apiSessionGenerate_1 = require("./apiSessionGenerate");
exports.apiLoginUser = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Login User...", req, res);
    const requiredFields = ["email", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    if (req.body.email == "" || req.body.password == "") {
        return next(messages_1.ApiError.emptyUidOrPass({ "details": "User id or password cannot be empty" }));
    }
    const user = {
        email: req.body.email || "",
        password: req.body.password || ""
    };
    var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE email = ?";
    var queryData = [user.email];
    try {
        const result = await db_1.executeQuery(sqlQuery, queryData);
        const userFromDB = result[0];
        responseLogs_1.responseLogger.print("User Found ......", req, res);
        if (userFromDB != undefined) {
            // Check if user is active or not
            if (userFromDB.status == 'active') {
                bcrypt.compare(user.password, userFromDB.password, (err, resp) => {
                    if (resp == true) {
                        // passwords match
                        responseLogs_1.responseLogger.print("Password Matched ...", req, res);
                        // TODO Create Session
                        req.user = userFromDB;
                        apiSessionGenerate_1.apiSessionGenerate(req, res, next);
                    }
                    else {
                        // passwords did not match
                        return next(messages_1.ApiError.loginFailed());
                    }
                });
            }
            else {
                return next(messages_1.ApiError.userNotActive());
            }
        }
        else {
            // Email does not exist
            return next(messages_1.ApiError.loginFailed());
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Logging In User... " + error, req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
exports.tokenLoginUser = async (req, res, next) => {
    console.log(req.body);
    responseLogs_1.responseLogger.print("Calling Api User...", req, res);
    const requiredFields = ["username", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    if (req.body.email == "" || req.body.password == "") {
        return next(messages_1.ApiError.emptyUidOrPass({ "details": "User id or password cannot be empty" }));
    }
    const user = {
        email: req.body.username || "",
        password: req.body.password || ""
    };
    var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE email = ?";
    var queryData = [user.email];
    try {
        const result = await db_1.executeQuery(sqlQuery, queryData);
        const userFromDB = result[0];
        responseLogs_1.responseLogger.print("User Found ......", req, res);
        if (userFromDB != undefined) {
            // Check if user is active or not
            if (userFromDB.status == 'active') {
                bcrypt.compare(user.password, userFromDB.password, (err, resp) => {
                    if (resp == true) {
                        // passwords match
                        responseLogs_1.responseLogger.print("Password Matched ...", req, res);
                        // TODO Create Session
                        req.user = userFromDB;
                        apiSessionGenerate_1.apiTokenGenerate(req, res, next);
                    }
                    else {
                        // passwords did not match
                        return next(messages_1.ApiError.loginFailed());
                    }
                });
            }
            else {
                return next(messages_1.ApiError.userNotActive());
            }
        }
        else {
            // Email does not exist
            return next(messages_1.ApiError.loginFailed());
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Logging In Api... " + error, req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
