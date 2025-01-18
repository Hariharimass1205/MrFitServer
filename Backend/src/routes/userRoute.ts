import { Router } from "express";
import {UserController} from '../controllers/userController';
import authMiddleware from "../middlesware/jwtVerification";
import { userService } from "../services/userService";
import { UserRepository } from "../repository/userRepository";
import userModel from "../model/userModel";
import { IisBlockHandle } from "../middlesware/isBlockHandler";


const userRouter = Router();
const repository = new UserRepository()
const service = new userService(repository)
const controller = new UserController(service)


userRouter.post("/signup", controller.register);
userRouter.post("/login",controller.login);
userRouter.post("/google-login",controller.googleLogin);
userRouter.post("/signup", controller.register);
userRouter.post("/sentOTP",controller.otpVerify)


userRouter.post("/logout",authMiddleware,controller.logout)
userRouter.post('/forgotPassword1',controller.forgotPassword)
userRouter.post('/ForgotOTPVerify',controller.forgotPasswordOTPVerify)
userRouter.post('/saveNewPassword',controller.saveChangePassword)
userRouter.post('/resendOTP',controller.HandleResendOTP)


userRouter.post("/fetchdata",authMiddleware,IisBlockHandle,controller.fetchUserData)
userRouter.get('/fetchCoachdata',authMiddleware,IisBlockHandle,controller.fetchCoachlist) 
userRouter.get('/fetchUserDetails',authMiddleware,IisBlockHandle,controller.fetchUserDetails) 
userRouter.get('/fetchCoachDetails',authMiddleware,IisBlockHandle,controller.fetchCoachDetails) 
userRouter.put('/updateUserData',authMiddleware,IisBlockHandle,authMiddleware,controller.updateUserProfile)
userRouter.post('/addReview',authMiddleware,IisBlockHandle,controller.addReview)
userRouter.post('/addDietGoal',authMiddleware,IisBlockHandle,controller.addDietGoal)
userRouter.post('/updateSlot',authMiddleware,IisBlockHandle,authMiddleware,controller.updateSlot)


export default userRouter