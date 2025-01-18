const mongoose = require('mongoose');
import { IPaymentRepository } from "../interface/repository/paymentRepository.interface";
import chatRoomModel from "../model/chatRoomModel";
import coachModel from "../model/coachModel";
import paymentModel from "../model/paymentModel";
import userModel from "../model/userModel";
import { calculateExpirationDate } from "../utils/calculateDateExpire";


export class PaymentRepository implements IPaymentRepository{
  paymentDetails=async(bookingData:any): Promise<any|null>=> {
    try {
      const{ txnid,amount,productinfo, username,email,udf1}=bookingData
      const paymentDetail= await paymentModel.create({
       userName:username,
       userEmail:email,
       userId:udf1,
       coachId:productinfo,
       transactionId:txnid,
       amount:amount,
     })
   if (!paymentDetail) {
       throw new Error(`Doctor with slot not found.`);
     }
     return {
       status:'pending',
       success:true,
       message:'payment updated successfully'
     }
   } catch (error: any) {
     console.error("Error in payment doc creation:", error);
     throw new Error(error.message);
   }
}

updateBookingStatus = async (bookingData: any): Promise<any | null> => {
  try {
    const { txnid, email, coachId, status, amount, userId, packageType, slotTime } = bookingData;
    const enrolledPackage = `${packageType}`;
    const updatedPayment = await paymentModel.updateOne(
      {userEmail: email },
      {$set:{paymentStatus:"completed"}}
    );
    const createRoom = await chatRoomModel.create({ user: userId, coach: coachId });
    const payment = await paymentModel.findOne({ userEmail: email, userId: userId });
    const paymentDate = new Intl.DateTimeFormat("en-US").format(new Date(payment.transactionDate));
    const expireDate = calculateExpirationDate(paymentDate, enrolledPackage);
    const slotT = slotTime.replace(/^"|"$/g, "").replace(/\s(?=[AP]M)/g, "");
    const userCoachIdUpdate = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          enrolledPackage: amount,
          enrolledDuration: enrolledPackage,
          coachId: coachId,
          enrolledDate: paymentDate,
          enrolledDurationExpire: expireDate,
          slotTaken: slotT,
        },
      }
    );

    const addUserIdToCoach = await coachModel.updateOne(
      { _id: new mongoose.Types.ObjectId(coachId) },
      {
        $addToSet: { Students: new mongoose.Types.ObjectId(userId) },
        $inc: { noOfStudentsCoached: 1 },
      }
    );

    const updatedUser = await userModel.findOne({ _id: userId });

    return updatedPayment;
  } catch (error) {
    console.error("Error in payment doc creation:", error);
    throw new Error(error.message);
  }
};

getCoachEmail = async (coachId:string): Promise<any|null>=>{
  try {
    const coach_Id = new mongoose.Types.ObjectId(coachId as string)
    const coach = (await coachModel.findOne({_id:coach_Id})).populate("userId","email")
    return coach
  } catch (error) {
    throw new Error(error.message);
  }
}
}