// External Imports
import { RequestHandler } from "express";

// Local Imports
import { HttpError } from "../interfaces/httpError";

/**
 * Returns a `Not found` error when a non-existent route is requested.
 */
const notFound: RequestHandler = (req, res, next) => {
  const err: HttpError = new Error(`Not found`);
  err.status = 404;
  return next(err);
};

export default notFound;
