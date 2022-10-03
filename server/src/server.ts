// src/server.ts

import express from "express";
import config from "config";
import routes from "./routes";
import logger from "./logger";
import cors from "cors";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
// app.use(cors({
//   origin: 'http://localhost:3000'
// }))

app.listen(port, host, () => {
  logger.info(`Server listing at http://${host}:${port}`);
  routes(app);
});
