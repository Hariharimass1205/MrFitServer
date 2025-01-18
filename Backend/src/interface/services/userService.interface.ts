
import { Types } from "mongoose";
import { 
    checkUserAndOtpSentInput,
    fetchuserdataServiceOutput,
    forgotPassverifyOTPServiceInput,
    loginUserInput,
    loginUserOutput,
    registerUserInput,
     registerUserOutput,
     saveNewPasswordInput,
     saveOTPtoModelInput,
     verifyOTPServiceInput,
} from "./userService.type";
import { Coach } from "../coach";

export interface IUserService {
  registerUser(user: registerUserInput): Promise<registerUserOutput | null>;
  verifyOTPService(otpData:verifyOTPServiceInput): Promise<string | null>;
  fetchuserdataService(userId: string): Promise<fetchuserdataServiceOutput | null>;
  loginUser(loginData:loginUserInput): Promise<loginUserOutput>;
  googleUser(email: any,displayName:any): Promise<any|null>;
  checkUserAndOtpSent(data:checkUserAndOtpSentInput): Promise<any | null>;
  forgotPassverifyOTPService(data:forgotPassverifyOTPServiceInput): Promise<string>;
  saveNewPassword(data:saveNewPasswordInput): Promise<any | null>;
  saveOTPtoModel(data:saveOTPtoModelInput): Promise<any | null>;
  fetchCoachListSer():Promise<any|null>
  fetchCoachDetails(coach_Id:Types.ObjectId,user_Id:Types.ObjectId):Promise<Coach|null>;
  fetchUserDetails(coach_Id:Types.ObjectId,user_Id:Types.ObjectId):Promise<any|null>
  updateUserProfile(idd:Types.ObjectId,data:any):Promise<any | null>
  addReview(coachId:Types.ObjectId,userId:Types.ObjectId,review:string,starRating:number):Promise<any | null>
  addDietGoal(userId:Types.ObjectId,data:Object):Promise<any | null>
  updateSlot(slot:string,userId:Types.ObjectId): Promise<any>
}
