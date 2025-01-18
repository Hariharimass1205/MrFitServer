
import mongoose,{Schema} from 'mongoose'
import { User } from '../interface/user'

const userSchema = new Schema<User>({
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String ,  default: ""},
    password:{type: String, required: false , default: "not provided"},
    profileImage: { type: String ,  default: ""},
    DOB:{type: String , default: ""},
    otp: { type: String , default: null},
    otpVerified: { type: Boolean, default: false },
    gender:{ type: String , default: ""}, 
    address: { type: String , default: ""},
    state: { type: String , default: ""},
    district: { type: String , default: ""},
    pincode: { type: Number , default: 0},
    reviews: { type: [String] , default: []},
    enrolledPackage:{type:Number, default: 0},
    enrolledDurationExpire:{type:String, default: ""},
    enrolledDuration:{type:String, default: ""},
    enrolledDate:{type:String, default: ""},
    coachId:{type:Schema.Types.ObjectId,default:null,ref:"coaches"},
    isBlocked:{ type: Boolean, default:false},
    isCoach:{type:Boolean,default:false},
    quizScore:{type:Number, default: 0},
    isApproved:{type:String, default: ""},
    role:{type:String, default:"user"},
    isRegisted:{type:Boolean, default: false},
    slotTaken:{type:String, default: ""},
    Diet: {
        Meal1: { type: String, default: null },
        Meal2: { type: String, default: null },
        Meal3: { type: String, default: null },
        Goal:{
            Water:{type:Number,default: null},
            Calories:{type:Number,default: null},
            Steps:{type:Number,default: null},
            Protein:{type:Number,default: null},
            Carbohydrates:{type:Number,default: null},
            Fats:{type:Number,default: null},
            Fiber:{type:Number,default: null},
            SleepTime:{type:Number,default: null},
          }
      },
})

const userModel = mongoose.model("users",userSchema)
export default userModel