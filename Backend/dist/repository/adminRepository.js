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
exports.adminReository = void 0;
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
class adminReository {
    constructor() {
        this.fetchDataRepo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find({ isCoach: false }).exec();
                const totalCash = yield userModel_1.default.find({ enrolledPackage: { $gt: 0 } });
                const coaches = yield userModel_1.default.find({ isCoach: true }).exec();
                const pendingApprovals = yield userModel_1.default.find({ isApproved: "Pending" }).exec();
                const enrolledUsers = yield userModel_1.default.find({ enrolledPackage: { $gt: 0 } }).populate("coachId", "name");
                const paymentList = yield paymentModel_1.default.find({ paymentStatus: "completed" });
                const result = {
                    userList: users,
                    pendingApprovalsList: pendingApprovals.length,
                    users,
                    coachList: coaches.length,
                    coaches: coaches,
                    enrolledUsers: enrolledUsers,
                    paymentList
                };
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.blockUserbyEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blockedUser = yield userModel_1.default.updateOne({ email }, { isBlocked: true });
                return blockedUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.unblockUserbyEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const unblockedUser = yield userModel_1.default.updateOne({ email }, { isBlocked: false });
                return unblockedUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.changeStatusByEmail = (email, newStatus) => __awaiter(this, void 0, void 0, function* () {
            try {
                const changedStatus = yield userModel_1.default.updateOne({ email }, { isApproved: newStatus });
                const updatedStatus = yield userModel_1.default.findOne({ email });
                return updatedStatus;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.adminReository = adminReository;
