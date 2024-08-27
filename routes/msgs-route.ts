// External Imports
import { Router } from "express";

// Local Imports
import {
  showMessagesView,
  showSingleMessageView,
} from "../controllers/msgs-controller";

// Initialize router
const msgsRouter = Router();

// Show messages view
msgsRouter.get("/", showMessagesView);

// Show single message view
msgsRouter.get("/:id", showSingleMessageView);

export default msgsRouter;
