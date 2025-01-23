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
exports.CoachRepository = void 0;
const coachModel_1 = __importDefault(require("../model/coachModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = require("mongoose");
class CoachRepository {
    constructor() {
        this.findUserByEmailandUpdateCoach = (score, email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield userModel_1.default.updateOne({ email }, { quizScore: score, isCoach: true, isApproved: "Pending", role: "coach" });
                const updatedScore = yield userModel_1.default.findOne({ email });
                return updatedScore;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.findUserByIdIsCoach = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield userModel_1.default.findOne({ _id: id }).exec();
                if (!userExists) {
                    throw new Error(`User with id ${id} not found.`);
                }
                const updateRegistorField = yield userModel_1.default.updateOne({ _id: id }, { $set: { isRegisted: true } });
                const coach = yield userModel_1.default.findOne({ _id: id, isRegisted: true }).exec();
                return coach;
            }
            catch (error) {
                console.error('Error in findUserByIdIsCoach:', error.message);
                throw new Error(error.message);
            }
        });
        this.createCoach = (coach) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newCoach = new coachModel_1.default(coach);
                return yield newCoach.save();
            }
            catch (error) {
                console.log(error);
                throw new Error('Database Error');
            }
        });
        this.fetchCoachDataRepo = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachDetails = yield coachModel_1.default
                    .findOne({ userId: userId })
                    .populate('Students', 'userName phone district enrolledDuration enrolledDate  enrolledDurationExpire Diet _id slotTaken')
                    .exec();
                const userImage = yield userModel_1.default.findOne({ _id: userId });
                const data = { coach: coachDetails, userImg: userImage.profileImage };
                return data;
            }
            catch (error) {
                console.error('Error fetching coach by email:', error);
                throw new Error('Database Error');
            }
        });
        this.updateProfilePicture = (url, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateMessage = yield userModel_1.default.updateOne({ _id: userId }, { profileImage: url });
                const userInfo = yield userModel_1.default.findOne({ _id: userId });
                return userInfo;
            }
            catch (error) {
                console.error('Error at updating profile coach by id:', error);
                throw new Error('Database Error');
            }
        });
        this.updatePackage = (objData, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateMessage = yield coachModel_1.default.updateOne({ userId: userId }, { $set: { "package.monthlyPackage": objData.pack.monthlyPackage,
                        "package.quarterlyPackage": objData.pack.quarterlyPackage,
                        "package.yearlyPackage": objData.pack.yearlyPackage
                    } });
                const coachInfo = yield coachModel_1.default.findOne({ userId: userId });
                return coachInfo;
            }
            catch (error) {
                console.error('Error at updating package coach by id:', error);
                throw new Error('Database Error');
            }
        });
        this.updateProfile = (objData, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateMessage = yield coachModel_1.default.updateOne({ userId: userId }, { $set: {
                        name: objData.objData.name,
                        age: objData.objData.age,
                        height: objData.objData.height,
                        weight: objData.objData.weight,
                        phone: objData.objData.phone,
                        state: objData.objData.state,
                        address: objData.objData.address
                    } });
                const coachInfo = yield coachModel_1.default.findOne({ userId: userId });
                return coachInfo;
            }
            catch (error) {
                console.error('Error at updating package coach by id:', error);
                throw new Error('Database Error');
            }
        });
        this.updatecoachAchiRepo = (coachId, achievement) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(coachId)) {
                    throw new Error('Invalid coachId format');
                }
                const acheve1 = achievement.achievementsOne;
                const acheve2 = achievement.achievementsTwo;
                const acheve3 = achievement.achievementsThree;
                const userId = new mongoose_1.Types.ObjectId(coachId);
                const res = yield coachModel_1.default.updateOne({ userId: userId }, {
                    $set: {
                        "achievementBadges.achievementsOne": acheve1,
                        "achievementBadges.achievementsTwo": acheve2,
                        "achievementBadges.achievementsThree": acheve3
                    }
                });
                if (res.modifiedCount === 0) {
                    console.log("No updates made");
                }
                else {
                    console.log("Achievements updated successfully");
                }
                const res2 = yield coachModel_1.default.find({ userId: userId });
                return res2;
            }
            catch (error) {
                console.error('Error at updating achievemeent coach by id:', error);
                throw new Error('Database Error');
            }
        });
        this.updateDietUser = (userId, dietEdit) => __awaiter(this, void 0, void 0, function* () {
            try {
                const meal1 = dietEdit === null || dietEdit === void 0 ? void 0 : dietEdit.Meal1;
                const meal2 = dietEdit === null || dietEdit === void 0 ? void 0 : dietEdit.Meal2;
                const meal3 = dietEdit === null || dietEdit === void 0 ? void 0 : dietEdit.Meal3;
                const userDiet = yield userModel_1.default.updateOne({ _id: userId }, { $set: { "Diet.Meal1": meal1, "Diet.Meal2": meal2, "Diet.Meal3": meal3 } });
                return userDiet;
            }
            catch (error) {
                console.error('Error at updating package coach by id:', error);
                throw new Error('Database Error');
            }
        });
        this.updateProfileAvailability = (objData, coach_id) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const updatedAvailability = yield coachModel_1.default.updateOne({ userId: coach_id }, { $set: {
                        "availability.fromTime": (_a = objData === null || objData === void 0 ? void 0 : objData.availability) === null || _a === void 0 ? void 0 : _a.fromTime,
                        "availability.toTime": (_b = objData === null || objData === void 0 ? void 0 : objData.availability) === null || _b === void 0 ? void 0 : _b.toTime,
                        "availability.workingDays": (_c = objData === null || objData === void 0 ? void 0 : objData.availability) === null || _c === void 0 ? void 0 : _c.workingDays,
                    } });
                const coach = yield coachModel_1.default.findOne({ userId: coach_id });
                return coach;
            }
            catch (error) {
                console.error('Error at updating availability coach by id:', error);
                throw new Error('Database Error');
            }
        });
    }
}
exports.CoachRepository = CoachRepository;
