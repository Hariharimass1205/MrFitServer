import jwt from "jsonwebtoken"

export function generateAccessToken (id:string,role:string){
    try {
        const payload = {id,role};
        const options = {expiresIn : "1h"};
        return jwt.sign(payload,process.env.JWT_SECRET!,options) 
    } catch (error) {
        throw new Error(error.message);
    }
}

export function generateRefreshToken (id:string,role:string){
    try {
    const payload = {id,role};
    const options = {expiresIn : "7d"};
    return jwt.sign(payload,process.env.JWT_SECRET!,options)
    } catch (error) {
      throw new Error(error.message);
    }
}