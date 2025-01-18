import mongoose, { mongo } from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users",
        required: true,
    },
    coach:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "coaches",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const chatRoomModel = mongoose.model("chatRoom",chatRoomSchema)
export default chatRoomModel