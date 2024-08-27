// External Imports
import { ErrorRequestHandler } from "express";

/**
 * Handles all errors thrown in the app.
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message });
};

export default errorHandler;
