import { Types } from "mongoose";


export type updateCoachScoreInput = {
    score:number
    takenn:any
}

export type registerCoachServiceInput = {
    name:string,
    phone:{type:Number},
    userId:Types.ObjectId;
    age:number;
    height:number;
    weight:number;
    noOfStudentsCoached:number;
    Students: string[];
    availability:{ 
      fromTime: string,
      toTime: string,
      workingDays:  string[]
     },
    achievementBadges: {
        achievementsOne:String,
        achievementsTwo:String,
        achievementsThree:String
      }
    package:  {
        monthlyPackage: number;
        quarterlyPackage: number;
        yearlyPackage: number;
      };
    address:{type:String};  
    state:String;
    city:String;
    locality:String;
    licenseOrAadhaar:String;
    role:String;
}