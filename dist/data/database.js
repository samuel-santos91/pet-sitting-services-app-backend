"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    database: 'heroku_d1337da861f75bf',
    user: 'be52b63b3bfc58',
    password: '3e1f8a99',
});
exports.default = pool;
