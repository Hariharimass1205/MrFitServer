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
exports.adminController = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
class adminController {
    constructor(adminService) {
        this.adminLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const data = { email: email, password: password };
                const result = yield this.adminService.adminLOGIN(data);
                if (result) {
                    res.cookie("accessToken", result.accessToken, { httpOnly: false });
                    res.cookie("refreshToken", result.refreshToken, { httpOnly: true });
                    res.json({ admin: result.admin });
                }
                else {
                    res.status(httpStatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: "Login failed" });
                }
            }
            catch (error) {
                console.error("Error at adminLogin");
                next(error);
            }
        });
        this.fetchDataList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminService.fetchDataService();
                res.status(httpStatusCode_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Error at sendingUserlist");
                next(error);
            }
        });
        this.blockUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield this.adminService.blockUserService(email);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
            }
            catch (error) {
                console.error("Error at blockUser");
                next(error);
            }
        });
        this.unblockUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield this.adminService.unblockUserService(email);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
            }
            catch (error) {
                console.error("Error at blockUser");
                next(error);
            }
        });
        this.changeCoachStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, newStatus } = req.body;
                const result = yield this.adminService.changeCoachStatusService(email, newStatus);
                res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true, result });
            }
            catch (error) {
                console.error("Error at changing status of coach");
                next(error);
            }
        });
        this.adminService = adminService;
    }
}
exports.adminController = adminController;
