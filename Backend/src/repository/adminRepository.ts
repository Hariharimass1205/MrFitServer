import { IAdminRepository } from "../interface/repository/adminRepository.interface";
import paymentModel from "../model/paymentModel";
import userModel from "../model/userModel"

export class adminReository implements IAdminRepository{
 fetchDataRepo = async () =>{
    try {
        const users = await userModel.find({isCoach:false}).exec();
        const  totalCash = await userModel.find({enrolledPackage:{$gt:0}})
        const coaches = await userModel.find({isCoach:true}).exec();
        const pendingApprovals = await userModel.find({isApproved:"Pending"}).exec();
        const enrolledUsers = await userModel.find({enrolledPackage:{$gt:0}}).populate("coachId","name")
        const paymentList = await paymentModel.find({paymentStatus:"completed"})
        const result = {
            userList : users,
            pendingApprovalsList:pendingApprovals.length,
            users,
            coachList:coaches.length,
            coaches:coaches,
            enrolledUsers:enrolledUsers,
            paymentList
        }
        return result
    } catch (error) {
        throw new Error(error)
    }
}

 blockUserbyEmail = async (email:string) =>{
    try {
        const blockedUser = await userModel.updateOne({email},{isBlocked:true})
        return blockedUser
    } catch (error) {
        throw new Error(error)
    }
}
 unblockUserbyEmail = async (email:string) =>{
    try {
        const unblockedUser = await userModel.updateOne({email},{isBlocked:false})
        return unblockedUser
    } catch (error) {
        throw new Error(error)
    }
}
 changeStatusByEmail = async (email:string,newStatus:string)=>{
    try {
        const changedStatus = await userModel.updateOne({email},{isApproved:newStatus})
        const updatedStatus = await userModel.findOne({email})
        return updatedStatus
    } catch (error) {
        throw new Error(error)
    }
}
}