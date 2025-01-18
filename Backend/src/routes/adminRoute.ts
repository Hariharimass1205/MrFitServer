import { Router } from "express";
import { adminReository } from "../repository/adminRepository";
import { adminController } from "../controllers/adminController";
import { adminService } from "../services/adminService";
import authMiddleware from "../middlesware/jwtVerification";

const adminRouter = Router()
const repository = new adminReository()
const service = new adminService(repository)
const controller = new adminController(service)

adminRouter.post("/adminlogin",controller.adminLogin)
adminRouter.post("/blockUser",controller.blockUser)
adminRouter.post("/unblockUser",controller.unblockUser)
adminRouter.post("/fetchUserList",controller.fetchDataList)
adminRouter.post("/changeStatus",controller.changeCoachStatus)
export default adminRouter