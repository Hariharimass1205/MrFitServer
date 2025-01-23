"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachController = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
const mongoose_1 = __importStar(require("mongoose"));
class CoachController {
    constructor(coachService) {
        this.saveScore = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { score, coach } = req.body;
                const takenn = JSON.parse(coach);
                const data = { score: score, takenn: takenn };
                const result = yield this.coachService.updateCoachScore(data);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
                }
            }
            catch (error) {
                console.error("Error at saving score in coach side");
                next(error);
            }
        });
        this.registerCoachController = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { role, id } = req.user;
                const { formData } = req.body;
                const result = this.coachService.registerCoachService({
                    name: formData.fullName,
                    userId: new mongoose_1.Types.ObjectId(`${id}`),
                    phone: formData.phone,
                    age: formData.age,
                    height: formData.height,
                    weight: formData.weight,
                    noOfStudentsCoached: 0,
                    Students: [],
                    availability: {
                        fromTime: formData.availability.fromTime,
                        toTime: formData.availability.toTime,
                        workingDays: formData.availability.workingDays
                    },
                    achievementBadges: {
                        achievementsOne: "",
                        achievementsTwo: "",
                        achievementsThree: ""
                    },
                    package: {
                        monthlyPackage: 0,
                        quarterlyPackage: 0,
                        yearlyPackage: 0
                    },
                    state: formData.state,
                    city: formData.city,
                    locality: formData.locality,
                    address: formData.address,
                    licenseOrAadhaar: formData.licenseOrAadhaar,
                    role: "coach"
                });
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("Error at registering  coach");
                next(error);
            }
        });
        this.fetchCoachDataController = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const idd = new mongoose_1.default.Types.ObjectId(id);
                const result = yield this.coachService.fetchCoachDataService(idd);
                if (result) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
                }
            }
            catch (error) {
                console.error("Error at fetching user data");
                next(error);
            }
        });
        this.updateCoachProfilePic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const idd = new mongoose_1.default.Types.ObjectId(id);
                const url = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePic) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.location;
                const result = yield this.coachService.saveProfilePic(url, idd);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at updating coach profile pic in con");
                next(error);
            }
        });
        this.updateCoachPackage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const userId = new mongoose_1.default.Types.ObjectId(id);
                const objData = req.body;
                const result = yield this.coachService.updateCoachPackage(objData, userId);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at updating coach package  in con");
                next(error);
            }
        });
        this.updateAvailability = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const coach_id = new mongoose_1.default.Types.ObjectId(id);
                const objData = req.body;
                const result = yield this.coachService.updateCoachAvailability(objData, coach_id);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at updating coach availabilaty in con");
                next(error);
            }
        });
        this.updateCoachProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req === null || req === void 0 ? void 0 : req.user;
                const userId = new mongoose_1.default.Types.ObjectId(id);
                const objData = req.body;
                const result = yield this.coachService.updateCoachProfile(objData, userId);
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at updating coach profile  in con");
                next(error);
            }
        });
        this.updateCoachAchievement = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { dataset } = req.body;
                const coachId = dataset.coachId;
                const achievements = dataset.achievement;
                const result = yield this.coachService.updateCoachACHIEVEMENT(coachId, achievements);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
            }
            catch (error) {
                console.error("error at updating  coach achievement ");
                next(error);
            }
        });
        this.updateUserDiet = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, dietEdit } = req.body;
                const userId = new mongoose_1.default.Types.ObjectId(studentId);
                const ress = yield this.coachService.updateDiet(userId, dietEdit);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
            }
            catch (error) {
                console.error("error at updating  user diet");
                next(error);
            }
        });
        this.coachService = coachService;
    }
}
exports.CoachController = CoachController;
