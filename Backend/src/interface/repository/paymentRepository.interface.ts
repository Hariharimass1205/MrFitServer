export  type  IPayment= {
    coachId: string
    userId:string 
    amount:string;
    txnid: string;  
  }


export interface IPaymentRepository {
    paymentDetails(bookingData:any): Promise<any|null>
    getCoachEmail(coachId:string): Promise<any|null>
    updateBookingStatus(bookingData:any): Promise<any|null>
}