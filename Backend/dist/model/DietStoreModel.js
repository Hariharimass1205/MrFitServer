"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dietStoreSchema = new mongoose_1.default.Schema({
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
    providedMeal1: {
        type: String,
        require: true,
    },
    providedMeal2: {
        type: String,
        require: true,
    },
    providedMeal3: {
        type: String,
        require: true,
    },
    water: {
        type: String,
        require: true,
    },
    Calories: {
        type: String,
        require: true,
    },
    Steps: {
        type: String,
        require: true,
    },
    Protein: {
        type: String,
        require: true,
    },
    Carbohydrates: {
        type: String,
        require: true,
    },
    Fats: {
        type: String,
        require: true,
    },
    Fiber: {
        type: String,
        require: true,
    },
    SleepTime: {
        type: String,
        require: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});
const dietStoreModel = mongoose_1.default.model("DietStore", dietStoreSchema);
exports.default = dietStoreModel;
