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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../data/database"));
const router = express_1.default.Router();
//LIST OF SITTERS
router.get("/customer/sitters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingSitter = yield database_1.default.query("SELECT id, first_name, last_name, summary, hour_rate, day_rate FROM sql6635153.sitters_info;");
    return res.json({ existingSitter });
}));
//STORE IN SERVER
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
//POST IN DATABASE
router.post("/customer/post", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRequest = [
        req.body.user,
        req.body.pet,
        req.body.care,
        req.body.sitter,
        req.body.message,
        (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
    ];
    yield database_1.default.query("INSERT INTO sql6635153.users_requests (user, pet, care_type, sitter, message, image_path) VALUES (?)", [userRequest]);
    console.log(req.body);
    console.log(req.file);
    res.send("request added");
}));
exports.default = router;
