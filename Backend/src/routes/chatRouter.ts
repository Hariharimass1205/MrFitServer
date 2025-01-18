import { Router } from "express";
import { chatRepository } from "../repository/chatRepository";
import { chatService } from "../services/chatService";
import { chatController } from "../controllers/chatController";
import authMiddleware from "../middlesware/jwtVerification";
import { IisBlockHandle } from "../middlesware/isBlockHandler";

const chatRouter = Router()
const repository = new chatRepository()
const service = new chatService(repository)
const controller = new chatController(service)


chatRouter.post("/saveMsg",authMiddleware,IisBlockHandle,controller.saveMessage)
chatRouter.post("/saveMsgCoach",authMiddleware,IisBlockHandle,controller.saveMessageCoach)
chatRouter.get("/getMsg",authMiddleware,IisBlockHandle,controller.getMessages)
chatRouter.get("/getRoomId",controller.getRoomId)
export default chatRouter