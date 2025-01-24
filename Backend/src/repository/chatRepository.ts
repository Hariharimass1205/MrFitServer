import { Types } from "mongoose";
import { IChatRepository } from "../interface/repository/chatRepository.interface";
import chatRoomModel from "../model/chatRoomModel";
import messageModel from "../model/messageModel";
import { io } from '../index';


export class chatRepository implements IChatRepository{
    async saveMessageRepo(reqBody: any): Promise<any | null> {
        try {
          const { senderId, coachId, content } = reqBody;
          if (!senderId || !coachId || !content) {
            console.error("Missing required fields in request body:", reqBody);
            throw new Error("Missing required fields (senderId, coachId, content)");
          }
          const room = await chatRoomModel.findOne({ user: senderId, coach: coachId });
          if (!room) {
            console.error("Room not found for the given user and coach IDs:", {
              senderId,
              coachId,
            });
            throw new Error("Chat room not found");
          }
          const message = await messageModel.create({
            senderId:senderId,
            receiverId: coachId,
            content,
            roomId: room._id,
          });
          const roomStringId = room._id.toString();
          io.to(roomStringId).emit("message", {
            _id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            isRead: message.isRead,
            timestamp: message.timestamp,
          });
          return message;
        } catch (error) {
          console.error("Error in saveMessageRepo:", error.message);
          throw new Error("Error occurred while saving the message");
        }
      }
      
      async saveMessageCoachRepo(reqBody: any): Promise<any | null> {
        try {
          const { senderId, coachId, content } = reqBody;
      
          if (!senderId || !coachId || !content) {
            console.error("Missing required fields in request body:", reqBody);
            throw new Error("Missing required fields (senderId, coachId, content)");
          }
          const room = await chatRoomModel.findOne({ user: coachId, coach: senderId });
          if (!room) {
            console.error("Room not found for the given user and coach IDs:", {
              senderId,
              coachId,
            });
            throw new Error("Chat room not found");
          }
      
          // Check if the content is a link
          const isLink = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(content);
          const messageContent = isLink
            ? "Video call "  // If it's a link, label it as "Video call invitation"
            : content ;
          // Save the message, don't store type in the database
          const message = await messageModel.create({
            senderId,
            receiverId: coachId,
            content: messageContent,
            roomId: room._id,
          });
      
          console.log("Message successfully saved to database:", message);
      
          const roomStringId = room._id.toString();
      
          // Emit the message event to the room
          io.to(roomStringId).emit("message", {
            _id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            receiverId: message.receiverId,
            content: message.content,
            isRead: message.isRead,
            timestamp: message.timestamp,
          });
      
          if (isLink) {
            console.log("Emitting linkNotification event:", {
              message: "A video call invitation has been shared",
              link: content,
              senderId,
              timestamp: message.timestamp,
            });
      
            // Emit a separate event for link notifications
            io.to(roomStringId).emit("linkNotification", {
              message: "A video call invitation has been shared",
              link: content,
              senderId,
              timestamp: message.timestamp,
            });
          }
      
          return message;
        } catch (error) {
          console.error("Error in saveMessageRepo:", error.message);
          throw new Error("Error occurred while saving the message");
        }
      }
      


async getMessage(userId:string,coachId:string): Promise<any | null>{
        try {
        const userIds = new Types.ObjectId(userId);
        const coachIds = new Types.ObjectId(coachId);
        const roomId = await chatRoomModel.find({user:userIds,coach:coachIds})
        const msgData = await messageModel.find({roomId:roomId}).populate("receiverId","name")
        return msgData
        } catch (error) {
            throw new Error("error at msg fetching");
        }
    } 

  async getRoomId(userId:any,coachId:any): Promise<any | null>{
        try {
        const userIds = new Types.ObjectId(userId);
        const coachIds = new Types.ObjectId(coachId);
        const roomId = await chatRoomModel.findOne({user:userIds,coach:coachIds})
        return roomId._id
        } catch (error) {
            throw new Error("error at msg fetching");
        }
    } 
}