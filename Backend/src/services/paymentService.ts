import { error } from "console";
import { Types } from "mongoose";
import jsSHA from "jssha";
import { IPaymentService } from "../interface/services/paymentService.interface";
import { IPaymentRepository } from "../interface/repository/paymentRepository.interface";

interface  saveDataa {
  txnid:any
  email:string,
  coachId:string,
  status:string,
  amount:number,
  userId:string,
}

export class PaymentService implements IPaymentService{
    private paymentRepository :IPaymentRepository 

    constructor(paymentRepository:IPaymentRepository ){
        this.paymentRepository = paymentRepository
    }
    
    async generatePaymentHash({
      txnid, amount, productinfo, username, email, udf1
    }: {
      txnid: string,
      amount: string,
      productinfo: string,
      username: string,
      email: string,
      udf1: string,
    }) {
      try {
        const hashString = `${process.env.PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${username}|${email}|${udf1}||||||||||${process.env.PAYU_SALT}`;
        const sha = new jsSHA("SHA-512", "TEXT");
        sha.update(hashString);
        const hash = sha.getHash("HEX");
        const bookingData = {
          txnid,
          amount,
          productinfo,
          username,
          email,
          udf1,
          paymentStatus: 'pending',
          paymentHash: hash
        };
        const savedBooking = await this.paymentRepository.paymentDetails(bookingData);
        // return savedBooking;
        return hash;
      } catch (error) {
        throw new Error("Error generating payment hash");
      }
    }

 async updateBookingStatus(bookingData: any) {
      try {
        
        const updatedBooking = await this.paymentRepository.updateBookingStatus(bookingData);
     return updatedBooking
      } catch (error:any) {
              throw new Error(error);
      }
    }
    async getCoachEmail(coachId:string){
      try {
        const coachIds = await this.paymentRepository.getCoachEmail(coachId);
        return coachIds
      } catch (error) {
        throw new Error(error);
      }
    }
}