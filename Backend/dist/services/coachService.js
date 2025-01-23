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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachService = void 0;
class CoachService {
    constructor(coachRepository) {
        this.updateCoachScore = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { score, takenn } = data;
                let email = takenn.email;
                let res = yield this.coachRepository.findUserByEmailandUpdateCoach(score, email);
                console.log(res, "res from ser");
                return res;
            }
            catch (error) {
                throw new Error("error at sendind doc to db in service");
            }
        });
        this.registerCoachService = (coach) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exsitingUser = yield this.coachRepository.findUserByIdIsCoach(coach.userId);
                if (!exsitingUser) {
                    throw new Error("Email id not found as user");
                }
                return yield this.coachRepository.createCoach(coach);
            }
            catch (error) {
                throw error;
            }
        });
        this.updateCoachAvailability = (objData, coach_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachAvailability = yield this.coachRepository.updateProfileAvailability(objData, coach_id);
                return coachAvailability;
            }
            catch (error) {
                throw error;
            }
        });
        this.fetchCoachDataService = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachData = yield this.coachRepository.fetchCoachDataRepo(userId);
                return coachData;
            }
            catch (error) {
                throw new Error("error at fetching data for navbar");
            }
        });
        this.saveProfilePic = (url, idd) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachData = yield this.coachRepository.updateProfilePicture(url, idd);
                return coachData;
            }
            catch (error) {
                throw new Error("error at updating profile pic in coach side");
            }
        });
        this.updateCoachPackage = (objData, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachPackData = yield this.coachRepository.updatePackage(objData, userId);
                return coachPackData;
            }
            catch (error) {
                throw new Error("error at updating package in coach side");
            }
        });
        this.updateCoachProfile = (objData, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coachPackData = yield this.coachRepository.updateProfile(objData, userId);
                return coachPackData;
            }
            catch (error) {
                throw new Error("error at updating package in coach side");
            }
        });
        this.updateCoachACHIEVEMENT = (coachId, achievements) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.coachRepository.updatecoachAchiRepo(coachId, achievements);
            }
            catch (error) {
                throw new Error("error at updating achiii in coach side");
            }
        });
        this.updateDiet = (userId, dietEdit) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.coachRepository.updateDietUser(userId, dietEdit);
            }
            catch (error) {
                throw new Error("error at updating diet in coach side");
            }
        });
        this.coachRepository = coachRepository;
    }
}
exports.CoachService = CoachService;
