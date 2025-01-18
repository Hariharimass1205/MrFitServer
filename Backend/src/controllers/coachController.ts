import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { CustomRequest } from "../middlesware/jwtVerification";
import { ICoachController } from "../interface/controllers/coachController.interface";
import mongoose, { Types } from "mongoose";
import { ICoachService } from "../interface/services/coachService.interface";


export class CoachController implements ICoachController{
  private coachService : ICoachService;
  constructor(coachService:ICoachService) {
    this.coachService = coachService;
}

saveScore = async  (req:Request,res:Response,next:NextFunction): Promise<void>=>{
    try {
        const {score,coach} = req.body
        const takenn = JSON.parse(coach)
        const data = {score:score,takenn:takenn}
        const result = await this.coachService.updateCoachScore(data)
        if(result){
       res.status(HttpStatus.OK).json({success:true,result})
        }
    } catch (error) {
        console.error("Error at saving score in coach side");
         next(error);
    }
}
registerCoachController = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void> => {
    try {
      const {role,id} = req.user
      const {formData} = req.body
      const result = this.coachService.registerCoachService({
        name:formData.fullName,
        userId:new Types.ObjectId(`${id}`),
        phone:formData.phone,
        age:formData.age,
        height:formData.height,
        weight:formData.weight,
        noOfStudentsCoached:0,
        Students:[],
        availability:{ 
           fromTime: formData.availability.fromTime,
           toTime: formData.availability.toTime,
           workingDays:  formData.availability.workingDays
          },
        achievementBadges: {
          achievementsOne:"",
          achievementsTwo:"",
          achievementsThree:""
        },
        package: {
          monthlyPackage: 0,
          quarterlyPackage: 0,
          yearlyPackage: 0
        },  
        state:formData.state,
        city:formData.city,
        locality:formData.locality,
        address:formData.address,
        licenseOrAadhaar:formData.licenseOrAadhaar,
        role:"coach"
      })
      res.status(HttpStatus.OK).json({success:true})
    } catch (error) {
      console.error("Error at registering  coach");
      next(error);
    }
}

fetchCoachDataController = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void>=>{
  try {
      const {id} = req?.user
      const idd = new mongoose.Types.ObjectId(id)
      const result = await this.coachService.fetchCoachDataService(idd)
      if(result){
        res.status(HttpStatus.OK).json({success:true,result})
      }
  } catch (error) {
    console.error("Error at fetching user data");
    next(error);
  }
}
updateCoachProfilePic = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void>=>{
  try {
    const {id} = req?.user
    const idd = new mongoose.Types.ObjectId(id)
    const url = (req.files as any)?.profilePic?.[0]?.location
    const result = await this.coachService.saveProfilePic(url,idd) 
    res.status(HttpStatus.OK).json(result)
  } catch (error) {
    console.error("Error at updating coach profile pic in con");
    next(error);
  }
}
updateCoachPackage = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void>=>{
  try {
    const {id} = req?.user
    const userId = new mongoose.Types.ObjectId(id)
    const objData = req.body
    const result = await this.coachService.updateCoachPackage(objData,userId)
    res.status(HttpStatus.OK).json(result)
  }catch(error){
    console.error("Error at updating coach package  in con");
    next(error);
  }
}
updateAvailability = async(req: CustomRequest, res: Response, next: NextFunction): Promise<void>=>{
try {
  const {id} = req?.user
    const coach_id = new mongoose.Types.ObjectId(id)
    const objData = req.body
    const result = await this.coachService.updateCoachAvailability(objData,coach_id)
    res.status(HttpStatus.OK).json(result)
} catch (error) {
  console.error("Error at updating coach availabilaty in con");
  next(error);
}
}
updateCoachProfile= async (req:CustomRequest,res:Response,next:NextFunction): Promise<void>=>{
 try {
  const {id} = req?.user
  const userId = new mongoose.Types.ObjectId(id)
  const objData = req.body
  const result = await this.coachService.updateCoachProfile(objData,userId)
  res.status(HttpStatus.OK).json(result)
 } catch (error) {
  console.error("Error at updating coach profile  in con");
    next(error);
 }
}

updateCoachAchievement= async (req:CustomRequest,res:Response,next:NextFunction) : Promise<void>=>{
  try {
    const {dataset} = req.body
    const coachId = dataset.coachId
    const achievements = dataset.achievement
    const result = await this.coachService.updateCoachACHIEVEMENT(coachId,achievements)
    res.status(HttpStatus.OK).json({success:true,result})
  } catch (error) {
    console.error("error at updating  coach achievement ");
    next(error);
  }
}
updateUserDiet= async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
 try {
  const {studentId,dietEdit} = req.body
  const userId = new mongoose.Types.ObjectId(studentId)
  const ress = await this.coachService.updateDiet(userId,dietEdit)
  res.status(HttpStatus.OK).json({success:true})
 } catch (error) {
  console.error("error at updating  user diet");
  next(error);
 }
}

}

