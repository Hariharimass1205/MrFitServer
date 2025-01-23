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
exports.PaymentService = void 0;
const jssha_1 = __importDefault(require("jssha"));
class PaymentService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    generatePaymentHash(_a) {
        return __awaiter(this, arguments, void 0, function* ({ txnid, amount, productinfo, username, email, udf1 }) {
            try {
                const hashString = `${process.env.PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${username}|${email}|${udf1}||||||||||${process.env.PAYU_SALT}`;
                const sha = new jssha_1.default("SHA-512", "TEXT");
                sha.update(hashString);
                const hash = sha.getHash("HEX");
                const bookingData = {
                    txnid,
                    amount,
                    productinfo,
                    username,
                    email,
                    udf1,
                    paymentStatus: 'pending',
                    paymentHash: hash
                };
                const savedBooking = yield this.paymentRepository.paymentDetails(bookingData);
                // return savedBooking;
                return hash;
            }
            catch (error) {
                throw new Error("Error generating payment hash");
            }
        });
    }
    updateBookingStatus(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBooking = yield this.paymentRepository.updateBookingStatus(bookingData);
                return updatedBooking;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getCoachEmail(coachId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coachIds = yield this.paymentRepository.getCoachEmail(coachId);
                return coachIds;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.PaymentService = PaymentService;
