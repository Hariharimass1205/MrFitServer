import { Coach } from "../interface/coach"
import { registerCoachServiceInput, updateCoachScoreInput } from "../interface/services/coachService.type"
import { ICoachService } from '../interface/services/coachService.interface'
import { Types } from "mongoose"
import { ICoachRepository } from "../interface/repository/coachRepository.interface"

export class CoachService implements ICoachService{
    private coachRepository:ICoachRepository
    constructor(coachRepository:ICoachRepository){
      this.coachRepository=coachRepository
    }

 updateCoachScore = async (data:updateCoachScoreInput):Promise<any | null>=>{
    try {
        
        const {score,takenn} = data
        let email = takenn.email
        let res = await this.coachRepository.findUserByEmailandUpdateCoach(score,email)
        console.log(res,"res from ser")
        return res
    } catch (error) {
        throw new Error("error at sendind doc to db in service")
    }
}


 registerCoachService = async (coach:Coach):Promise<any | null>=>{
    try {
        const exsitingUser = await this.coachRepository.findUserByIdIsCoach(coach.userId)
        if(!exsitingUser){
                throw new Error("Email id not found as user");
        }
        return await this.coachRepository.createCoach(coach)
    } catch (error) {
        throw error
    }
}
updateCoachAvailability = async (objData:Object,coach_id:Types.ObjectId):Promise<any | null>=>{
    try {
        const coachAvailability = await this.coachRepository.updateProfileAvailability(objData,coach_id)
        return coachAvailability
    } catch (error) {
        throw error
    }
}

 fetchCoachDataService = async (userId:Types.ObjectId):Promise<any | null>=>{
    try {
        const coachData = await this.coachRepository.fetchCoachDataRepo(userId)
        return coachData
    } catch (error) {
        throw new Error("error at fetching data for navbar");
    }
}
saveProfilePic= async (url:string,idd:Types.ObjectId):Promise<any | null>=>{
    try {
        const coachData = await this.coachRepository.updateProfilePicture(url,idd)
        return coachData
    } catch (error) {
        throw new Error("error at updating profile pic in coach side");
    }
}
updateCoachPackage= async (objData:any,userId:Types.ObjectId):Promise<any | null>=>{
    try {
        const coachPackData = await this.coachRepository.updatePackage(objData,userId)
        return coachPackData
    } catch (error) {
        throw new Error("error at updating package in coach side");
    }
    }

 updateCoachProfile= async (objData:any,userId:Types.ObjectId):Promise<any | null>=>{
        try {
            const coachPackData = await this.coachRepository.updateProfile(objData,userId)
            return coachPackData
        } catch (error) {
            throw new Error("error at updating package in coach side");
        }
        }

  updateCoachACHIEVEMENT = async (coachId:Types.ObjectId,achievements:string):Promise<any | null>=>{
            try {
                return await this.coachRepository.updatecoachAchiRepo(coachId,achievements)
            } catch (error) {
                throw new Error("error at updating achiii in coach side");
            }
            }
  updateDiet= async (userId:Types.ObjectId,dietEdit:Object):Promise<any | null>=>{
   try {
    return await this.coachRepository.updateDietUser(userId,dietEdit)
   } catch (error) {
    throw new Error("error at updating diet in coach side");
   }
  }
        }
    

