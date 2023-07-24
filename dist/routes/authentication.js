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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../data/database"));
const router = express_1.default.Router();
dotenv_1.default.config();
///////////////////////////////////////////////
router.get("/", (req, res) => {
    res.send("Welcome to the server");
});
////////////////////////////////////////////////
//SIGN UP
router.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const existingUser = yield database_1.default.query("SELECT * FROM heroku_d1337da861f75bf.users_info WHERE email = ?", [email]);
    const existingSitter = yield database_1.default.query("SELECT * FROM heroku_d1337da861f75bf.sitters_info WHERE email = ?", [email]);
    if ((Array.isArray(existingUser[0]) && existingUser[0].length > 0) ||
        (Array.isArray(existingSitter[0]) && existingSitter[0].length > 0)) {
        console.log("User exists");
        return res.status(400).send("Email already exists");
    }
    else {
        console.log("User does not exist");
    }
    const password = req.body.password;
    const hashedPassword = yield bcrypt_1.default.hash(password, 12); // NUMBER 12 IS THE SALT (INCREASES THE SECURITY)
    if (req.body.type === "customer") {
        const userData = [
            req.body.firstName,
            req.body.lastName,
            email,
            hashedPassword,
            req.body.type,
        ];
        yield database_1.default.query("INSERT INTO heroku_d1337da861f75bf.users_info (first_name, last_name, email, password, type) VALUES (?)", [userData]);
    }
    else if (req.body.type === "sitter") {
        const sitterData = [
            req.body.firstName,
            req.body.lastName,
            email,
            hashedPassword,
            req.body.type,
            req.body.summary,
            req.body.hourRate,
            req.body.dayRate,
        ];
        yield database_1.default.query("INSERT INTO heroku_d1337da861f75bf.sitters_info (first_name, last_name, email, password, type, summary, hour_rate, day_rate) VALUES (?)", [sitterData]);
    }
    res.send("added");
}));
//////////////////////////////////////////////////////
//SIGN IN
router.post("/log-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredUser = (yield database_1.default.query("SELECT * FROM heroku_d1337da861f75bf.users_info WHERE email = ?", [req.body.email]));
    const registeredSitter = (yield database_1.default.query("SELECT * FROM heroku_d1337da861f75bf.sitters_info WHERE email = ?", [req.body.email]));
    if (Array.isArray(registeredUser[0]) && registeredUser[0].length > 0) {
        console.log("Email exists");
        const hashedPassword = registeredUser[0][0].password;
        const passwordMatch = yield bcrypt_1.default.compare(req.body.password, hashedPassword);
        if (passwordMatch) {
            console.log("Logged in successfully");
            const id = registeredUser[0][0].id;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.json({ Login: true, token, registeredUser });
        }
        else {
            console.log("Invalid password");
            return res.json("Invalid password");
        }
    }
    else if (Array.isArray(registeredSitter[0]) && registeredSitter[0].length > 0) {
        console.log("Email exists");
        const hashedPassword = registeredSitter[0][0].password;
        const passwordMatch = yield bcrypt_1.default.compare(req.body.password, hashedPassword);
        if (passwordMatch) {
            console.log("Logged in successfully");
            const id = registeredSitter[0][0].id;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.json({ Login: true, token, registeredSitter });
        }
        else {
            console.log("Invalid password");
            return res.json("Invalid password");
        }
    }
    else {
        console.log("Email does not exist");
        return res.json("Email does not exist");
    }
}));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.slice(7);
        if (!token) {
            throw new Error();
        }
        req.token = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (err) {
        res.status(401).json("Please authenticate");
    }
});
router.get("/customer", auth, (req, res) => {
    return res.json({ Login: true });
});
router.get("/sitter", auth, (req, res) => {
    return res.json({ Login: true });
});
exports.default = router;
