import { Types } from "mongoose";
import { registerCoachServiceInput, updateCoachScoreInput } from "./coachService.type";
import { Coach } from "../coach";


export interface ICoachService{
    updateCoachScore(data:updateCoachScoreInput):Promise<any | null>;
    registerCoachService(coach:Coach):Promise<registerCoachServiceInput | null>;
    fetchCoachDataService(userId:Types.ObjectId):Promise<any | null>;
    saveProfilePic(url:string,userId:Types.ObjectId):Promise<any | null>;
    updateCoachPackage(objData:Object,userId:Types.ObjectId):Promise<any | null>;
    updateCoachProfile(objData:Object,userId:Types.ObjectId):Promise<any | null>;
    updateCoachACHIEVEMENT(coachId:Types.ObjectId,achievements:any,):Promise<any | null>;
    updateDiet(userId:Types.ObjectId,dietEdit:Object):Promise<any | null>
    updateCoachAvailability(objData:Object,coach_id:Types.ObjectId):Promise<any | null>
}
