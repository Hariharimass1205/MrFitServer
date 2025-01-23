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
const coachSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: { type: String },
    phone: { type: Number },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    noOfStudentsCoached: { type: Number },
    availability: { type: {
            fromTime: { type: String },
            toTime: { type: String },
            workingDays: { type: [String] }
        } },
    Students: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "users"
        }],
    achievementBadges: {
        achievementsOne: String,
        achievementsTwo: String,
        achievementsThree: String
    },
    package: { type: {
            monthlyPackage: {
                type: Number
            },
            quarterlyPackage: {
                type: Number
            },
            yearlyPackage: {
                type: Number
            }
        } },
    state: { type: String },
    address: { type: String },
    city: { type: String },
    locality: { type: String },
    licenseOrAadhaar: { type: String },
    role: { type: String },
});
const coachModel = mongoose_1.default.model("coaches", coachSchema);
exports.default = coachModel;
