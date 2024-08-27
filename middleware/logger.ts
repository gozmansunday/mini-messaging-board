// External Imports
import { RequestHandler } from "express";

/**
 * Logs the method and route of the request made to the console.
 */
const logger: RequestHandler = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

export default logger;
