import { NextFunction, Request,Response } from "express";
import { CustomRequest } from "../../middlesware/jwtVerification";

export interface ICoachController{
    saveScore(req: Request, res: Response, next: NextFunction): Promise<void>
    registerCoachController(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchCoachDataController(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCoachProfilePic(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCoachPackage(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCoachProfile(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCoachAchievement(req: Request, res: Response, next: NextFunction): Promise<void>
    updateAvailability(req: Request, res: Response, next: NextFunction): Promise<void>
}