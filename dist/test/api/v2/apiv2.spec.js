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
const minimart_server_1 = __importDefault(require("../../../minimart-server"));
const chai = __importStar(require("chai"));
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const chai_1 = require("chai");
describe('API - v2', () => {
    describe('1. Test if version 2 is working', () => {
        it('Should return version number', async () => {
            const res = await chai_1.request(minimart_server_1.default).get('/api/v2');
            chai_1.expect(res).to.have.status(200);
            chai_1.expect(res).to.be.a('object');
            chai_1.expect(res.text).to.eql("Welcome to Minimart Api Version 2.0");
        });
    });
});
