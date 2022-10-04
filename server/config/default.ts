// config/default.ts
import dotenv from "dotenv";
import os from "os";
dotenv.config();

export default {
    port: process.env.NODE_PORT || 3001,
    host: process.env.NODE_HOST || os.hostname,
    api_version: process.env.API_VERSION || "v1",
    api_title: process.env.API_TITLE || "Demo API",
    api_description: process.env.API_DESCRIPTION || "Generic Description",
    mock_data_version: process.env.MOCK_DATA_VERSION || "NA"
  }
