"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../api/v2/general/responseLogs");
class ApiError extends Error {
    constructor(name, message, status, properties, internalProperties) {
        super();
        this.status = status;
        this.properties = properties;
        this.internalProperties = internalProperties;
        this.name = name;
        this.message = message;
    }
    publicVersion() {
        return new PublicError(this);
    }
    ;
    static errNotFound(properties, internalProperties) {
        return new ApiError("Resource Not Found", "The specific resource does not exist", 404, properties, internalProperties);
    }
    ;
    static errInvalidQueryParameters(properties, internalProperties) {
        return new ApiError("Invalid Query Parameters", "One of the query parameters is invalid", 400, properties, internalProperties);
    }
    ;
    static errMissingBody(properties, internalProperties) {
        return new ApiError("Missing Body", "Missing Data in Request Body", 400, properties, internalProperties);
    }
    ;
    static errServerError(properties, internalProperties) {
        return new ApiError("Internal Server Error", "Request could not be carried out", 500, properties, internalProperties);
    }
    ;
    static errInDatabase(properties, internalProperties) {
        return new ApiError("Database Error", "There was an error in executing db query", 500, properties, internalProperties);
    }
    ;
    static errInDatabaseDuplicate(properties, internalProperties) {
        return new ApiError("Database Error", "The resource already exists in database", 409, properties, internalProperties);
    }
    ;
    static emptyUidOrPass(properties, internalProperties) {
        return new ApiError("Login Error", "The user id or password cannot be empty.", 404, properties, internalProperties);
    }
    ;
    static userNotActive(properties, internalProperties) {
        return new ApiError("Login Error", "The user id is not active.", 404, properties, internalProperties);
    }
    ;
    static loginFailed(properties, internalProperties) {
        return new ApiError("Login Error", "The user id or password is not correct.", 404, properties, internalProperties);
    }
    ;
    static errUnauthorizedError(properties, internalProperties) {
        return new ApiError("Unauthorized", "Client authorization failed.", 401, properties, internalProperties);
    }
    ;
    static errUploadImageFailed(properties, internalProperties) {
        return new ApiError("Upload Failed", "Image upload failed.", 406, properties, internalProperties);
    }
    ;
    static errCopyImageFailed(properties, internalProperties) {
        return new ApiError("Copy Failed", "Image Copy failed.", 406, properties, internalProperties);
    }
    ;
    static errItemsCountExceededLimit(properties, internalProperties) {
        return new ApiError("Items count exceeded limit", "Items count more than 50", 400, properties, internalProperties);
    }
    ;
    static errNoItemsFound(properties, internalProperties) {
        return new ApiError("Items not found", "No items found", 400, properties, internalProperties);
    }
    ;
    static promoExists(properties, internalProperties) {
        return new ApiError("Promotion exists", "Promotion already exists in the given time frame", 400, properties, internalProperties);
    }
    ;
    static contactUsError(properties, internalProperties) {
        return new ApiError("Error sending email", "Error sending contactus email", 400, properties, internalProperties);
    }
    ;
}
exports.ApiError = ApiError;
class PublicError {
    constructor(err) {
        this.name = err.name;
        this.message = err.message;
        this.status = err.status;
        this.properties = err.properties;
    }
}
exports.PublicError = PublicError;
class PublicInfo {
    constructor(name, message, status, payload, properties) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.payload = payload;
        this.properties = properties;
    }
    ;
    static loginSendData(payload, access_token) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Success", 200, access_token, payload);
    }
    ;
    static infoSendData(payload) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Success", 200, payload);
    }
    ;
    static infoCreated(properties) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Created", 201, properties);
    }
    ;
    static infoUpdated(properties) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Updated", 201, properties);
    }
    ;
    static infoNotUpdated(properties) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Not Updated", 406, properties);
    }
    ;
    static infoDeleted(properties) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Resource Deleted", 204, properties);
    }
    ;
    static loginSuccess(properties) {
        responseLogs_1.responseLogger.outputLog();
        return new PublicInfo("Success", "Login Succesful", 200, properties);
    }
    ;
}
exports.PublicInfo = PublicInfo;
class OauthInfo {
    constructor(name, message, status, access_token) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.access_token = access_token;
    }
    ;
    static loginSendToken(access_token) {
        responseLogs_1.responseLogger.outputLog();
        return new OauthInfo("Success", "Success", 200, access_token);
    }
    ;
}
exports.OauthInfo = OauthInfo;
