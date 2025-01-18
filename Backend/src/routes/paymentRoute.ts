import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { PaymentRepository } from "../repository/paymentRepository";
import { PaymentService } from "../services/paymentService";
import authMiddleware from "../middlesware/jwtVerification";



const paymentRouter = Router();
const repository = new PaymentRepository()
const service = new PaymentService(repository)
const controller = new PaymentController(service)


paymentRouter.post("/payment",controller.payment);
paymentRouter.post("/response/saveData",controller.saveData);

export default paymentRouter