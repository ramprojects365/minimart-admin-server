"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserSummary {
    constructor(data) {
        this.uid = data.uid;
        this.displayName = data.displayName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.photoUrl = data.photoUrl;
        this.totalPoints = data.totalPoints;
        this.providerId = data.providerId;
        this.fcmToken = data.fcmToken;
        this.deviceName = data.deviceName;
        this.deviceOs = data.deviceOs;
        this.loginStatus = data.loginStatus;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
    }
    ;
}
exports.UserSummary = UserSummary;
