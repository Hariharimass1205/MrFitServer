import { Types } from "mongoose"
import { Coach } from "../coach"
import { User } from "../user"


export interface ICoachRepository{
    findUserByEmailandUpdateCoach(score:number,email:string):Promise<any|null>
    findUserByIdIsCoach(id:Types.ObjectId):Promise<User|null>
    createCoach(coach:Coach):Promise<Coach|null>
    fetchCoachDataRepo(userId:Types.ObjectId):Promise<any|null>
    updateProfilePicture(url:string,userId:Types.ObjectId):Promise<any|null>
    updatePackage(objData:Object,userId:Types.ObjectId):Promise<any|null>
    updateProfile(objData:Object,userId:Types.ObjectId):Promise<any|null>
    updatecoachAchiRepo(coachId:Types.ObjectId,achievement:any):Promise<any|null>
    updateDietUser(userId:Types.ObjectId,dietEdit:Object):Promise<any|null>
    updateProfileAvailability(objData:Object,coach_id:Types.ObjectId):Promise<any|null>
}