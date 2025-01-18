import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpStatus } from '../utils/httpStatusCode';

interface UserPayload extends JwtPayload {
    id: string;
    role: string;
  }

  export interface CustomRequest extends Request {
    user?: UserPayload;
    files?:""
  }

  const authMiddleware = (req:CustomRequest,res:Response,next:NextFunction)=>{
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        if(accessToken){
            jwt.verify(accessToken,process.env.JWT_SECRET,(err:any,decoded:any)=>{
            if(err){
                return res.status(HttpStatus.UNAUTHORIZED).json({message:"Invalid or expired token"})
            }
            const user = decoded as UserPayload;
            req.user = user;
             next();
            })
        }
        else if(refreshToken){
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