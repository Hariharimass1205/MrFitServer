"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(id, role) {
    try {
        const payload = { id, role };
        const options = { expiresIn: "1h" };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
function generateRefreshToken(id, role) {
    try {
        const payload = { id, role };
        const options = { expiresIn: "7d" };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
