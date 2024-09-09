// External Imports
import { Router } from "express";

// Local Imports
import {
  createNewMsg,
  showMessagesView,
  showNewMsgView,
  showSingleMessageView,
} from "../controllers/msgs-controller";

// Initialize router
const msgsRouter = Router();

// Show messages view - GET /
msgsRouter.get("/", showMessagesView);

// Show new message view - GET /new
msgsRouter.get("/new", showNewMsgView);

// Show single message view - GET /:id
msgsRouter.get("/:id", showSingleMessageView);

// Create new message - POST /new
msgsRouter.post("/new", createNewMsg);

export default msgsRouter;
