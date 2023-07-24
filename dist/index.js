"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const customer_page_1 = __importDefault(require("./routes/customer_page"));
const customer_request_page_1 = __importDefault(require("./routes/customer_request_page"));
const sitter_request_page_1 = __importDefault(require("./routes/sitter_request_page"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://64ba4036ee065958269a4ebb--clinquant-frangollo-bba5e1.netlify.app",
    methods: ["POST", "GET"],
    credentials: true,
}));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(authentication_1.default);
app.use(customer_page_1.default);
app.use(customer_request_page_1.default);
app.use(sitter_request_page_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running");
});
