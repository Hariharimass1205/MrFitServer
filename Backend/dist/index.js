"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_connect_1 = require("./config/db.connect");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const coachRoute_1 = __importDefault(require("./routes/coachRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const errrorHandlers_1 = require("./middlesware/errrorHandlers");
const chat_1 = require("./utils/chat");
const isBlockHandler_1 = require("./middlesware/isBlockHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_connect_1.connectToMongoDB)();
const myFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "https://mrfit.life",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)(myFormat));
// Initialize HTTP Server and Socket.IO
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
(0, chat_1.socketHandler)(exports.io);
// Routes
app.use("/user", userRoute_1.default);
app.use("/payment", paymentRoute_1.default);
app.use("/coach", coachRoute_1.default);
app.use("/admin", adminRoute_1.default);
app.use("/chat", chatRouter_1.default);
// Global Error Handler
app.use(errrorHandlers_1.errorHandles);
app.use(isBlockHandler_1.IisBlockHandle);
// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
