import express from "express"
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatus } from '../utils/httpStatusCode';
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());


interface UserPayload extends JwtPayload {
    id: string;
    role: string;
  }

  export interface CustomRequest extends Request {
    user?: UserPayload;
    files?:""
  }


  const authMiddleware = (req:CustomRequest,res:Response,next:NextFunction)=>{
    const accessTokenHeader = req.headers['accesstoken'];
    const refreshTokenHeader = req.headers['refreshtoken'];
    
    // Function to safely extract the token from a header value
    const extractToken = (header: string | string[] | undefined): string | null => {
        if (!header) return null; // If the header is undefined, return null
        const rawToken = Array.isArray(header) ? header[0] : header; // Use the first element if it's an array
        return rawToken.replace(/^Bearer\s+/, '').replace(/^"|"$/g, ''); // Remove 'Bearer' prefix and surrounding quotes
    };
    const accessToken = extractToken(accessTokenHeader);
    const refreshToken = extractToken(refreshTokenHeader);

        if(accessToken){
          console.log("came in to access")
            jwt.verify(accessToken,process.env.JWT_SECRET,(err:any,decoded:any)=>{
            if(err){
                return res.status(HttpStatus.UNAUTHORIZED).json({message:"Invalid or expired token"})
            }
            const user = decoded as UserPayload;
            console.log(user,"from  jwt verify")
             req.user = user;
             next();
            })
        }
        else if(refreshToken){
          console.log("came in to referesh")
            jwt.verify(refreshToken,process.env.JWT_SECRET,(err:any, decoded:any) => {
                if (err) {
                  return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired refresh token.' });
                }
                const user = decoded as UserPayload;
                const newAccessToken = jwt.sign(
                    { id: user.id, role: user.role }, 
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' }
                  );
                  res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                  });
                  req.user= user
                   next();      
        })
  }else{
    res.status(HttpStatus.FORBIDDEN).json({message:"UnAutherized: Please Login"})
  }
};

export default  authMiddleware