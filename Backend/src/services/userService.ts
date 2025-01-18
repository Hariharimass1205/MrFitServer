import { generateRefreshToken,generateAccessToken } from '../utils/JWTgenerator'
import bcrypt from 'bcrypt'
import { IUserService } from '../interface/services/userService.interface'
import { checkUserAndOtpSentInput, fetchuserdataServiceOutput, forgotPassverifyOTPServiceInput, loginUserInput, loginUserOutput, registerUserOutput, saveNewPasswordInput, saveOTPtoModelInput, verifyOTPServiceInput } from '../interface/services/userService.type'
import { Types } from 'mongoose'
import { IUserRepository } from '../interface/repository/userRepository.interface'

export class userService implements IUserService{
  private userRepository:IUserRepository
  constructor(userRepository:any){
    this.userRepository=userRepository
  }

 registerUser = async (user:any): Promise<registerUserOutput | null>=>{
    try {
        const exsitingUser = await this.userRepository.findUserByEmail(user.email)
        if(exsitingUser){
            if(exsitingUser){
                throw new Error("Email already Exist");
            }
        }
        const hashedpassword =  await bcrypt.hash(user.password,10)
        user.password = hashedpassword;
        return await this.userRepository.createUser(user)
    } catch (error) {
        throw error
    }
}

verifyOTPService = async (otpData:verifyOTPServiceInput): Promise<string | null>=>{
    try {
        const email = otpData.email
        const otp = otpData.otp
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(user.otp==otp){
          await this.userRepository.verifyAndSaveUser(email,otp)
          return "User registered successfully";
        }else{
            throw new Error("OTP invalid")
        }
    } catch (error) {
        throw new Error("Invalid OTP");
    }
}

 fetchuserdataService = async (userId:string): Promise<fetchuserdataServiceOutput>=>{
    try {
        const data = await this.userRepository.fetchuserDataRepo(userId)
        return data
    } catch (error) {
        throw new Error("error at fetching data for navbar");
    }
}

updateSlot = async (slot:string,userId:Types.ObjectId): Promise<any>=>{
    try {
        const data = await this.userRepository.updateSlot(slot,userId)
        return data
    } catch (error) {
        throw new Error("error at update data for navbar");
    }
}

 loginUser = async (loginData:loginUserInput): Promise<loginUserOutput>=>{
 try {
    const email = loginData.email
    const password = loginData.password
    let userId = null
    const user = await this.userRepository.findUserByEmail(email)
    if(!user){
        console.log("user not found")
        throw new Error("Invalid Email/Password")
    }
    if(user.isBlocked){
        throw new Error("User is Blocked")
    }
    if(user){
        userId = user?._id?.toString()
    }
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        throw new Error("Invalid Email/Password")
    }
    const accessToken = generateAccessToken(userId,user.role) 
    const refreshToken = generateRefreshToken(userId,user.role) 
    return {user,accessToken,refreshToken} 
 } catch (error:any) { 
    console.error('Error during login:', error); 
    throw new Error(error.message); 
 }
}


 googleUser= async (email:any,displayName:any): Promise<any|null>=> {
    try {
        const user = await this.userRepository.googleUser(email,displayName);
          const accessToken = generateAccessToken(user._id, "user");
          const refreshToken = generateRefreshToken(user._id, "user");
          return { user, accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
}


checkUserAndOtpSent = async (data:checkUserAndOtpSentInput): Promise<any|null>=>{
    try {
        const {email,otp} = data
        const saveOTP = await this.userRepository.findUserByEmailandUpdate(email,otp)
        saveOTP
        if(!saveOTP){
            throw new Error("user not found")
        }
        return saveOTP
    } catch (error) {
        console.log("error at checkUser at service")
        throw new Error("error at checkUser in service in forgotpass")
    }
}

 forgotPassverifyOTPService = async (data:forgotPassverifyOTPServiceInput) : Promise<string>=>{
    try {
        const {email,otp} = data
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(user.otp==otp){
          await this.userRepository.verifyAndSaveUser(email,otp)
          return "User registered successfully";
        }else{
            throw new Error("OTP invalid")
        }
    } catch (error) {
        throw new Error("Invalid OTP");
    }
}

 saveNewPassword = async (data:saveNewPasswordInput):Promise<any|null>=>{
    try {
        const {password,email} = data
        const hashedpassword =  await bcrypt.hash(password,10)
        const user = await this.userRepository.updateUser(email,hashedpassword)
        return user
    } catch (error) {
        throw new Error("error at saving chanage password");
    }
}

 saveOTPtoModel = async (data:saveOTPtoModelInput):Promise<any|null>=>{
    try {
        const {email,otp} = data
        const user = await this.userRepository.updateUserOTP(email,otp)
        return user
    } catch (error) {
        throw new Error("error at saving otp for resend otp");
    }
}
fetchCoachListSer= async ():Promise<any|null>=>{
    try {
        const data = await this.userRepository.fetchCoachListRep()
        return data
    } catch (error) {
        console.log("error at fetching cocah list in service")
        throw new Error("error at fetching coach data for navbar");
    }
}

fetchCoachDetails= async (coach_id:Types.ObjectId,user_Id:Types.ObjectId):Promise<any|null>=>{
    try {
        const data = await this.userRepository.fetchCoachDetailsRep(coach_id,user_Id)
        return data
    } catch (error) {
        console.log("error at fetching cocah list in service")
        throw new Error("error at fetching data coach for navbar");
    }
}

fetchUserDetails= async (coach_Id:Types.ObjectId,user_Id:Types.ObjectId):Promise<any|null>=>{
    try {
        const data = await this.userRepository.fetchUserDetailsRep(coach_Id,user_Id)
        return data
    } catch (error) {
        console.log("error at fetching cocah list in service")
        throw new Error("error at fetching data for navbar");
    }
}
updateUserProfile = async(idd:Types.ObjectId,data:any):Promise<any|null>=>{
    try {
        const datas = await this.userRepository.updateUserDatas(idd,data)
        return datas
    } catch (error) {
        console.log("error at saving edited data in user service")
        throw new Error("error at saving edited data in user ");
    }
}
addReview = async (coachId:Types.ObjectId,userId:Types.ObjectId,review:string,starRating:number):Promise<any | null>=>{
    try {
        const datas = await this.userRepository.addReview(coachId,userId,review,starRating)
        return datas
    } catch (error) {
        console.log("error at addreview user service")
        throw new Error("error at saving edited data in user ");
    }
}

addDietGoal = async (userId:Types.ObjectId,data:Object):Promise<any | null>=>{
    try {
        const datas = await this.userRepository.addDietGoalRepo(userId,data)
        return datas
    } catch (error) {
        console.log("error at addreview user service")
        throw new Error("error at saving edited data in user ");
    }
}
}