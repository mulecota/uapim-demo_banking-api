// src/logger/index.ts

import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  level: process.env.PINO_LOG_LEVEL || "info",
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
