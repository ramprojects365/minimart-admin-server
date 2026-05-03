"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Req;
let Res;
let Next;
exports.responseLogs = (req, res, next) => {
    res.locals.logs = [];
    Req = req;
    Res = res;
    Next = next;
    next();
};
class responseLogger {
    static print(text, req, res) {
        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        if (req.user) {
            Res.locals.logs.push("User: " + req.user.displayName + " - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl + " - " + text);
        }
        else {
            Res.locals.logs.push("User: Guest - " + new Date().toLocaleString('en-IN', options) + " - " + req.method + " - " + req.originalUrl + " - " + text);
        }
    }
    ;
    static outputLog() {
        Res.locals.logs.map((item) => {
            console.log(item);
        });
        console.log("----------------------------------------------");
    }
    ;
}
exports.responseLogger = responseLogger;
