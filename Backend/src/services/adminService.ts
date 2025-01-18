import { generateAccessToken,generateRefreshToken } from '../utils/JWTgenerator';
import { IAdminService } from '../interface/services/adminService.interface';
import { adminLOGINInput } from '../interface/services/adminService.type';
import { IAdminRepository } from '../interface/repository/adminRepository.interface';

export class adminService implements IAdminService{
  private adminRepository : IAdminRepository
  constructor(adminRepository:IAdminRepository){
    this.adminRepository = adminRepository
}


 adminLOGIN = async (data:adminLOGINInput):Promise<any | null> => {
    try {
      const {email,password} = data
      if (process.env.ADMIN_EMAIL !== email) {
        throw new Error("Invalid Credential")
      }
      if (process.env.ADMIN_PASS !== password) {
        throw new Error("Invalid Credential")
      }
      const accessToken = generateAccessToken(process.env.ADMIN_EMAIL,process.env.ADMIN_ROLE)
      const refreshToken = generateRefreshToken(process.env.ADMIN_EMAIL,process.env.ADMIN_ROLE)
      return { accessToken,refreshToken, admin: email };
    } catch (error) {
      throw new Error(error)  
    }
  }

   fetchDataService = async ():Promise<any|null>=>{
    try {
      const data = this.adminRepository.fetchDataRepo()
      return data
    } catch (error) {
      throw new Error(error) 
    }
  }

   blockUserService = async (email:string)=>{
    try {
      const data = this.adminRepository.blockUserbyEmail(email)
      return data
    } catch (error) {
      console.log("error at handling block in admin service")
      throw new Error(error)
    }
  }
   unblockUserService = async (email:string)=>{
    try {
      const data = this.adminRepository.unblockUserbyEmail(email)
      return data
    } catch (error) {
      console.log("error at handling block in admin service")
      throw new Error(error)
    }
  }

   changeCoachStatusService = async (email:string,newStatus:string)=>{
    try {
      const result = await this.adminRepository.changeStatusByEmail(email,newStatus)
      return result
    } catch (error) {
      console.log("error at changing status of coach in  admin service")
      throw new Error(error)
    }
  }
}