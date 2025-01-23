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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
class chatController {
    constructor(chatService) {
        this.saveMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { reqBody } = req.body;
                const result = yield this.chatService.saveMessage(reqBody);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("Error at saveMessage chat");
                next(error);
            }
        });
        this.saveMessageCoach = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { reqBody } = req.body;
                console.log(reqBody, "from coach front");
                const result = yield this.chatService.saveMessageCoach(reqBody);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("Error at saveMessage chat");
                next(error);
            }
        });
        this.getMessages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const coachID = req.query.coachId;
                const result = yield this.chatService.getMessage(userId, coachID);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at getMessage chat");
                next(error);
            }
        });
        this.getRoomId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const coachID = req.query.coachId;
                const result = yield this.chatService.getRoomId(userId, coachID);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at getting roomId chat");
                next(error);
            }
        });
        this.chatService = chatService;
    }
}
exports.chatController = chatController;
