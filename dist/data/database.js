"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'sql6.freesqldatabase.com	',
    database: 'sql6635153',
    user: 'sql6635153',
    password: '18jgi9psXg',
});
exports.default = pool;
