import { Router } from "express";
import authMiddleware from "../middlesware/jwtVerification";
import { CoachRepository } from "../repository/coachRepository";
import { CoachService } from "../services/coachService";
import { CoachController } from "../controllers/coachController";
import { uploadMiddleware } from "../middlesware/multerConfig";
import { IisBlockHandle } from "../middlesware/isBlockHandler";

const coachRouter = Router();
const repository = new CoachRepository()
const service = new CoachService(repository)
const controller = new CoachController(service)

coachRouter.post("/saveQuizScore",controller.saveScore)
coachRouter.post("/registerCoach",authMiddleware,controller.registerCoachController)

coachRouter.post("/fetchCoachdata",authMiddleware,IisBlockHandle,controller.fetchCoachDataController)
coachRouter.patch("/updateProfilePic",authMiddleware,IisBlockHandle,uploadMiddleware,controller.updateCoachProfilePic)
coachRouter.patch("/updatPackage",authMiddleware,IisBlockHandle,controller.updateCoachPackage)
coachRouter.patch("/updatProfile",authMiddleware,IisBlockHandle,controller.updateCoachProfile)
coachRouter.patch("/saveCoachAchievement",authMiddleware,controller.updateCoachAchievement)
coachRouter.put("/updateDiet",authMiddleware,IisBlockHandle,controller.updateUserDiet)
coachRouter.post('/updateAvailability',authMiddleware,IisBlockHandle,controller.updateAvailability)

export default coachRouter

