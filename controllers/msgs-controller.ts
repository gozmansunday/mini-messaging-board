// External Imports
import { RequestHandler } from "express";

// Local Imports
import { messages } from "../data/messages";
import { HttpError } from "../interfaces/httpError";
import { HttpStatusCode } from "../types";

/**
 * Shows the messages view.
 * @route GET /
 */
export const showMessagesView: RequestHandler = (req, res, next) => {
  res.status(HttpStatusCode.OK).render("index", {
    title: "Mini Message Board",
    messages: messages,
  });
};

/**
 * Shows a single message.
 * @route GET /:id
 */
export const showSingleMessageView: RequestHandler = (req, res, next) => {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);

  if (!message) {
    // If there's no message, redirect to the homepage
    res.status(HttpStatusCode.NOT_FOUND).render("index", {
      title: "Mini Message Board",
      messages: messages,
    });

    const err: HttpError = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.status(HttpStatusCode.OK).render("single-message", {
    title: "Single Message",
    message: message,
  });
};