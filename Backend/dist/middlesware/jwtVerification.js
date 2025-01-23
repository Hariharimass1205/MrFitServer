"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (accessToken) {
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(httpStatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
            }
            const user = decoded;
            req.user = user;
            next();
        });
    }
    else if (refreshToken) {
        jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(httpStatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired refresh token.' });
            }
            const user = decoded;
            const newAccessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
            });
            req.user = user;
            next();
        });
    }
    else {
        res.status(httpStatusCode_1.HttpStatus.FORBIDDEN).json({ message: "UnAutherized: Please Login" });
    }
};
exports.default = authMiddleware;
