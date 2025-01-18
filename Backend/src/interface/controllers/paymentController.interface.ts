import { NextFunction ,Response,Request} from "express"
import { CustomRequest } from "../../middlesware/jwtVerification"




export interface IPaymentController{
  payment(req: CustomRequest, res: Response, next: NextFunction): Promise<any>
  saveData(req: Request, res: Response, next: NextFunction): Promise<any>
}