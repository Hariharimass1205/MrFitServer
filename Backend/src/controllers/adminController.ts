import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { IAdminController } from "../interface/controllers/adminController.interface";
import { IAdminService } from "../interface/services/adminService.interface";

export class adminController implements IAdminController{
  private  adminService : IAdminService;
  constructor(adminService:IAdminService) {
    this.adminService = adminService
  }

adminLogin = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,password} = req.body
      const data = {email:email,password:password}
      const result:any = await this.adminService.adminLOGIN(data) 
      if (result) {
        res.cookie("accessToken",
          result.accessToken,
        {httpOnly:false}
        );
        res.cookie("refreshToken",
           result.refreshToken,
          {httpOnly:true}
        );
        res.json({admin:result.admin,auth:{accessToken:result.accessToken,refreshToken:result.refreshToken}});
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message:"Login failed" });
      }
    } catch (error) {
      console.error("Error at adminLogin");
      next(error);
    }
  }

  fetchDataList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await this.adminService.fetchDataService()
        res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.error("Error at sendingUserlist");
      next(error);
    }
  }
  
  blockUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email} = req.body
      const result = await this.adminService.blockUserService(email)
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at blockUser");
      next(error);
    }
  }
  unblockUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email} = req.body
      const result = await this.adminService.unblockUserService(email)
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at blockUser");
      next(error);
    }
  }
  changeCoachStatus = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,newStatus} = req.body
      const result = await this.adminService.changeCoachStatusService(email,newStatus)
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at changing status of coach");
      next(error);
    }
  }
}
