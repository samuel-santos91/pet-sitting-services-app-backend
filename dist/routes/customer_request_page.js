"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../data/database"));
const router = express_1.default.Router();
//LIST REQUESTS
router.get("/customer/requests", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRequests = yield database_1.default.query("SELECT id, user, pet, care_type, sitter, message, status, created_at FROM heroku_d1337da861f75bf.users_requests;");
    return res.json({ userRequests });
}));
//DELETE REQUESTS
router.post("/customer/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query("DELETE FROM heroku_d1337da861f75bf.users_requests WHERE id = (?)", [
        req.body.deleteId
    ]);
    return res.send("deleted");
}));
exports.default = router;
