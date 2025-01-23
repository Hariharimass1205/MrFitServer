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
exports.adminService = void 0;
const JWTgenerator_1 = require("../utils/JWTgenerator");
class adminService {
    constructor(adminRepository) {
        this.adminLOGIN = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                if (process.env.ADMIN_EMAIL !== email) {
                    throw new Error("Invalid Credential");
                }
                if (process.env.ADMIN_PASS !== password) {
                    throw new Error("Invalid Credential");
                }
                const accessToken = (0, JWTgenerator_1.generateAccessToken)(process.env.ADMIN_EMAIL, process.env.ADMIN_ROLE);
                const refreshToken = (0, JWTgenerator_1.generateRefreshToken)(process.env.ADMIN_EMAIL, process.env.ADMIN_ROLE);
                return { accessToken, refreshToken, admin: email };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.fetchDataService = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.adminRepository.fetchDataRepo();
                return data;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.blockUserService = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.adminRepository.blockUserbyEmail(email);
                return data;
            }
            catch (error) {
                console.log("error at handling block in admin service");
                throw new Error(error);
            }
        });
        this.unblockUserService = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.adminRepository.unblockUserbyEmail(email);
                return data;
            }
            catch (error) {
                console.log("error at handling block in admin service");
                throw new Error(error);
            }
        });
        this.changeCoachStatusService = (email, newStatus) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminRepository.changeStatusByEmail(email, newStatus);
                return result;
            }
            catch (error) {
                console.log("error at changing status of coach in  admin service");
                throw new Error(error);
            }
        });
        this.adminRepository = adminRepository;
    }
}
exports.adminService = adminService;
