"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimart_server_1 = __importDefault(require("../../../../../../minimart-server"));
const chai = __importStar(require("chai"));
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const chai_1 = require("chai");
let token;
let user_id;
describe("API - User", () => {
    // Test with Valid Email and Password
    describe("0. Get Valid tokens for testing", () => {
        it("Should return Token and admin user", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": "Sunoj@123"
            };
            const res = await chai_1.request(minimart_server_1.default).post("/api/v2/admin/web/login").send(shop);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload)
                .to.be.a("object")
                .that.includes.all.keys(["loggedIn", "token", "admin_user"]);
            chai_1.expect(res.body.payload.admin_user)
                .to.be.a("object")
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
            token = res.body.payload.token;
        });
    });
    // Test get all Users
    describe("1. Test if Get All Users is working", () => {
        it("Should return list of users", async () => {
            const res = await chai_1.request(minimart_server_1.default)
                .get("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body.payload.users)
                .to.be.a('array');
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.users[0])
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });
    // Test Get shops with user_id
    describe("2. Test if Get user with particular id is working", () => {
        it("Should return summary of that particular user", async () => {
            const res = await chai_1.request(minimart_server_1.default)
                .get("/api/v2/admin/web/user?user_id=21")
                .set("Authorization", "Bearer " + token);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body.payload.users)
                .to.be.a('array');
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.users[0])
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });
    // Test insert new User
    describe("3. Test if Insert New User is working", () => {
        it("Should return the newly added User", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name",
                "email": "test@test.com",
                "password": "123"
            };
            const res = await chai_1.request(minimart_server_1.default)
                .post("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token)
                .send(user);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.admin_user)
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
            user_id = res.body.payload.admin_user.admin_id;
        });
    });
    // Test insert same User again
    describe("3. Test if Insert duplicate User is working", () => {
        it("Should return duplicate User error - 409", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name",
                "email": "test@test.com",
                "password": "123"
            };
            const res = await chai_1.request(minimart_server_1.default)
                .post("/api/v2/admin/web/user")
                .set("Authorization", "Bearer " + token)
                .send(user);
            chai_1.expect(res)
                .to.have.status(409)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
        });
    });
    // Test update existing user
    describe("5. Test if update user is working", () => {
        it("Should return the updated user", async () => {
            let user = {
                "user_type": "nadmin",
                "displayName": "Test Name1",
                "email": "test@test.com",
                "password": "123"
            };
            const res = await chai_1.request(minimart_server_1.default)
                .patch("/api/v2/admin/web/user/" + user_id)
                .set("Authorization", "Bearer " + token)
                .send(user);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.user)
                .that.includes.all.keys(["admin_id", "display_name", "user_type", "email", "status"]);
        });
    });
    // Test delete existing User
    describe("5. Test if Delete User is working", () => {
        it("Should return the deleted User ID", async () => {
            const res = await chai_1.request(minimart_server_1.default)
                .delete("/api/v2/admin/web/user/" + user_id)
                .set("Authorization", "Bearer " + token);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload)
                .that.includes.all.keys(["deleted_id"]);
        });
    });
});
