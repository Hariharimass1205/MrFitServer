import mongoose,{ Schema} from 'mongoose'

const reviewSchema = new Schema({
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
     transactionDate: {
            type: Date,
            default: Date.now,
          },
    review:{
        type:String,
        required: true,
    },
    starRating:{
        type:Number,
        required: true,
    }
})

const reviewModel = mongoose.model("review",reviewSchema)
export default reviewModel