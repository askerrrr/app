import pino from "pino";

var logger = pino(
  { timestamp: pino.stdTimeFunctions.isoTime },
  pino.destination("/var/app_err.log")
);

export default logger;
