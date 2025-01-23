"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    coach: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "coaches",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const chatRoomModel = mongoose_1.default.model("chatRoom", chatRoomSchema);
exports.default = chatRoomModel;
