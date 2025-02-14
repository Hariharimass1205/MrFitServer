"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwtVerification_1 = __importDefault(require("../middlesware/jwtVerification"));
const userService_1 = require("../services/userService");
const userRepository_1 = require("../repository/userRepository");
const isBlockHandler_1 = require("../middlesware/isBlockHandler");
const userRouter = (0, express_1.Router)();
const repository = new userRepository_1.UserRepository();
const service = new userService_1.userService(repository);
const controller = new userController_1.UserController(service);
userRouter.post("/signup", controller.register);
userRouter.post("/login", controller.login);
userRouter.post("/google-login", controller.googleLogin);
userRouter.post("/signup", controller.register);
userRouter.post("/sentOTP", controller.otpVerify);
userRouter.post("/logout", controller.logout);
userRouter.post('/forgotPassword1', controller.forgotPassword);
userRouter.post('/ForgotOTPVerify', controller.forgotPasswordOTPVerify);
userRouter.post('/saveNewPassword', controller.saveChangePassword);
userRouter.post('/resendOTP', controller.HandleResendOTP);
userRouter.post("/fetchdata", jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.fetchUserData);
userRouter.get('/fetchCoachdata', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.fetchCoachlist);
userRouter.get('/fetchUserDetails', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.fetchUserDetails);
userRouter.get('/fetchCoachDetails', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.fetchCoachDetails);
userRouter.put('/updateUserData', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, jwtVerification_1.default, controller.updateUserProfile);
userRouter.post('/addReview', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.addReview);
userRouter.post('/addDietGoal', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, controller.addDietGoal);
userRouter.post('/updateSlot', jwtVerification_1.default, isBlockHandler_1.IisBlockHandle, jwtVerification_1.default, controller.updateSlot);
exports.default = userRouter;
