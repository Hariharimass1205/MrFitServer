import mongoose  from 'mongoose'

const paymentSchema = new mongoose.Schema({
      coachId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'coaches', 
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users', 
      },
      paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
      amount: {
        type: Number,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      transactionDate: {
        type: Date,
        default: Date.now,
      },
      transactionId: {  
        type: String,
        required:false,  
      }
})

const paymentModel   = mongoose.model("Payment",paymentSchema)
export default paymentModel