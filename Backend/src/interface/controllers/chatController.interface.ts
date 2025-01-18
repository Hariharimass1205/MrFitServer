

import { NextFunction, Request,Response } from "express";
export interface IChatController{
 saveMessage(req: Request, res: Response, next: NextFunction): Promise<void>
 saveMessageCoach(req: Request, res: Response, next: NextFunction): Promise<void>
 getMessages(req: Request, res: Response, next: NextFunction): Promise<void>
 getRoomId(req: Request, res: Response, next: NextFunction): Promise<void>
}
