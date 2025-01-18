
import { saveMessageInput } from "./chatService.type";

export interface IChatService{
    saveMessage(reqBody:any):Promise<any|null>
    saveMessageCoach(reqBody:any):Promise<any|null>
    getMessage(userId:any,coachId:any): Promise<any | null>
    getRoomId(userId:any,coachId:any): Promise<any | null>
}