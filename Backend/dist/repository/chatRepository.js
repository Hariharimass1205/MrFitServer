"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepository = void 0;
const mongoose_1 = require("mongoose");
const chatRoomModel_1 = __importDefault(require("../model/chatRoomModel"));
const messageModel_1 = __importDefault(require("../model/messageModel"));
const index_1 = require("../index");
class chatRepository {
    saveMessageRepo(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, coachId, content } = reqBody;
                if (!senderId || !coachId || !content) {
                    console.error("Missing required fields in request body:", reqBody);
                    throw new Error("Missing required fields (senderId, coachId, content)");
                }
                const room = yield chatRoomModel_1.default.findOne({ user: senderId, coach: coachId });
                if (!room) {
                    console.error("Room not found for the given user and coach IDs:", {
                        senderId,
                        coachId,
                    });
                    throw new Error("Chat room not found");
                }
                const message = yield messageModel_1.default.create({
                    senderId: senderId,
                    receiverId: coachId,
                    content,
                    roomId: room._id,
                });
                const roomStringId = room._id.toString();
                index_1.io.to(roomStringId).emit("message", {
                    _id: message._id,
                    roomId: message.roomId,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    content: message.content,
                    isRead: message.isRead,
                    timestamp: message.timestamp,
                });
                return message;
            }
            catch (error) {
                console.error("Error in saveMessageRepo:", error.message);
                throw new Error("Error occurred while saving the message");
            }
        });
    }
    saveMessageCoachRepo(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, coachId, content } = reqBody;
                if (!senderId || !coachId || !content) {
                    console.error("Missing required fields in request body:", reqBody);
                    throw new Error("Missing required fields (senderId, coachId, content)");
                }
                const room = yield chatRoomModel_1.default.findOne({ user: coachId, coach: senderId });
                if (!room) {
                    console.error("Room not found for the given user and coach IDs:", {
                        senderId,
                        coachId,
                    });
                    throw new Error("Chat room not found");
                }
                // Check if the content is a link
                const isLink = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(content);
                const messageContent = isLink
                    ? "Video call " // If it's a link, label it as "Video call invitation"
                    : content;
                // Save the message, don't store type in the database
                const message = yield messageModel_1.default.create({
                    senderId,
                    receiverId: coachId,
                    content: messageContent,
                    roomId: room._id,
                });
                console.log("Message successfully saved to database:", message);
                const roomStringId = room._id.toString();
                // Emit the message event to the room
                index_1.io.to(roomStringId).emit("message", {
                    _id: message._id,
                    roomId: message.roomId,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    content: message.content,
                    isRead: message.isRead,
                    timestamp: message.timestamp,
                });
                if (isLink) {
                    console.log("Emitting linkNotification event:", {
                        message: "A video call invitation has been shared",
                        link: content,
                        senderId,
                        timestamp: message.timestamp,
                    });
                    // Emit a separate event for link notifications
                    index_1.io.to(roomStringId).emit("linkNotification", {
                        message: "A video call invitation has been shared",
                        link: content,
                        senderId,
                        timestamp: message.timestamp,
                    });
                }
                return message;
            }
            catch (error) {
                console.error("Error in saveMessageRepo:", error.message);
                throw new Error("Error occurred while saving the message");
            }
        });
    }
    getMessage(userId, coachId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userIds = new mongoose_1.Types.ObjectId(userId);
                const coachIds = new mongoose_1.Types.ObjectId(coachId);
                const roomId = yield chatRoomModel_1.default.find({ user: userIds, coach: coachIds });
                const msgData = yield messageModel_1.default.find({ roomId: roomId }).populate("receiverId", "name");
                return msgData;
            }
            catch (error) {
                throw new Error("error at msg fetching");
            }
        });
    }
    getRoomId(userId, coachId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userIds = new mongoose_1.Types.ObjectId(userId);
                const coachIds = new mongoose_1.Types.ObjectId(coachId);
                const roomId = yield chatRoomModel_1.default.findOne({ user: userIds, coach: coachIds });
                return roomId._id;
            }
            catch (error) {
                throw new Error("error at msg fetching");
            }
        });
    }
}
exports.chatRepository = chatRepository;
