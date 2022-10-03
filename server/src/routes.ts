// src/routes.ts

import { Express, request, Request, Response } from "express";
import customers from "./data/customers";
import accounts from "./data/accounts";

export default function (app: Express) {
  // Healthcheck endpoint
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.send({
      status: "OK",
      uptime: process.uptime(),
      mockdata: [
        {
          customers,
          accounts,
        },
      ],
    });
  });

  app.get("/api/customers", (req: Request, res: Response) => {
    res.status(200).send({
      customers: customers,
    });
  });

  app.get("/api/accounts", (req: Request, res: Response) => {
    res.status(200).send({
      accounts: accounts,
    });
  });

  app.get("/api/customers/:customerid", (req: Request, res: Response) => {
    const customerid = req.params.customerid;
    customers.map((customers) => {
      if (customers.customerid == customerid) {
        return res.status(200).send({
          customers,
        });
      }
    });
  });

  app.get(
    "/api/customers/:customerid/accounts",
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
