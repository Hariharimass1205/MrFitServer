import { NextFunction,Response } from "express";
import { CustomRequest } from "./jwtVerification";
import userModel from "../model/userModel";

export async function  IisBlockHandle(req:CustomRequest,res:Response,next:NextFunction):Promise<any>{
    try {
        const user_id =  req?.user
        if(!user_id){
         res.status(401).json({ message: "Unauthorized: No user ID provided." });
         return
     }
     const user = await userModel.findById(user_id.id)
     if(user.isBlocked){
         res.status(403).json({ message: "Access denied: Your account is blocked." });
         return
     }
     next();
    } catch (error) {
        console.error("Error checking user blocked status:", error);
        res.status(500).json({ message: "Internal server error." });
        return
    }
      
    
}
