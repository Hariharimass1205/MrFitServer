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
exports.PaymentRepository = void 0;
const mongoose = require('mongoose');
const chatRoomModel_1 = __importDefault(require("../model/chatRoomModel"));
const coachModel_1 = __importDefault(require("../model/coachModel"));
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const calculateDateExpire_1 = require("../utils/calculateDateExpire");
class PaymentRepository {
    constructor() {
        this.paymentDetails = (bookingData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { txnid, amount, productinfo, username, email, udf1 } = bookingData;
                const paymentDetail = yield paymentModel_1.default.create({
                    userName: username,
                    userEmail: email,
                    userId: udf1,
                    coachId: productinfo,
                    transactionId: txnid,
                    amount: amount,
                });
                if (!paymentDetail) {
                    throw new Error(`Doctor with slot not found.`);
                }
                return {
                    status: 'pending',
                    success: true,
                    message: 'payment updated successfully'
                };
            }
            catch (error) {
                console.error("Error in payment doc creation:", error);
                throw new Error(error.message);
            }
        });
        this.updateBookingStatus = (bookingData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { txnid, email, coachId, status, amount, userId, packageType, slotTime } = bookingData;
                const enrolledPackage = `${packageType}`;
                const updatedPayment = yield paymentModel_1.default.updateOne({ userEmail: email }, { $set: { paymentStatus: "completed" } });
                const createRoom = yield chatRoomModel_1.default.create({ user: userId, coach: coachId });
                const payment = yield paymentModel_1.default.findOne({ userEmail: email, userId: userId });
                const paymentDate = new Intl.DateTimeFormat("en-US").format(new Date(payment.transactionDate));
                const expireDate = (0, calculateDateExpire_1.calculateExpirationDate)(paymentDate, enrolledPackage);
                const slotT = slotTime.replace(/^"|"$/g, "").replace(/\s(?=[AP]M)/g, "");
                const userCoachIdUpdate = yield userModel_1.default.updateOne({ _id: userId }, {
                    $set: {
                        enrolledPackage: amount,
                        enrolledDuration: enrolledPackage,
                        coachId: coachId,
                        enrolledDate: paymentDate,
                        enrolledDurationExpire: expireDate,
                        slotTaken: slotT,
                    },
                });
                const addUserIdToCoach = yield coachModel_1.default.updateOne({ _id: new mongoose.Types.ObjectId(coachId) }, {
                    $addToSet: { Students: new mongoose.Types.ObjectId(userId) },
                    $inc: { noOfStudentsCoached: 1 },
                });
                const updatedUser = yield userModel_1.default.findOne({ _id: userId });
                return updatedPayment;
            }
            catch (error) {
                console.error("Error in payment doc creation:", error);
                throw new Error(error.message);
            }
        });
        this.getCoachEmail = (coachId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const coach_Id = new mongoose.Types.ObjectId(coachId);
                const coach = (yield coachModel_1.default.findOne({ _id: coach_Id })).populate("userId", "email");
                return coach;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.PaymentRepository = PaymentRepository;
