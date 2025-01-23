"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    password: { type: String, required: false, default: "not provided" },
    profileImage: { type: String, default: "" },
    DOB: { type: String, default: "" },
    otp: { type: String, default: null },
    otpVerified: { type: Boolean, default: false },
    gender: { type: String, default: "" },
    address: { type: String, default: "" },
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    pincode: { type: Number, default: 0 },
    reviews: { type: [String], default: [] },
    enrolledPackage: { type: Number, default: 0 },
    enrolledDurationExpire: { type: String, default: "" },
    enrolledDuration: { type: String, default: "" },
    enrolledDate: { type: String, default: "" },
    coachId: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: "coaches" },
    isBlocked: { type: Boolean, default: false },
    isCoach: { type: Boolean, default: false },
    quizScore: { type: Number, default: 0 },
    isApproved: { type: String, default: "" },
    role: { type: String, default: "user" },
    isRegisted: { type: Boolean, default: false },
    slotTaken: { type: String, default: "" },
    Diet: {
        Meal1: { type: String, default: null },
        Meal2: { type: String, default: null },
        Meal3: { type: String, default: null },
        Goal: {
            Water: { type: Number, default: null },
            Calories: { type: Number, default: null },
            Steps: { type: Number, default: null },
            Protein: { type: Number, default: null },
            Carbohydrates: { type: Number, default: null },
            Fats: { type: Number, default: null },
            Fiber: { type: Number, default: null },
            SleepTime: { type: Number, default: null },
        }
    },
});
const userModel = mongoose_1.default.model("users", userSchema);
exports.default = userModel;
