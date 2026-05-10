"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const v2_1 = require("./api/v2/v2");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
exports.default = app;
const port = process.env.PORT || 3000;
const clientPath = path_1.default.resolve(__dirname, "client");
const clientIndexPath = path_1.default.join(clientPath, "index.html");
//diable header information about server type - Express
app.disable("x-powered-by");
//------- TO BE REMOVED IN FUTURE
app.get("/", function (_request, response) {
    response.json({ status: "ok", service: "minimart-admin-server" });
});
app.get("/health", function (_request, response) {
    response.json({ status: "ok" });
});
app.use("/", express_1.default.static(clientPath));
// app.use("/product_images", express.static(path.resolve("./", "public", "product_images")));
//-------
app.use("/public", express_1.default.static(path_1.default.resolve("./", "public")));
app.all('/*', function (request, response, next) {
    // Just send the index.html for other files to support HTML5Mode
    // console.log(request.url);
    delete request.headers['content-encoding'];
    if (request.url.indexOf('api') <= 0 && request.url.indexOf('public') <= 0) {
        if (fs_1.default.existsSync(clientIndexPath)) {
            response.sendFile(clientIndexPath);
        }
        else {
            response.status(404).json({ error: "Not found" });
        }
    }
    else {
        next();
    }
});
app.use("/api/v2", v2_1.routerV2);
app.listen(port, () => {
    console.log("Server Started At Port " + port);
});
