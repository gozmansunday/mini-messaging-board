// External Imports
import { RequestHandler } from "express";

// Local Imports
import { messages } from "../data/messages";
import { HttpError } from "../interfaces/httpError";
import { HttpStatusCode } from "../types";
import { formatDate } from "../utils/date";

/**
 * Shows the new message view.
 * @route GET /new
 */
export const showNewMsgView: RequestHandler = (req, res, next) => {
  res.status(HttpStatusCode.OK).render("new", {
    title: "New Message Form",
  });
};

/**
 * Creates a new message.
 * @route POST /new
 */
export const createNewMsg: RequestHandler = (req, res, next) => {
  const { msgAuthor, msgText } = req.body;

  if (!msgAuthor) {
    const err: HttpError = new Error("The message author is required.");
    err.status = HttpStatusCode.NOT_FOUND;
    return next(err);
  }
  if (!msgText) {
    const err: HttpError = new Error("The message text is required.");
    err.status = HttpStatusCode.NOT_FOUND;
    return next(err);
  }

  messages.push({
    id: messages.length + 1,
    text: msgText,
    user: msgAuthor,
    added: formatDate(new Date()),
  });
  res.redirect("/");
};
