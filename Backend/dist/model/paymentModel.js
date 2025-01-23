"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    coachId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'coaches',
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    amount: {
        type: Number,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
    transactionId: {
        type: String,
        required: false,
    }
});
const paymentModel = mongoose_1.default.model("Payment", paymentSchema);
exports.default = paymentModel;
