"use strict";
// src/routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = __importDefault(require("./data/customers"));
const accounts_1 = __importDefault(require("./data/accounts"));
const config_1 = __importDefault(require("config"));
const os_1 = __importDefault(require("os"));
// Fetch API Version from env variable
const api_version = config_1.default.get("api_version");
// Construct API base URL
const api_url = `/api/${api_version}`;
function default_1(app) {
    // HTTP GET: Healthcheck endpoint
    app.get(`${api_url}/healthcheck`, (req, res) => {
        res.send({
            status: "OK",
            api_uptime: process.uptime(),
            api_version: api_version,
            server: [
                {
                    uptime: os_1.default.uptime(),
                    hostname: os_1.default.hostname(),
                    cpus: os_1.default.cpus(),
                    memory: os_1.default.totalmem(),
                    free_memory: os_1.default.freemem(),
                    platform: os_1.default.platform(),
                    release: os_1.default.release(),
                }
            ],
            mock_data: [
                {
                    customers: customers_1.default,
                    accounts: accounts_1.default,
                },
            ],
        });
    });
    // HTTP GET: Return all customers
    app.get(`${api_url}/customers`, (req, res) => {
        res.status(200).send({
            customers: customers_1.default,
        });
    });
    // HTTP GET: Return all accounts
    app.get(`${api_url}/accounts`, (req, res) => {
        res.status(200).send({
            accounts: accounts_1.default,
        });
    });
    // HTTP GET: Return customer using customerid
    app.get(`${api_url}/customers/:customerid`, (req, res) => {
        const customerid = req.params.customerid;
        customers_1.default.map((customers) => {
            if (customers.customerid == customerid) {
                return res.status(200).send({
                    customers,
                });
            }
        });
    });
    // HTTP GET: Return all accounts of a given customerid
    app.get(`${api_url}/customers/:customerid/accounts`, (req, res) => {
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
