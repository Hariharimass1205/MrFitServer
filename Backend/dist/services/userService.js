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
exports.userService = void 0;
const JWTgenerator_1 = require("../utils/JWTgenerator");
const bcrypt_1 = __importDefault(require("bcrypt"));
class userService {
    constructor(userRepository) {
        this.registerUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exsitingUser = yield this.userRepository.findUserByEmail(user.email);
                if (exsitingUser) {
                    if (exsitingUser) {
                        throw new Error("Email already Exist");
                    }
                }
                const hashedpassword = yield bcrypt_1.default.hash(user.password, 10);
                user.password = hashedpassword;
                return yield this.userRepository.createUser(user);
            }
            catch (error) {
                throw error;
            }
        });
        this.verifyOTPService = (otpData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = otpData.email;
                const otp = otpData.otp;
                const user = yield this.userRepository.findUserByEmail(email);
                if (!user) {
                    throw new Error("user not found");
                }
                if (user.otp == otp) {
                    yield this.userRepository.verifyAndSaveUser(email, otp);
                    return "User registered successfully";
                }
                else {
                    throw new Error("OTP invalid");
                }
            }
            catch (error) {
                throw new Error("Invalid OTP");
            }
        });
        this.fetchuserdataService = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.fetchuserDataRepo(userId);
                return data;
            }
            catch (error) {
                throw new Error("error at fetching data for navbar");
            }
        });
        this.updateSlot = (slot, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.updateSlot(slot, userId);
                return data;
            }
            catch (error) {
                throw new Error("error at update data for navbar");
            }
        });
        this.loginUser = (loginData) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const email = loginData.email;
                const password = loginData.password;
                let userId = null;
                const user = yield this.userRepository.findUserByEmail(email);
                if (!user) {
                    console.log("user not found");
                    throw new Error("Invalid Email/Password");
                }
                if (user.isBlocked) {
                    throw new Error("User is Blocked");
                }
                if (user) {
                    userId = (_a = user === null || user === void 0 ? void 0 : user._id) === null || _a === void 0 ? void 0 : _a.toString();
                }
                const isPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isPassword) {
                    throw new Error("Invalid Email/Password");
                }
                const accessToken = (0, JWTgenerator_1.generateAccessToken)(userId, user.role);
                const refreshToken = (0, JWTgenerator_1.generateRefreshToken)(userId, user.role);
                return { user, accessToken, refreshToken };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw new Error(error.message);
            }
        });
        this.googleUser = (email, displayName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.googleUser(email, displayName);
                const accessToken = (0, JWTgenerator_1.generateAccessToken)(user._id, "user");
                const refreshToken = (0, JWTgenerator_1.generateRefreshToken)(user._id, "user");
                return { user, accessToken, refreshToken };
            }
            catch (error) {
                throw error;
            }
        });
        this.checkUserAndOtpSent = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = data;
                const saveOTP = yield this.userRepository.findUserByEmailandUpdate(email, otp);
                saveOTP;
                if (!saveOTP) {
                    throw new Error("user not found");
                }
                return saveOTP;
            }
            catch (error) {
                console.log("error at checkUser at service");
                throw new Error("error at checkUser in service in forgotpass");
            }
        });
        this.forgotPassverifyOTPService = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = data;
                const user = yield this.userRepository.findUserByEmail(email);
                if (!user) {
                    throw new Error("user not found");
                }
                if (user.otp == otp) {
                    yield this.userRepository.verifyAndSaveUser(email, otp);
                    return "User registered successfully";
                }
                else {
                    throw new Error("OTP invalid");
                }
            }
            catch (error) {
                throw new Error("Invalid OTP");
            }
        });
        this.saveNewPassword = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = data;
                const hashedpassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield this.userRepository.updateUser(email, hashedpassword);
                return user;
            }
            catch (error) {
                throw new Error("error at saving chanage password");
            }
        });
        this.saveOTPtoModel = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = data;
                const user = yield this.userRepository.updateUserOTP(email, otp);
                return user;
            }
            catch (error) {
                throw new Error("error at saving otp for resend otp");
            }
        });
        this.fetchCoachListSer = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.fetchCoachListRep();
                return data;
            }
            catch (error) {
                console.log("error at fetching cocah list in service");
                throw new Error("error at fetching coach data for navbar");
            }
        });
        this.fetchCoachDetails = (coach_id, user_Id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.fetchCoachDetailsRep(coach_id, user_Id);
                return data;
            }
            catch (error) {
                console.log("error at fetching cocah list in service");
                throw new Error("error at fetching data coach for navbar");
            }
        });
        this.fetchUserDetails = (coach_Id, user_Id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userRepository.fetchUserDetailsRep(coach_Id, user_Id);
                return data;
            }
            catch (error) {
                console.log("error at fetching cocah list in service");
                throw new Error("error at fetching data for navbar");
            }
        });
        this.updateUserProfile = (idd, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield this.userRepository.updateUserDatas(idd, data);
                return datas;
            }
            catch (error) {
                console.log("error at saving edited data in user service");
                throw new Error("error at saving edited data in user ");
            }
        });
        this.addReview = (coachId, userId, review, starRating) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield this.userRepository.addReview(coachId, userId, review, starRating);
                return datas;
            }
            catch (error) {
                console.log("error at addreview user service");
                throw new Error("error at saving edited data in user ");
            }
        });
        this.addDietGoal = (userId, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = yield this.userRepository.addDietGoalRepo(userId, data);
                return datas;
            }
            catch (error) {
                console.log("error at addreview user service");
                throw new Error("error at saving edited data in user ");
            }
        });
        this.userRepository = userRepository;
    }
}
exports.userService = userService;
