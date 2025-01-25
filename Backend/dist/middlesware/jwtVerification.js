"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const app = (0, express_1.default)();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authMiddleware = (req, res, next) => {
    const accessTokenHeader = req.headers['accesstoken'];
    const refreshTokenHeader = req.headers['refreshtoken'];
    // Function to safely extract the token from a header value
    const extractToken = (header) => {
        if (!header)
            return null; // If the header is undefined, return null
        const rawToken = Array.isArray(header) ? header[0] : header; // Use the first element if it's an array
        return rawToken.replace(/^Bearer\s+/, '').replace(/^"|"$/g, ''); // Remove 'Bearer' prefix and surrounding quotes
    };
    const accessToken = extractToken(accessTokenHeader);
    const refreshToken = extractToken(refreshTokenHeader);
    if (accessToken) {
        console.log("came in to access");
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(httpStatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
            }
            const user = decoded;
            console.log(user, "from  jwt verify");
            req.user = user;
            next();
        });
    }
    else if (refreshToken) {
        console.log("came in to referesh");
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
