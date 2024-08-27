// External Imports
import { Router } from "express";

// Local Imports
import {
  createNewMsg,
  showNewMsgView,
} from "../controllers/new-msg-controller";

// Initialize router
const newMessageRouter = Router();

// Show new message view
newMessageRouter.get("/", showNewMsgView);

// Create new message
newMessageRouter.post("/", createNewMsg);

export default newMessageRouter;
