import mongoose, { Schema } from "mongoose";
import { Coach } from "../interface/coach";
  
const coachSchema = new Schema<Coach>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    name:{type:String},
    phone:{type:Number},
    age:{type:Number,required:true},
    height:{type:Number,required:true},
    weight:{type:Number,required:true},
    noOfStudentsCoached:{type:Number},
    availability: { type:{
      fromTime:{type:String},
      toTime:{type: String},
      workingDays:{type:[String]}}},
    Students: [{ 
      type: Schema.Types.ObjectId, 
      ref: "users" 
  }],
    achievementBadges: {
      achievementsOne:String,
      achievementsTwo:String,
      achievementsThree:String
    },
    package:{ type: {
        monthlyPackage: {
          type: Number
        },
        quarterlyPackage: {
          type: Number 
        },
        yearlyPackage: {
          type: Number
        } }},
    state:{ type: String },
    address:{type:String},
    city:{ type: String },
    locality:{ type: String},
    licenseOrAadhaar:{type:String},
    role:{type:String},
})

const coachModel = mongoose.model("coaches", coachSchema)
export default coachModel