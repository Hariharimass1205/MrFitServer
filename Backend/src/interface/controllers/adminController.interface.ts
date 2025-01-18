import { NextFunction, Request,Response } from "express";

export interface IAdminController{
    adminLogin(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchDataList(req: Request, res: Response, next: NextFunction): Promise<void>
    blockUser(req: Request, res: Response, next: NextFunction): Promise<void>
    unblockUser(req: Request, res: Response, next: NextFunction): Promise<void>
    changeCoachStatus(req: Request, res: Response, next: NextFunction): Promise<void>
}