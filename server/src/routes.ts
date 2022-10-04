// src/routes.ts

import { Express, request, Request, Response } from "express";
import customers from "./data/customers";
import accounts from "./data/accounts";
import config from "config";
import os from "os";

// Get info from env variable
const api_version = config.get("api_version") as string;
const mock_data_version = config.get("mock_data_version") as string;
const api_title = config.get("api_title") as string;
const api_description = config.get("api_description") as string;

// Construct API base URL
const api_url = `/api/${api_version}`;

const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
const utc2 = new Date();

export default function (app: Express) {

  // HTTP GET: Healthcheck endpoint
  app.get(`${api_url}/healthcheck`, (req: Request, res: Response) => {
    res.send({
      timestamp: utc2,
      status: "OK",
      api_title: api_title,
      api_description: api_description,
      api_version: api_version,
      api_uptime: process.uptime(),
      server: [
        {
          uptime: os.uptime(),
          hostname: os.hostname(),
          cpus: os.cpus(),
          memory: os.totalmem(),
          free_memory: os.freemem(),
          platform: os.platform(),
          release: os.release(),
        }
      ],
      mock_data: [
        {
          mock_data_version: mock_data_version,
          customers,
          accounts,
        },
      ],
    });
  });

  // HTTP GET: Return all customers
  app.get(`${api_url}/customers`, (req: Request, res: Response) => {
    res.status(200).send({
      customers: customers,
    });
  });

  // HTTP GET: Return all accounts
  app.get(`${api_url}/accounts`, (req: Request, res: Response) => {
    res.status(200).send({
      accounts: accounts,
    });
  });

  // HTTP GET: Return customer using customerid
  app.get(`${api_url}/customers/:customerid`, (req: Request, res: Response) => {
    const customerid = req.params.customerid;
    customers.map((customers) => {
      if (customers.customerid == customerid) {
        return res.status(200).send({
          customers,
        });
      }
    });
  });

  // HTTP GET: Return all accounts of a given customerid
  app.get(
    `${api_url}/customers/:customerid/accounts`,
    (req: Request, res: Response) => {
      const customerid = req.params.customerid;
      accounts.map((accounts) => {
        if (accounts.customerid == customerid) {
          return res.status(200).send({
            accounts,
          });
        }
      });
    }
  );
}
