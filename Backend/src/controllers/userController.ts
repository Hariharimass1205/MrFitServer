// userController.ts
import { NextFunction, Request, Response } from "express";    
import { otpGenerator } from "../utils/OtoGenerator";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { CustomRequest } from "../middlesware/jwtVerification";
import { IUserController } from "../interface/controllers/userController.intreface";
import { IUserService } from "../interface/services/userService.interface";
import mongoose from "mongoose";


export class UserController implements IUserController{
  private userService : IUserService;
  constructor(userService:IUserService) {
    this.userService = userService;
}

  register = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {    
      const otp =  otpGenerator();
      await sendEmail(req.body.email, otp);
      let registerUserRes = await this.userService.registerUser({
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        DOB: "",
        profileImage:"",
        otp:otp,
        enrolledPackage:0,
        enrolledDuration:"",
        enrolledDate:"",
        enrolledDurationExpire:"",
        password: req.body.password,
        gender: req.body.gender,
        address: "",
        state: "",
        district: "",  
        pincode: 0,
        coachId:null,
        isBlocked:false,
        isCoach:false,
        quizScore:0,
        isApproved:"",
        role:"user" ,
        isRegisted:false,
      });
      console.log(otp,req.body.email)
      if(registerUserRes){
      res.status(HttpStatus.OK).json({success:true});
      }else{
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false});
      }
    } catch (error) {
      console.error("Error at registering user",error);
      next(error)
    }
  };


otpVerify = async (req:Request,res:Response,next:NextFunction) : Promise<void> =>{
  try {
    const { email, otp } = req.body;
    let otpData = {email:email,otp:otp}
    const result = await this.userService.verifyOTPService(otpData)
    res.status(200).json({result})
  } catch (error:any) {
    console.error("Error at otpVerification user");
    next(error);
  }
}

login = async(req:Request,res:Response,next:NextFunction) : Promise<void> =>{
  try {
    const {email,password} = req.body
    const loginData = {email:email,password:password}
    const {user,refreshToken,accessToken} = await this.userService.loginUser(loginData)
    res.cookie("accessToken",accessToken,{
      sameSite:"none",
      httpOnly:false,
      secure: true, 
     // domain:"https://mrfit.life"
    });
    res.cookie("refreshToken",refreshToken,{
      sameSite:"none",
      httpOnly:true,
      secure: true, 
     // domain:"https://mrfit.life"
    });
    res.status(HttpStatus.OK).json({user,authToken:{refreshToken,accessToken}})
  } catch (error) {
    console.error("Error at login user");
    next(error);
  }
}

googleLogin = async (req:Request,res:Response,next:NextFunction):Promise<void>=> {
  try {
      const { email, displayName } = req.body
      const {user, accessToken, refreshToken} =  await this.userService.googleUser(email,displayName)
      res.cookie("accessToken",accessToken,{
        sameSite:"strict",
        httpOnly:false
      });
      res.cookie("refreshToken",refreshToken,{
        sameSite:"strict",
        httpOnly:true
      });
      res.status(HttpStatus.OK).send(user)
  }catch (error){
      next(error)
  }
}

logout = async (req:Request,res:Response,next:NextFunction): Promise<void> =>{
  try {
    res.clearCookie("refreshtoken") 
    res.clearCookie('accesstoken')
    res.status(HttpStatus.OK).json({success:true})
  } catch (error) {
    console.error("Error at logout user");
    next(error);
  }
}

 fetchUserData = async (req:CustomRequest,res:Response,next:NextFunction) : Promise<void> =>{
  try {
    const {id} = req?.user
    const result = await this.userService.fetchuserdataService(id)
    if(result){
      res.status(HttpStatus.OK).json({success:true,result})
    }
} catch (error) {
  console.error("Error at fetching user data");
  next(error);
}
}

forgotPassword = async(req:Request,res:Response,next:NextFunction)  : Promise<void>=>{
  try {
    const {email} = req.body
    const otp = otpGenerator()
    const data={email:email,otp:otp}
    const exsitingUser = await this.userService.checkUserAndOtpSent(data)
  if(!exsitingUser){
     throw new Error("user not found")
  }
    await sendEmail(req.body.email, otp);
   res.status(HttpStatus.OK).json({success:true})
  } catch (error) {
    console.error("Error at forgotPassword sent otp");
    next(error);
  }
}

 forgotPasswordOTPVerify = async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
  try {
    const { email, otp } = req.body;
    const data={email:email,otp:otp}
    const result = await this.userService.forgotPassverifyOTPService(data)
    if(result){
    res.status(HttpStatus.OK).json({success:true})
    }
  } catch (error:any) {
    console.error("Error at resend  otpVerification user");
    next(error);
  }
}
saveChangePassword = async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
  try {
    const {password,email} = req.body
    const data = {password:password,email:email}
    const result = await this.userService.saveNewPassword(data)
    if(result){
    res.status(HttpStatus.OK).json({success:true})
    }
  } catch (error) {
    console.error("new Password saving");
    next(error);
  }
}

 HandleResendOTP = async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
try {
  const {email} = req.body
  const otp =  otpGenerator();
  await sendEmail(req.body.email, otp);
  console.log("resend otp:",otp)
  const data = {otp:otp,email:email}
  const result = await this.userService.saveOTPtoModel(data)
  if(result){
  res.status(HttpStatus.OK).json({success:true})
  }
} catch (error) {
  console.error("error at handling resent otp ");
  next(error);
}
}
fetchCoachlist = async (req:CustomRequest,res:Response,next:NextFunction) : Promise<void>=>{
  try {
      const result = await this.userService.fetchCoachListSer()
      if(result){
        res.status(HttpStatus.OK).json({success:true,result})
      }
  } catch (error) {
    console.error("error at fetching coach list ");
  next(error);
  }
}
fetchCoachDetails = async(req:Request,res:Response,next:NextFunction)=>{
   try {
      const {coach,user} = req.query
      const coach_Id = new mongoose.Types.ObjectId(coach as string)
      const user_Id = new mongoose.Types.ObjectId(user as string)
      const result = await this.userService.fetchCoachDetails(coach_Id,user_Id)
      res.status(HttpStatus.OK).json({success:true,coachUserDetails:result})
   } catch (error) {
    console.error("error at fetching coach Details ");
    next(error);
   }
}
fetchUserDetails = async(req:Request,res:Response,next:NextFunction)=>{
  try {
     const {userId,coachId} = req.query
     const coach_Id = new mongoose.Types.ObjectId(coachId as string);
     const user_Id = new mongoose.Types.ObjectId(userId as string);
     const result = await this.userService.fetchUserDetails(coach_Id,user_Id)
     console.log(result,"ppppppp")
     res.status(HttpStatus.OK).json({success:true,usercoachDeatails:result})
  } catch (error) {
   console.error("error at fetching coach/user Details ");
   next(error);
  }
}
updateUserProfile  = async (req:CustomRequest,res:Response,next:NextFunction) =>{
try {
  const {id} = req?.user
  const data = req.body
  const idd = new mongoose.Types.ObjectId(id)
  const resData = await this.userService.updateUserProfile(idd,data)
  res.status(HttpStatus.OK).send({success:true,res:resData})
} catch (error) {
  console.error("error at editng/updating user Details ");
   next(error);
}
}
addReview = async (req:Request,res:Response,next:NextFunction) =>{
  try {
    const {coachId,userId,review,starRating} = req.body
    const result = await this.userService.addReview(coachId,userId,review,starRating)
    if(result){
    res.status(HttpStatus.OK).json(result)
    }else{
      res.status(HttpStatus.NOT_FOUND).json({success:false})
    }
  } catch (error) {
   console.error("error at review user  ");
   next(error);
  }
}

addDietGoal  = async (req:CustomRequest,res:Response,next:NextFunction) =>{
  try {
    const {data,userId} = req.body
    const resData = await this.userService.addDietGoal(userId,data)
    res.status(HttpStatus.OK).send({success:true,resData:resData})
  } catch (error) {
    console.error("error at editng/updating user Details ");
     next(error);
  }
  }

  updateSlot  = async (req:CustomRequest,res:Response,next:NextFunction) =>{
    try {
      const {id} = req?.user
      const user_id = new mongoose.Types.ObjectId(id)
      const resData = await this.userService.updateSlot(req.body.slot,user_id)
      if(resData.coachEmail){
      const  text = `Mr.${resData?.user?.userName} have changed thier SlotTime to ${resData?.user?.slotTaken}`
      await sendEmail(resData?.coachEmail,text);
      }
      res.status(HttpStatus.OK).send({success:true,resData:resData.user})
    } catch (error) {
      console.error("error at updating user slot time Details ");
       next(error);
    }
    }
}