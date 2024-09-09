// External Imports
import { RequestHandler } from "express";

// Local Imports
import { getAllMessages, getMessageById, insertMessage } from "../db/queries";
import { HttpError } from "../interfaces/httpError";
import { HttpStatusCode, Message } from "../types";
import { formatDate } from "../utils/date";

/**
 * Shows the messages view.
 * @route GET /
 */
export const showMessagesView: RequestHandler = async (req, res, next) => {
  try {
    const messages: Message[] = await getAllMessages();

    const modifiedMsgs = messages.map((msg) => {
      return {
        ...msg,
        added: formatDate(msg.added),
      };
    });

    res.status(HttpStatusCode.OK).render("index", {
      title: "Mini Message Board",
      messages: modifiedMsgs,
    });
  } catch (error) {
    (error as HttpError).status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

/**
 * Shows a single message.
 * @route GET /:id
 */
export const showSingleMessageView: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const message: Message = await getMessageById(id);

    if (!message) {
      // If there's no message, redirect to the homepage
      return res.status(HttpStatusCode.OK).redirect("/");
    }

    const modifiedMsg = {
      ...message,
      added: formatDate(message.added),
    };

    res.status(HttpStatusCode.OK).render("single-message", {
      title: "Single Message",
      message: modifiedMsg,
    });
  } catch (error) {
    (error as HttpError).status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

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
export const createNewMsg: RequestHandler = async (req, res, next) => {
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

  try {
    await insertMessage(msgText, msgAuthor);
    res.redirect("/");
  } catch (error) {
    (error as HttpError).status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
