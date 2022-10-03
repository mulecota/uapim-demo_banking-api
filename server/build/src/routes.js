"use strict";
// src/routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = __importDefault(require("./data/customers"));
const accounts_1 = __importDefault(require("./data/accounts"));
function default_1(app) {
    // Healthcheck endpoint
    app.get("/healthcheck", (req, res) => {
        res.send({
            status: "OK",
            uptime: process.uptime(),
            mockdata: [
                {
                    customers: customers_1.default,
                    accounts: accounts_1.default,
                },
            ],
        });
    });
    app.get("/api/customers", (req, res) => {
        res.status(200).send({
            customers: customers_1.default,
        });
    });
    app.get("/api/accounts", (req, res) => {
        res.status(200).send({
            accounts: accounts_1.default,
        });
    });
    app.get("/api/customers/:customerid", (req, res) => {
        const customerid = req.params.customerid;
        customers_1.default.map((customers) => {
            if (customers.customerid == customerid) {
                return res.status(200).send({
                    customers,
                });
            }
        });
    });
    app.get("/api/customers/:customerid/accounts", (req, res) => {
        const customerid = req.params.customerid;
        accounts_1.default.map((accounts) => {
            if (accounts.customerid == customerid) {
                return res.status(200).send({
                    accounts,
                });
            }
        });
    });
}
exports.default = default_1;
