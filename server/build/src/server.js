"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./logger"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// CORS
// app.use(cors({
//   origin: 'http://localhost:3000'
// }))
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    (0, routes_1.default)(app);
});
