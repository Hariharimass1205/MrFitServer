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
exports.PaymentController = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
const sendEmail_1 = require("../utils/sendEmail");
class PaymentController {
    constructor(paymentService) {
        this.payment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { txnid, amount, productinfo, username, email, udf1 } = req.body;
                if (!txnid || !amount || !productinfo || !username || !email || !udf1) {
                    return res.status(httpStatusCode_1.HttpStatus.BAD_REQUEST).send("Mandatory fields missing");
                }
                const hash = yield this.paymentService.generatePaymentHash({
                    txnid,
                    amount,
                    productinfo,
                    username,
                    email,
                    udf1,
                });
                console.log(hash, "hashed key");
                res.status(httpStatusCode_1.HttpStatus.OK).send({ hash });
            }
            catch (err) {
                next(err);
            }
        });
        this.saveData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { txnid, email, productinfo, status, amount, udf1, package: packageType, slotTime } = req.body;
                const userId = udf1;
                const coachId = productinfo;
                yield this.paymentService.getCoachEmail(coachId);
                const text = `you got a new client for ${packageType}`;
                yield (0, sendEmail_1.sendEmail)(req.body.email, text);
                const updatedBooking = yield this.paymentService.updateBookingStatus({
                    txnid,
                    email,
                    coachId,
                    status,
                    amount,
                    userId,
                    packageType,
                    slotTime
                });
                if (updatedBooking) {
                    res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, updatedBookingId: updatedBooking });
                }
                else {
                    res
                        .status(httpStatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ success: false, message: "Booking update failed" });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.paymentService = paymentService;
    }
}
exports.PaymentController = PaymentController;
