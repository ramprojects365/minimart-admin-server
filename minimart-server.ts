import "dotenv/config";
import express from "express";
import { routerV2 } from "./api/v2/v2";
import path from "path";
import fs from "fs";

const app = express();
export default app;
const port = process.env.PORT || 3000;
const clientPath = path.resolve(__dirname, "client");
const clientIndexPath = path.join(clientPath, "index.html");

//diable header information about server type - Express
app.disable("x-powered-by");

//------- TO BE REMOVED IN FUTURE
app.get("/", function (_request, response) {
    response.json({ status: "ok", service: "minimart-admin-server" });
});
app.get("/health", function (_request, response) {
    response.json({ status: "ok" });
});
app.use("/", express.static(clientPath));
// app.use("/product_images", express.static(path.resolve("./", "public", "product_images")));
//-------
app.use("/public", express.static(path.resolve("./", "public")));
app.all('/*', function (request, response, next) {
    // Just send the index.html for other files to support HTML5Mode
    // console.log(request.url);
    delete request.headers['content-encoding'];
    if (request.url.indexOf('api') <= 0 && request.url.indexOf('public') <= 0) {
        if (fs.existsSync(clientIndexPath)) {
            response.sendFile(clientIndexPath);
        } else {
            response.status(404).json({ error: "Not found" });
        }
    } else {
        next();
    }
});
app.use("/api/v2", routerV2);

app.listen(port, () => {
    console.log("Server Started At Port " + port);
});
