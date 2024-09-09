// External Imports
import dotenv from "dotenv";
import express from "express";
import path from "path";

// Local Imports
import errorHandler from "./middleware/error";
import logger from "./middleware/logger";
import notFound from "./middleware/notFound";
import msgsRouter from "./routes/msgs-route";

dotenv.config();

// TODO: CREATE A .env FILE IF THERE'S NONE
const PORT = process.env.PORT ?? 8000;

// Initialize Express app
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middlewaare
app.use(logger);

// Config EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes
app.use("/", msgsRouter);

// Not Found Routes
app.use(notFound);

// Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
