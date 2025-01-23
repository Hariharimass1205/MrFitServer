"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const socketHandler = (io) => {
    console.log("Initializing Socket.IO");
    io.on("connection", (socket) => {
        console.log("New client connected with ID:", socket.id);
        socket.on("joinRoom", (roomId) => {
            if (!roomId) {
                console.error("Invalid room ID:", roomId);
                socket.emit("error", { message: "Invalid room ID" });
                return;
            }
            console.log(`Socket ${socket.id} joining room: ${roomId}`);
            socket.join(roomId);
            socket.emit("joinedRoom", { roomId });
        });
        socket.on("message", (messageData) => {
            const { chatId, text, senderId } = messageData;
            if (!chatId || !text || !senderId) {
                console.error("Invalid message data:", messageData, "chatId : ", chatId);
                socket.emit("error", { message: "Invalid message data" });
                return;
            }
            const timestamp = new Date().toISOString();
            const message = { chatId, text, senderId, timestamp };
            console.log("Broadcasting message to room:", chatId);
            io.to(chatId).emit("message", message);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};
exports.socketHandler = socketHandler;
