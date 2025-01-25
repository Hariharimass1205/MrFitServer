"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const OtoGenerator_1 = require("../utils/OtoGenerator");
const sendEmail_1 = require("../utils/sendEmail");
const httpStatusCode_1 = require("../utils/httpStatusCode");
const mongoose_1 = __importDefault(require("mongoose"));
class UserController {
    constructor(userService) {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = (0, OtoGenerator_1.otpGenerator)();
                yield (0, sendEmail_1.sendEmail)(req.body.email, otp);
                let registerUserRes = yield this.userService.registerUser({
                    userName: req.body.userName,
                    email: req.body.email,
                    phone: req.body.phone,
                    DOB: "",
                    profileImage: "",
                    otp: otp,
                    enrolledPackage: 0,
                    enrolledDuration: "",
                    enrolledDate: "",
                    enrolledDurationExpire: "",
                    password: req.body.password,
                    gender: req.body.gender,
                    address: "",
                    state: "",
                    district: "",
                    pincode: 0,
                    coachId: null,
                    isBlocked: false,
                    isCoach: false,
                    quizScore: 0,
                    isApproved: "",
                    role: "user",
                    isRegisted: false,
                });
                console.log(otp, req.body.email);
                if (registerUserRes) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
                }
                else {
                    res.status(httpStatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false });
                }
            }
            catch (error) {
                console.error("Error at registering user", error);
                next(error);
            }
        });
        this.otpVerify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                let otpData = { email: email, otp: otp };
                const result = yield this.userService.verifyOTPService(otpData);
                res.status(200).json({ result });
            }
            catch (error) {
                console.error("Error at otpVerification user");
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const loginData = { email: email, password: password };
                const { user, refreshToken, accessToken } = yield this.userService.loginUser(loginData);
                res.cookie("accessToken", accessToken, {
                    sameSite: "none",
                    httpOnly: false,
                    secure: true,
                    // domain:"https://mrfit.life"
                });
                res.cookie("refreshToken", refreshToken, {
                    sameSite: "none",
                    httpOnly: true,
                    secure: true,
                    // domain:"https://mrfit.life"
                });
                res.status(httpStatusCode_1.HttpStatus.OK).json({ user, authToken: { refreshToken, accessToken } });
            }
            catch (error) {
                console.error("Error at login user");
                next(error);
            }
        });
        this.googleLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, displayName } = req.body;
                const { user, accessToken, refreshToken } = yield this.userService.googleUser(email, displayName);
                res.cookie("accessToken", accessToken, {
                    sameSite: "strict",
                    httpOnly: false
                });
                res.cookie("refreshToken", refreshToken, {
                    sameSite: "strict",
                    httpOnly: true
                });
                res.status(httpStatusCode_1.HttpStatus.OK).send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshtoken");
                res.clearCookie('accesstoken');
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("Error at logout user");
                next(error);
            }
        });
        this.fetchUserData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const result = yield this.userService.fetchuserdataService(id);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
                }
            }
            catch (error) {
                console.error("Error at fetching user data");
                next(error);
            }
        });
        this.forgotPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = (0, OtoGenerator_1.otpGenerator)();
                const data = { email: email, otp: otp };
                const exsitingUser = yield this.userService.checkUserAndOtpSent(data);
                if (!exsitingUser) {
                    throw new Error("user not found");
                }
                yield (0, sendEmail_1.sendEmail)(req.body.email, otp);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("Error at forgotPassword sent otp");
                next(error);
            }
        });
        this.forgotPasswordOTPVerify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const data = { email: email, otp: otp };
                const result = yield this.userService.forgotPassverifyOTPService(data);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
                }
            }
            catch (error) {
                console.error("Error at resend  otpVerification user");
                next(error);
            }
        });
        this.saveChangePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const data = { password: password, email: email };
                const result = yield this.userService.saveNewPassword(data);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
                }
            }
            catch (error) {
                console.error("new Password saving");
                next(error);
            }
        });
        this.HandleResendOTP = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const otp = (0, OtoGenerator_1.otpGenerator)();
                yield (0, sendEmail_1.sendEmail)(req.body.email, otp);
                console.log("resend otp:", otp);
                const data = { otp: otp, email: email };
                const result = yield this.userService.saveOTPtoModel(data);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
                }
            }
            catch (error) {
                console.error("error at handling resent otp ");
                next(error);
            }
        });
        this.fetchCoachlist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.fetchCoachListSer();
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
                }
            }
            catch (error) {
                console.error("error at fetching coach list ");
                next(error);
            }
        });
        this.fetchCoachDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { coach, user } = req.query;
                const coach_Id = new mongoose_1.default.Types.ObjectId(coach);
                const user_Id = new mongoose_1.default.Types.ObjectId(user);
                const result = yield this.userService.fetchCoachDetails(coach_Id, user_Id);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, coachUserDetails: result });
            }
            catch (error) {
                console.error("error at fetching coach Details ");
                next(error);
            }
        });
        this.fetchUserDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, coachId } = req.query;
                const coach_Id = new mongoose_1.default.Types.ObjectId(coachId);
                const user_Id = new mongoose_1.default.Types.ObjectId(userId);
                const result = yield this.userService.fetchUserDetails(coach_Id, user_Id);
                console.log(result, "ppppppp");
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, usercoachDeatails: result });
            }
            catch (error) {
                console.error("error at fetching coach/user Details ");
                next(error);
            }
        });
        this.updateUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const data = req.body;
                const idd = new mongoose_1.default.Types.ObjectId(id);
                const resData = yield this.userService.updateUserProfile(idd, data);
                res.status(httpStatusCode_1.HttpStatus.OK).send({ success: true, res: resData });
            }
            catch (error) {
                console.error("error at editng/updating user Details ");
                next(error);
            }
        });
        this.addReview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { coachId, userId, review, starRating } = req.body;
                const result = yield this.userService.addReview(coachId, userId, review, starRating);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json(result);
                }
                else {
                    res.status(httpStatusCode_1.HttpStatus.NOT_FOUND).json({ success: false });
                }
            }
            catch (error) {
                console.error("error at review user  ");
                next(error);
            }
        });
        this.addDietGoal = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, userId } = req.body;
                const resData = yield this.userService.addDietGoal(userId, data);
                res.status(httpStatusCode_1.HttpStatus.OK).send({ success: true, resData: resData });
            }
            catch (error) {
                console.error("error at editng/updating user Details ");
                next(error);
            }
        });
        this.updateSlot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const user_id = new mongoose_1.default.Types.ObjectId(id);
                const resData = yield this.userService.updateSlot(req.body.slot, user_id);
                if (resData.coachEmail) {
                    const text = `Mr.${(_a = resData === null || resData === void 0 ? void 0 : resData.user) === null || _a === void 0 ? void 0 : _a.userName} have changed thier SlotTime to ${(_b = resData === null || resData === void 0 ? void 0 : resData.user) === null || _b === void 0 ? void 0 : _b.slotTaken}`;
                    yield (0, sendEmail_1.sendEmail)(resData === null || resData === void 0 ? void 0 : resData.coachEmail, text);
                }
                res.status(httpStatusCode_1.HttpStatus.OK).send({ success: true, resData: resData.user });
            }
            catch (error) {
                console.error("error at updating user slot time Details ");
                next(error);
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;
