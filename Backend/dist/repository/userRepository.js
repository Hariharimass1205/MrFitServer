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
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const node_cron_1 = __importDefault(require("node-cron"));
const coachModel_1 = __importDefault(require("../model/coachModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const reviewModel_1 = __importDefault(require("../model/reviewModel"));
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
const sendEmail_1 = require("../utils/sendEmail");
const DietStoreModel_1 = __importDefault(require("../model/DietStoreModel"));
class UserRepository {
    constructor() {
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ email }).exec();
                return user;
            }
            catch (error) {
                console.error('Error finding user by email:', error);
                throw new Error('Database Error');
            }
        });
        this.fetchuserDataRepo = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ _id: userId, isBlocked: false }).exec();
                return { data: user };
            }
            catch (error) {
                console.error('Error fetching user by email:', error);
                throw new Error('Database Error');
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new userModel_1.default(user);
                return yield newUser.save();
            }
            catch (error) {
                console.log(error);
                throw new Error('Database Error');
            }
        });
        this.verifyAndSaveUser = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email });
            if (user.otp == otp && user) {
                user.otp = null;
                user.otpVerified = true;
                yield user.save();
                return user;
            }
            throw new Error("Invalid OTP");
        });
        this.findUserByEmailandUpdate = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ email });
                user.otp = otp;
                yield user.save();
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error('Database forgototp Error');
            }
        });
        this.updateUser = (email, hashedpassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.updateOne({ email }, { password: hashedpassword });
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error('Database update forgot password');
            }
        });
        this.updateUserOTP = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.updateOne({ email }, { otp: otp });
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error('Database resend otp update  Error');
            }
        });
        this.fetchCoachListRep = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield coachModel_1.default.find().populate("userId", "profileImage isBlocked");
                const data = user.filter((coach) => !coach.userId.isBlocked);
                return { data: data };
            }
            catch (error) {
                console.error('Error fetching coach List:', error);
                throw new Error('Database Error');
            }
        });
        this.fetchCoachDetailsRep = (coach_id, user_Id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coach = yield coachModel_1.default.findOne({ _id: coach_id }).populate("userId", "profileImage quizScore email ");
                const studentsList = yield coachModel_1.default.findOne({ _id: coach_id }).populate("Students", "userName slotTaken enrolledDurationExpire");
                const user = yield userModel_1.default.findOne({ _id: user_Id });
                const reviews = yield reviewModel_1.default.find({ coachId: coach_id }).populate("userId", "userName state");
                let data = { coach: coach, user: user, reviews: reviews, studentsList: studentsList };
                return data;
            }
            catch (error) {
                console.error('Error fetching coach List:', error);
                throw new Error('Database Error');
            }
        });
        this.fetchUserDetailsRep = (coach_Id, user_Id) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield userModel_1.default.findOne({ _id: user_Id });
                let arr = [];
                const coach = yield coachModel_1.default.find({ _id: user.coachId }).populate("userId", "profileImage quizScore");
                const studentsList = yield coachModel_1.default.findOne({ _id: user.coachId }).populate("Students", "userName slotTaken enrolledDurationExpire");
                for (let i = 0; i <= (coach === null || coach === void 0 ? void 0 : coach.length); i++) {
                    const a = yield userModel_1.default.findOne({ _id: (_a = coach[0]) === null || _a === void 0 ? void 0 : _a.Students[i] });
                    arr.push(a === null || a === void 0 ? void 0 : a.slotTaken);
                }
                const userPayment = yield paymentModel_1.default.find({ userId: user_Id, paymentStatus: "completed" });
                const data = { user: user, coach: coach, payment: userPayment, coachSlots: arr, studentsList: studentsList };
                return data;
            }
            catch (error) {
                console.error('Error fetching coach List:', error);
                throw new Error('Database Error');
            }
        });
        this.updateUserDatas = (idd, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { Name, address, district, dob, email, phone, pincode, state } = data;
                const savedData = yield userModel_1.default.updateOne({ _id: idd }, { $set: {
                        userName: Name,
                        address: address,
                        district: district,
                        DOB: dob,
                        email: email,
                        phone: phone,
                        pincode: pincode,
                        state: state
                    } });
                const user = yield userModel_1.default.find({ _id: idd });
                return user;
            }
            catch (error) {
                console.error('Error user data savinf after profile edit:', error);
                throw new Error('Database Error');
            }
        });
        this.googleUser = (email, name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.updateOne({ email: email }, {
                    $set: {
                        userName: name,
                        phone: 'Not Provider',
                    },
                }, { upsert: true });
                const user = yield userModel_1.default.findOne({ email: email });
                if (!user) {
                    throw new Error("User not found after upsert.");
                }
                return {
                    _id: user._id.toString(),
                    userName: user.userName,
                    email: user.email,
                };
            }
            catch (error) {
                console.error('Error handling Google user:', error);
                throw error;
            }
        });
        this.updateSlot = (slot, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slotT = slot.replace(/^"|"$/g, "").replace(/\s(?=[AP]M)/g, "");
                const userUpdate = yield userModel_1.default.updateOne({ _id: userId }, { slotTaken: slotT });
                const userDeatils = yield userModel_1.default.findOne({ _id: userId }).populate("coachId");
                const coachEmail = yield userModel_1.default.findOne({ _id: userDeatils.coachId.userId });
                return { coachEmail: coachEmail.email, user: userDeatils };
            }
            catch (error) {
                console.error('Error handling update slot', error);
                throw error;
            }
        });
        this.addReview = (coachId, userId, review, starRating) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coach_Id = new mongoose_1.default.Types.ObjectId(coachId);
                const user_Id = new mongoose_1.default.Types.ObjectId(userId);
                const userr = yield userModel_1.default.findOne({ _id: user_Id });
                const data = yield reviewModel_1.default.create({
                    userId: user_Id,
                    coachId: coach_Id,
                    review: review,
                    starRating: starRating
                });
                console.log(data, userr.userName, "llllllllll");
                return { data: data, userName: userr.userName };
            }
            catch (error) {
                console.error('Error user add review:', error);
                throw new Error('Database Error');
            }
        });
        this.addDietGoalRepo = (userId, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_Id = new mongoose_1.default.Types.ObjectId(userId);
                const user = yield userModel_1.default.findById({ _id: user_Id });
                const { Meal1, Meal2, Meal3, Goal } = user.Diet;
                console.log(user_Id, user, data, "fromm reppppo");
                const dietData = {
                    coachId: user.coachId,
                    userId: user._id,
                    providedMeal1: Meal1 || "Not provided",
                    providedMeal2: Meal2 || "Not provided",
                    providedMeal3: Meal3 || "Not provided",
                    water: (data === null || data === void 0 ? void 0 : data.water) || "Not provided",
                    Calories: (data === null || data === void 0 ? void 0 : data.calories) || "Not provided",
                    Steps: (data === null || data === void 0 ? void 0 : data.steps) || "Not provided",
                    Protein: (data === null || data === void 0 ? void 0 : data.protein) || "Not provided",
                    Carbohydrates: (data === null || data === void 0 ? void 0 : data.Carbohydrates) || "Not provided",
                    Fats: (data === null || data === void 0 ? void 0 : data.Fats) || "Not provided",
                    Fiber: (data === null || data === void 0 ? void 0 : data.Fiber) || "Not provided",
                    SleepTime: (data === null || data === void 0 ? void 0 : data.SleepTime) || "Not provided",
                };
                const newDiet = yield DietStoreModel_1.default.create(dietData);
                yield newDiet.save();
                const savedData = yield userModel_1.default.updateOne({ _id: user_Id }, {
                    $set: {
                        "Diet.Goal": {
                            Water: data.water || null,
                            Calories: data.calories || null,
                            Protein: data.protein || null,
                            Steps: data.steps || null,
                            Carbohydrates: data.Carbohydrates || null,
                            Fats: data.Fats || null,
                            Fiber: data.Fiber || null,
                            SleepTime: data.SleepTime || null,
                        },
                    },
                });
                const uu = yield userModel_1.default.findById({ _id: user_Id });
                return uu;
            }
            catch (error) {
                console.error('Error at diet goal:', error);
                throw new Error('Database Error');
            }
        });
        this.resetDietGoals = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModel_1.default.updateMany({}, { $set: { "Diet.Goal": {
                            Water: null,
                            Calories: null,
                            Protein: null,
                            Steps: null,
                            Carbohydrates: null,
                            Fats: null,
                            Fiber: null,
                            SleepTime: null,
                        } } });
                console.log(`Diet goals reset successfully for ${result.modifiedCount} users.`);
            }
            catch (error) {
                console.error("Error resetting diet goals:", error);
            }
        });
        node_cron_1.default.schedule("0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Running cron job to reset diet goals daily.");
            yield this.resetDietGoals();
        }));
        node_cron_1.default.schedule("0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
            console.log("Running cron job to handle expired enrollments.");
            yield this.handleExpiredEnrollments();
        }));
    }
    //jobs 
    handleExpiredEnrollments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const text = `Your package got expired , Go grab ur best slot with your best coach `;
                const today = new Date().toISOString().split('T')[0];
                const expiredUsers = yield userModel_1.default.find({ enrolledDurationExpire: today });
                if (expiredUsers.length) {
                    for (let i = 0; i < expiredUsers.length; i++) {
                        yield (0, sendEmail_1.sendEmail)(expiredUsers[i].email, text);
                    }
                }
                const result = yield userModel_1.default.updateMany({ enrolledDurationExpire: today }, {
                    $set: {
                        'Diet.Meal1': null,
                        'Diet.Meal2': null,
                        'Diet.Meal3': null,
                        'Diet.Goal.Water': null,
                        'Diet.Goal.Calories': null,
                        'Diet.Goal.Steps': null,
                        'Diet.Goal.Protein': null,
                        'Diet.Goal.Carbohydrates': null,
                        'Diet.Goal.Fats': null,
                        'Diet.Goal.Fiber': null,
                        'Diet.Goal.SleepTime': null,
                        enrolledPackage: 0,
                        enrolledDurationExpire: "",
                        enrolledDuration: "",
                        enrolledDate: "",
                        coachId: null,
                        slotTaken: null
                    },
                });
                console.log(`${result.modifiedCount} user(s) updated.`);
            }
            catch (error) {
                console.error('Error updating expired enrollments:', error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
