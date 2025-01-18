import { Types } from "mongoose";

export interface Review{
    user_Id:Types.ObjectId;
    coach_Id:Types.ObjectId;
    review:string;
}