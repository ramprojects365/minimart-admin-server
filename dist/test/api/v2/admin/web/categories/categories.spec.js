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
let category_id;
describe("API - Categories", () => {
    // Test with Valid Email and Password
    describe("0. Get Valid tokens for testing", () => {
        it("Should return Token and admin user", async () => {
            let shop = {
                "email": "sunoj.vijayan@gmail.com",
                "password": "sunoj"
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
    // Test get all Categories
    describe("1. Test if Get All Categories is working", () => {
        it("Should return list of categories", async () => {
            const res = await chai_1.request(minimart_server_1.default)
                .get("/api/v2/admin/web/categories")
                .set("Authorization", "Bearer " + token);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body.payload.categories)
                .to.be.a('array');
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.categories[0])
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
        });
    });
    // Test insert new Category
    describe("3. Test if Insert New category is working", () => {
        it("Should return the newly added category", async () => {
            let category = {
                "category_name": "Test Category",
                "category_icon": "FontAwsomeIcons.heart"
            };
            const res = await chai_1.request(minimart_server_1.default)
                .post("/api/v2/admin/web/categories")
                .set("Authorization", "Bearer " + token)
                .send(category);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.category)
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
            category_id = res.body.payload.category.category_id;
        });
    });
    // Test update existing category
    describe("5. Test if update category is working", () => {
        it("Should return the updated category", async () => {
            let category = {
                "category_name": "Test Category1",
                "category_icon": "FontAwsomeIcons.heart"
            };
            const res = await chai_1.request(minimart_server_1.default)
                .patch("/api/v2/admin/web/categories/" + category_id)
                .set("Authorization", "Bearer " + token)
                .send(category);
            chai_1.expect(res)
                .to.have.status(200)
                .to.be.a("object");
            chai_1.expect(res.body)
                .that.includes.all.keys(["status", "name", "message"]);
            chai_1.expect(res.body.payload.category)
                .that.includes.all.keys(["category_id", "category_name", "category_icon"]);
        });
    });
    // Test delete existing User
    describe("5. Test if Delete category is working", () => {
        it("Should return the deleted category ID", async () => {
            const res = await chai_1.request(minimart_server_1.default)
                .delete("/api/v2/admin/web/categories/" + category_id)
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
