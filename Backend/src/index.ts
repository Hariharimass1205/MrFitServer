import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { createServer } from "http";
import { Server as ServerSocket } from "socket.io";
import { connectToMongoDB } from "./config/db.connect";
import userRouter from "./routes/userRoute";
import coachRouter from "./routes/coachRoute";
import adminRouter from "./routes/adminRoute";
import paymentRouter from "./routes/paymentRoute";
import chatRouter from "./routes/chatRouter";
import { errorHandles } from "./middlesware/errrorHandlers";
import { socketHandler } from "./utils/chat";
import { IisBlockHandle } from "./middlesware/isBlockHandler";

dotenv.config();
const app = express();
connectToMongoDB();

const myFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
  

  const allowedOrigins = [
    'https://mrfit.life',
    'https://www.mrfit.life'
  ];
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., server-to-server or Postman)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Origin allowed
      } else {
        callback(new Error('Not allowed by CORS')); // Origin not allowed
      }
    },
    credentials: true, // Allow cookies and other credentials
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(myFormat));

// Initialize HTTP Server and Socket.IO
const httpServer = createServer(app);

export const io = new ServerSocket(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "https://mrfit.life",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

// Routes
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/coach", coachRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);

// Global Error Handler
app.use(errorHandles);
app.use(IisBlockHandle)

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
