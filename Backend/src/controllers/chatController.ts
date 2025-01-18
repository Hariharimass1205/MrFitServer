import { IChatController } from "../interface/controllers/chatController.interface";
import { IChatService } from "../interface/services/chatService.interface";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";

export class chatController implements IChatController{
    private  chatService : IChatService;
      constructor(chatService:IChatService) {
        this.chatService = chatService
      } 

saveMessage = async (req:Request,res:Response,next:NextFunction)=>{
try {
    const {reqBody} = req.body
    const result = await this.chatService.saveMessage(reqBody)
    res.status(HttpStatus.OK).json({success:true})
} catch (error) {
    console.error("Error at saveMessage chat");
      next(error);
}
}
saveMessageCoach = async (req:Request,res:Response,next:NextFunction)=>{
  try {
      const {reqBody} = req.body
      console.log(reqBody,"from coach front")
      const result = await this.chatService.saveMessageCoach(reqBody)
      res.status(HttpStatus.OK).json({success:true})
  } catch (error) {
      console.error("Error at saveMessage chat");
        next(error);
  }
  }
getMessages = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const userId = req.query.userId
        const coachID = req.query.coachId
        const result = await this.chatService.getMessage(userId,coachID)
        res.status(HttpStatus.OK).json(result)
    } catch (error) {
        console.error("Error at getMessage chat");
      next(error);
    }
}
getRoomId= async (req: Request, res: Response, next: NextFunction)=>{
  try {
      const userId = req.query.userId
      const coachID = req.query.coachId
      const result = await this.chatService.getRoomId(userId,coachID)
      res.status(HttpStatus.OK).json(result)
  } catch (error) {
      console.error("Error at getting roomId chat");
    next(error);
  }
} 

}