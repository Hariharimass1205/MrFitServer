export interface User {  
    save(): unknown;    
    userName: string;   
    phone?: string;   
    email: string;   
    password?: string;   
    profileImage?: string;
    gender?: string;   
    otp?: string;   
    DOB?:string
    otpVerified?: boolean;  
    enrolledPackage:number;
    enrolledDuration:string
    enrolledDurationExpire:string
    enrolledDate:string;
    address?: string;   
    slotTaken: string;
    state?: string;   
    district?: string;   
    pincode?: number;   
    reviews?: string[];   
    isBlocked?: boolean;
    coachId?:any;     
    isCoach: boolean;
    quizScore:Number;
    isApproved:string;
    role:string;
    isRegisted:boolean;
    Diet?: {
      Meal1: string | null;
      Meal2: string | null;
      Meal3: string | null;
      Goal:{
        Water:Number|  null,
        Calories:Number|  null,
        Steps:Number|  null,
        Protein:Number|  null,
        Carbohydrates:Number|  null,
        Fats:Number|  null,
        Fiber:Number|  null,
        SleepTime:Number|  null,
      }
    };
  } 