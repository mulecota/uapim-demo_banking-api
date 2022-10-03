"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config/default.ts
const dotenv_1 = __importDefault(require("dotenv"));
const os_1 = __importDefault(require("os"));
dotenv_1.default.config();
exports.default = {
    port: process.env.NODE_PORT || 3001,
    host: process.env.NODE_HOST || os_1.default.hostname,
};
