import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
      senderId: {
        type: String,
        ref:"users",
        required: true
      },
      receiverId: {
        type: String,
        ref:"coaches",
        required: true,
      },
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom', 
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      isRead: {
        type: Boolean,
        default: false, 
      },
})

const messageModel = mongoose.model("message",messageSchema)

export default messageModel