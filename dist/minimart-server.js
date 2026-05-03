"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v2_1 = require("./api/v2/v2");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
exports.default = app;
const port = process.env.PORT || 3000;
//diable header information about server type - Express
app.disable("x-powered-by");
//------- TO BE REMOVED IN FUTURE
app.use("/", express_1.default.static(path_1.default.resolve("./", "client")));
// app.use("/product_images", express.static(path.resolve("./", "public", "product_images")));
//-------
app.use("/public", express_1.default.static(path_1.default.resolve("./", "public")));
app.all('/*', function (request, response, next) {
    // Just send the index.html for other files to support HTML5Mode
    // console.log(request.url);
    delete request.headers['content-encoding'];
    if (request.url.indexOf('api') <= 0 && request.url.indexOf('public') <= 0) {
        response.sendFile('index.html', { root: __dirname + '/client' });
    }
    else {
        next();
    }
});
app.use("/api/v2", v2_1.routerV2);
app.listen(port, () => {
    console.log("Server Started At Port " + port);
});
