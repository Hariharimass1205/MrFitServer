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
exports.chatService = void 0;
class chatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    saveMessage(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msgData = yield this.chatRepository.saveMessageRepo(reqBody);
                return msgData;
            }
            catch (error) {
                throw new Error("error at save message");
            }
        });
    }
    saveMessageCoach(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msgData = yield this.chatRepository.saveMessageCoachRepo(reqBody);
                return msgData;
            }
            catch (error) {
                throw new Error("error at save message");
            }
        });
    }
    getMessage(userId, coachId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const megData = yield this.chatRepository.getMessage(userId, coachId);
                return megData;
            }
            catch (error) {
                throw new Error("error at getting message.");
            }
        });
    }
    getRoomId(userId, coachId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const megData = yield this.chatRepository.getRoomId(userId, coachId);
                return megData;
            }
            catch (error) {
                throw new Error("error at getting message.");
            }
        });
    }
}
exports.chatService = chatService;
