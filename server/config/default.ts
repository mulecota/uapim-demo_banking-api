// config/default.ts
import dotenv from "dotenv";
import os from "os";
dotenv.config();

export default {
    port: process.env.NODE_PORT || 3001,
    host: process.env.NODE_HOST || os.hostname,
  }
