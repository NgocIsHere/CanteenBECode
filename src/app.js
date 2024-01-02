import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import { Server } from "socket.io";

import rootRoute from "./routes/index.js";
import { errorHandler, notFoundError } from "./middlewares/error.middleware.js";
import SocketService from "./services/socket.service.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

// Init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());

// Init databases
import "./dbs/init.mongodb.js";

// Init socket
io.on("connection", SocketService.startConnection);

// Init routes
app.use("/v1/api", rootRoute);

// Handle errors
app.use(notFoundError);
app.use(errorHandler);

export { io };
export default server;
