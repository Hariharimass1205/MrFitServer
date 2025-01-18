import { IPayment } from "./paymentService.type";


export interface IPaymentService {
    generatePaymentHash(data:{}): Promise<any|null>
    getCoachEmail(coachId:string): Promise<any|null>
    updateBookingStatus(bookingData: any): Promise<any|null>
}