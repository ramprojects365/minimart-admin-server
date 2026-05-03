"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const apiSessionGenerate_1 = require("./apiSessionGenerate");
const uuid = require("uuid");
exports.apiLoginUser = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Login Mobile User...", req, res);
    const requiredFields = ["uid", "displayName", "email", "fcmToken", "photoUrl"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    if (req.body.email == "" || req.body.password == "") {
        return next(messages_1.ApiError.emptyUidOrPass({ "details": "User id or password cannot be empty" }));
    }
    const user = {
        user_id: uuid(),
        uid: req.body.uid || "",
        displayName: req.body.displayName || "",
        email: req.body.email || "",
        phoneNumber: req.body.phoneNumber || "",
        photoUrl: req.body.photoUrl || "",
        totalPoints: 0,
        providerId: req.body.providerId || "",
        fcmToken: req.body.fcmToken || "",
        deviceName: req.body.deviceName || "",
        deviceOs: req.body.deviceOs || "",
        loginStatus: false,
    };
    var sqlQuery = "INSERT INTO users(user_id, uid, displayName, email, phoneNumber, photoUrl, providerId)VALUES( ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE providerId = ?, photoUrl = ?;INSERT INTO users_devices (uid, fcm_token, device_name, os) VALUES ( ?, ?, ?, ?) ON DUPLICATE KEY UPDATE fcm_token = ?;SELECT * FROM users WHERE uid = ?;";
    var queryData = [user.user_id, user.uid, user.displayName, user.email, user.phoneNumber, user.photoUrl, user.providerId, user.providerId, user.photoUrl, user.uid, user.fcmToken, user.deviceName, user.deviceOs, user.fcmToken, user.uid];
    try {
        const result = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("User Found Mobile ......", req, res);
        if (result[0].affectedRows > 0) {
            const pointsFromDb = result[2][0].total_points;
            user.loginStatus = true;
            user.totalPoints = pointsFromDb;
            responseLogs_1.responseLogger.print("Password Matched ...", req, res);
            // Create Session
            req.user = user;
            apiSessionGenerate_1.apiSessionGenerate(req, res, next);
        }
        else {
            return next(messages_1.ApiError.loginFailed());
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Logging In Mobile User... " + error, req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
